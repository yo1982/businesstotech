
import { GoogleGenAI } from "@google/genai";
import type { Answers } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. Please set your API key for the app to function.");
  process.env.API_KEY = "YOUR_API_KEY_HERE";
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildPrompt = (answers: Answers): string => {
  return `
    You are an expert technical writer and product manager. Your task is to generate a comprehensive Software Requirements Specification (SRS) or Product Requirements Document (PRD) based on the answers provided by a non-technical founder.

    The document should be well-structured, clear, and ready for a development team to start working on. Use Markdown for formatting.

    Here are the founder's answers to your questions:

    **Project Summary:**
    ${answers.projectSummary || 'Not provided.'}

    **Target Audience:**
    ${answers.targetAudience || 'Not provided.'}

    **Core Features:**
    ${answers.coreFeatures || 'Not provided.'}

    **Problem Solved:**
    ${answers.userProblem || 'Not provided.'}

    **Monetization Strategy:**
    ${answers.monetization || 'Not provided.'}

    **Competitors & Differentiators:**
    ${answers.competitors || 'Not provided.'}

    ---

    Based on this information, generate the SRS/PRD. Structure it with the following sections:

    1.  **Introduction & Vision:** A brief overview of the project, its goals, and the problem it solves.
    2.  **User Personas:** Create 1-2 simple user personas based on the target audience (e.g., "Alex the Urban Shopper," "Brenda the Farmer").
    3.  **User Stories:** For each core feature, write clear user stories in the format: "As a [user type], I want to [action] so that I can [benefit]."
    4.  **Functional Requirements:** Detail the specific functionalities. Be explicit. For example, if they mention "User Registration," specify what fields are needed (email, password, etc.) and the process (email confirmation).
    5.  **Non-Functional Requirements:** Infer and list key NFRs like Security (password hashing, data encryption), Performance (pages should load in under 2 seconds), and Usability (the interface should be intuitive for non-tech-savvy users).
    6.  **Technology Stack (Recommendation):** Suggest a modern, scalable tech stack suitable for this project (e.g., React Native for mobile, React/Next.js for web, Node.js/Express for backend, PostgreSQL for database). Justify your choices briefly.
    7.  **MVP Scope:** Clearly state what is included in the Minimum Viable Product based on the core features.

    Ensure the language is professional and technical, translating the business concepts into actionable development tasks.
  `;
};

export async function* generateDocumentStream(answers: Answers, signal: AbortSignal) {
    const model = 'gemini-2.5-flash';
    const prompt = buildPrompt(answers);

    try {
        const stream = await ai.models.generateContentStream({
            model: model,
            contents: prompt,
        });

        for await (const chunk of stream) {
            if (signal.aborted) {
                console.log("Stream aborted by user.");
                return;
            }
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error generating document stream:", error);
        throw new Error("Failed to generate document from API.");
    }
}
