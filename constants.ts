
import type { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'projectSummary',
    text: 'Let\'s start with the big picture. What is the name of your project and what does it do in one or two sentences?',
    placeholder: 'e.g., "Project Phoenix is a mobile app that connects local farmers with consumers for fresh produce delivery."',
  },
  {
    id: 'targetAudience',
    text: 'Who are you building this for? Describe your target users.',
    placeholder: 'e.g., "Health-conscious millennials living in urban areas, families who prefer organic food, and small-scale local farmers."',
  },
  {
    id: 'coreFeatures',
    text: 'What are the 3-5 most important features of your product? List them out.',
    placeholder: 'e.g., "1. User registration and profiles (for farmers and consumers). 2. A searchable marketplace of produce. 3. In-app ordering and payment. 4. Real-time order tracking."',
  },
  {
    id: 'userProblem',
    text: 'What specific problem does your product solve for your users?',
    placeholder: 'e.g., "For consumers, it solves the difficulty of finding fresh, local produce. For farmers, it provides a new, direct sales channel to reach customers."',
  },
  {
    id: 'monetization',
    text: 'How do you plan to make money with this product?',
    placeholder: 'e.g., "We will take a 10% commission on each sale made through the platform. In the future, we might offer premium listings for farmers."',
  },
  {
    id: 'competitors',
    text: 'Are there any similar products out there? What makes yours different or better?',
    placeholder: 'e.g., "Instacart is a competitor, but we are different because we focus exclusively on local and organic farms, ensuring freshness and supporting the local economy."',
  },
];
