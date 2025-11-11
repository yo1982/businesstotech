
import React, { useState } from 'react';

interface EditorScreenProps {
  initialDoc: string;
  onComplete: () => void;
}

export const EditorScreen: React.FC<EditorScreenProps> = ({ initialDoc, onComplete }) => {
  const [docContent, setDocContent] = useState(initialDoc);

  const handleDownload = () => {
    const blob = new Blob([docContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'technical_document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Document is Ready</h2>
      <p className="text-center text-gray-400 mb-6">You can now edit the document below, or download it as a Markdown file.</p>
      
      <textarea
        value={docContent}
        onChange={(e) => setDocContent(e.target.value)}
        className="w-full flex-grow p-4 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none text-gray-200 font-mono"
      />
      
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          <span>Download .MD</span>
        </button>
        <button
          onClick={onComplete}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Finish & Continue
        </button>
      </div>
    </div>
  );
};
