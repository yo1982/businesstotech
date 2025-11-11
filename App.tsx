
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { QuestionScreen } from './components/QuestionScreen';
import { EditorScreen } from './components/EditorScreen';
import { SurveyScreen } from './components/SurveyScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { generateDocumentStream } from './services/geminiService';
import { QUESTIONS } from './constants';
import type { Answers } from './types';
import { AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Welcome);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const streamAbortControllerRef = useRef<AbortController | null>(null);

  const handleStart = () => {
    setAppState(AppState.Answering);
  };
  
  const updateAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const streamDocument = useCallback(async (currentAnswers: Answers) => {
      if (streamAbortControllerRef.current) {
        streamAbortControllerRef.current.abort();
      }
      const abortController = new AbortController();
      streamAbortControllerRef.current = abortController;

      setIsStreaming(true);
      setGeneratedDoc('');
      try {
        const stream = generateDocumentStream(currentAnswers, abortController.signal);
        for await (const chunk of stream) {
            setGeneratedDoc(prev => prev + chunk);
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
            console.error('Error streaming document:', error);
            setGeneratedDoc("### An error occurred while generating the document.\n\nPlease check your API key and try again.");
        }
      } finally {
        setIsStreaming(false);
        streamAbortControllerRef.current = null;
      }
  }, []);

  useEffect(() => {
    if (appState === AppState.Answering) {
      const debounceTimer = setTimeout(() => {
        const currentAnswer = answers[QUESTIONS[currentQuestionIndex].id];
        if (currentAnswer && currentAnswer.trim().length > 10) {
            streamDocument(answers);
        }
      }, 1000);
      return () => clearTimeout(debounceTimer);
    }
  }, [answers, currentQuestionIndex, streamDocument, appState]);
  
  const nextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finalizeDocument();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const finalizeDocument = async () => {
    setAppState(AppState.Generating);
    setIsLoading(true);
    await streamDocument(answers);
    setIsLoading(false);
    setAppState(AppState.Editing);
  };
  
  const onEditComplete = () => {
    setAppState(AppState.Survey);
  };

  const onSurveyComplete = () => {
    setAppState(AppState.Finished);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.Welcome:
        return <WelcomeScreen onStart={handleStart} />;
      case AppState.Answering:
        return (
          <QuestionScreen
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            updateAnswer={updateAnswer}
            nextQuestion={nextQuestion}
            prevQuestion={prevQuestion}
            generatedDoc={generatedDoc}
            isStreaming={isStreaming}
          />
        );
      case AppState.Generating:
          return (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
              <p className="mt-4 text-lg text-gray-300">Finalizing your technical document...</p>
            </div>
          );
      case AppState.Editing:
        return <EditorScreen initialDoc={generatedDoc} onComplete={onEditComplete} />;
      case AppState.Survey:
        return <SurveyScreen onComplete={onSurveyComplete} />;
      case AppState.Finished:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-bold text-green-400 mb-4">Thank You!</h1>
            <p className="text-xl text-gray-300">Your feedback is valuable. You can now close this window.</p>
          </div>
        );
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4 md:p-8">
        <header className="w-full max-w-7xl mx-auto mb-6">
            <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 01.553-.894L9 4l6 3v13l-6-3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4v16m6-13v13" /></svg>
                </div>
                <h1 className="text-2xl font-bold tracking-tight">AI Translator <span className="text-blue-400">| Business to Tech</span></h1>
            </div>
            {appState === AppState.Answering && (
                 <ProgressBar currentStep={currentQuestionIndex} totalSteps={QUESTIONS.length} />
            )}
        </header>

        <main className="flex-grow w-full max-w-7xl mx-auto">
            {renderContent()}
        </main>
    </div>
  );
};

export default App;
