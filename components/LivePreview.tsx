
import React from 'react';
// Note: In a real project, you would install react-markdown. For this environment, we'll simulate markdown rendering.
// import ReactMarkdown from 'react-markdown'; 

const SimpleMarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    return (
        <div>
            {lines.map((line, index) => {
                if (line.startsWith('###### ')) return <h6 key={index} className="text-md font-bold mt-2">{line.substring(7)}</h6>;
                if (line.startsWith('##### ')) return <h5 key={index} className="text-lg font-bold mt-2">{line.substring(6)}</h5>;
                if (line.startsWith('#### ')) return <h4 key={index} className="text-xl font-bold mt-3">{line.substring(5)}</h4>;
                if (line.startsWith('### ')) return <h3 key={index} className="text-2xl font-bold mt-4 border-b border-gray-600 pb-1">{line.substring(4)}</h3>;
                if (line.startsWith('## ')) return <h2 key={index} className="text-3xl font-bold mt-5 border-b-2 border-gray-500 pb-2">{line.substring(3)}</h2>;
                if (line.startsWith('# ')) return <h1 key={index} className="text-4xl font-bold mt-6 border-b-2 border-gray-400 pb-3">{line.substring(2)}</h1>;
                if (line.startsWith('---')) return <hr key={index} className="my-4 border-gray-600" />;
                if (line.startsWith('* ')) return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
                if (line.trim() === '') return <br key={index} />;
                return <p key={index} className="my-2">{line}</p>;
            })}
        </div>
    );
};


interface LivePreviewProps {
  markdownContent: string;
  isStreaming: boolean;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ markdownContent, isStreaming }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">Live Preview: Technical Document</h2>
        {isStreaming && <div className="ml-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>}
      </div>
      <div className="prose prose-invert prose-sm md:prose-base max-w-none flex-grow overflow-y-auto bg-gray-900 p-4 rounded-md border border-gray-700">
        {markdownContent ? (
          <SimpleMarkdownRenderer content={markdownContent} />
        ) : (
          <p className="text-gray-400">Your technical document will appear here as you answer the questions...</p>
        )}
      </div>
    </div>
  );
};
