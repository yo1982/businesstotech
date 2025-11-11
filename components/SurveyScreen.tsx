
import React, { useState } from 'react';

interface SurveyScreenProps {
  onComplete: () => void;
}

export const SurveyScreen: React.FC<SurveyScreenProps> = ({ onComplete }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    console.log('Survey submitted');
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-3xl font-bold mb-4">One Last Thing...</h2>
      <p className="text-lg text-gray-400 mb-8">
        We'd love to hear your feedback to make this tool better.
      </p>

      <form onSubmit={handleSubmit} className="w-full bg-gray-800/50 p-8 rounded-lg">
        <div className="mb-6">
          <label className="block text-xl font-semibold text-gray-200 mb-4">
            How would you rate your experience?
          </label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-4xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="feedback" className="block text-xl font-semibold text-gray-200 mb-4">
            Any other feedback or suggestions?
          </label>
          <textarea
            id="feedback"
            rows={4}
            placeholder="What did you like? What could be improved?"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={rating === 0}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};
