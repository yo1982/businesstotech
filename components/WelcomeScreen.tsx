
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
        Turn Your Business Idea into a Technical Reality
      </h1>
      <p className="max-w-3xl text-lg md:text-xl text-gray-300 mb-8">
        Answer a few simple questions about your project, and our AI will instantly generate a professional technical requirements document (SRS/PRD) that developers can build from. No technical knowledge required.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/30"
      >
        Start Building
      </button>
      <p className="mt-4 text-sm text-gray-500">
        No account needed. Just start answering.
      </p>
    </div>
  );
};
