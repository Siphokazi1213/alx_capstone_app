import React from 'react';

const EndScreen = ({ score, totalQuestions, onPlayAgain }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-green-600 mb-4">Quiz Complete! 🎉</h2>
    <p className="text-2xl text-gray-700 mb-6">
      You scored <span className="text-green-600 font-bold">{score}</span> out of {totalQuestions}!
    </p>
    <button
      onClick={onPlayAgain}
      className="py-3 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      Play Again
    </button>
  </div>
);

export default EndScreen;