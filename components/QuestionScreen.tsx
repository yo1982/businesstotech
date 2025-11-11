
import React from 'react';
import { QUESTIONS } from '../constants';
import type { Answers } from '../types';
import { LivePreview } from './LivePreview';

interface QuestionScreenProps {
  currentQuestionIndex: number;
  answers: Answers;
  updateAnswer: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  generatedDoc: string;
  isStreaming: boolean;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  currentQuestionIndex,
  answers,
  updateAnswer,
  nextQuestion,
  prevQuestion,
  generatedDoc,
  isStreaming,
}) => {
  const currentQuestion = QUESTIONS[currentQuestionIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col rounded-lg bg-gray-800/50 p-6">
        <div className="flex-grow">
          <label htmlFor={currentQuestion.id} className="block text-xl font-semibold text-gray-200 mb-4">
            {currentQuestion.text}
          </label>
          <textarea
            id={currentQuestion.id}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => updateAnswer(currentQuestion.id, e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none text-gray-200"
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          <button
            onClick={nextQuestion}
            disabled={!answers[currentQuestion.id]}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestionIndex === QUESTIONS.length - 1 ? 'Finish & Generate' : 'Next'}
          </button>
        </div>
      </div>
      <div className="hidden lg:block">
        <LivePreview markdownContent={generatedDoc} isStreaming={isStreaming} />
      </div>
    </div>
  );
};
