import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import FullScreenPrompt from './components/FullScreenPrompt';
import Quiz from './components/Quiz';
import StartQuiz from './components/StartQuiz';
import Results from './components/Results';
import questions from '../public/questions.json';
import './index.css';

function App() {
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement != null
  );
  const [playerName, setPlayerName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement != null);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const requestFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
  };

  const startQuiz = (name) => {
    setPlayerName(name);
    setQuizStarted(true);
    setScore(0);
    setShowResults(false);
  };

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setQuizStarted(false);
    setShowResults(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
    <header className="text-center py-3 bg-gradient-to-r from-teal-500 to-blue-700 shadow-lg">
  <h1 className="text-4xl font-bold text-white drop-shadow-md">
    Welcome to the Quiz
  </h1>
  <p className="text-lg text-gray-200 mt-2 italic">
    Test your knowledge with our fun and interactive quiz!
  </p>
</header>

      <main className="flex-grow flex flex-col justify-center items-center p-6">
        {showResults ? (
          <Results score={score} total={questions.length} playerName={playerName} />
        ) : (
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto">
            {isFullScreen ? (
              quizStarted ? (
                <Quiz
                  questions={questions}
                  playerName={playerName}
                  onComplete={handleQuizComplete}
                />
              ) : (
                <StartQuiz startQuiz={startQuiz} />
              )
            ) : (
              <FullScreenPrompt requestFullScreen={requestFullScreen} />
            )}
          </div>
        )}
      </main>
      <footer className="text-center py-4 bg-gradient-to-r from-teal-500 to-blue-700  text-white shadow-md mt-4 rounded-t-lg">
      <div className="flex items-center justify-center space-x-2">
        <span className="text-lg text-blue-800 italic">Made with</span>
        <span className="animate-pulse text-blue-800 italic">❤️</span>
        <span className="text-lg text-blue-800 italic">by</span>
        <a 
          href="https://github.com/Amank04" 
          className="text-white hover:font-bold text-xl font-semibold transition-colors flex items-center space-x-1"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
          <span className='hover:underline '>Aman Kumar</span>
        </a>
      </div>
    </footer>
    </div>
  );
}

export default App;
