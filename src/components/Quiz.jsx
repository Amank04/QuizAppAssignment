import React, { useState, useEffect } from 'react';

const Quiz = ({ questions, playerName, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      handleComplete();
    }
  }, [timer]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setError(null);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      if (selectedOption === questions[currentQuestionIndex].answer) {
        setScore((prev) => prev + 1);
      }
      setSelectedOption(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        handleComplete();
      }
    } else {
      setError('Please select an option before proceeding.');
    }
  };

  const handleComplete = () => {
    onComplete(score);
  };

  if (timer <= 0) {
    handleComplete();
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center p-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <div className="my-3 text-lg text-gray-200">Time remaining: {timer}s</div>
      <div className="bg-white bg-opacity-20 rounded-lg shadow-lg p-3 w-full max-w-xl h-full" >
        <h2 className="text-3xl mb-2 text-gray-800">{currentQuestion.question}</h2>
        <ul className="mb-6 space-y-2">
          {currentQuestion.options.map((option) => (
            <li key={option} className="">
              <label className="flex items-center bg-pink-400 bg-opacity-80 rounded-lg p-3 hover:bg-pink-800 transition duration-200 cursor-pointer">
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                  className="mr-4"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <button 
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 ${!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextQuestion}
          disabled={!selectedOption}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
