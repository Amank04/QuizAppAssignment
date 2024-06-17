import React from 'react';

const Results = ({ score, total, playerName }) => (
  <div className="w-full h-[50vh] bg-white bg-opacity-90 rounded-lg shadow-lg border-4 border-white max-w-3xl mx-auto flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-gray-800 p-6 transform transition-transform hover:scale-105">
    <h2 className="text-4xl mb-4 animate-bounce text-yellow-300">Quiz Completed</h2>
    <p className="text-2xl mb-4 text-cyan-300">Thank you, <span className='text-pink-500 font-bold'>{playerName}!</span></p>
    <p className="text-xl text-yellow-300">
      Your Score: {score} / {total}
    </p>
    <button 
      className="mt-6 px-4 py-2 bg-white text-blue-700 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
      onClick={() => window.location.reload()}
    >
      Retry Quiz
    </button>
  </div>
);

export default Results;
