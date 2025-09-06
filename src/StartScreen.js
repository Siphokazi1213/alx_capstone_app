import React, { useState } from 'react';

const StartScreen = ({ onStartQuiz, categories, isLoading, error }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleStart = () => {
    if (selectedCategory) {
      onStartQuiz(selectedCategory);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">Quiz App</h1>
      <p className="text-xl text-gray-700 mb-6 text-center">Select a category to begin!</p>
      
      {isLoading && <p className="text-gray-500">Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!isLoading && categories.length > 0 && (
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
          value={selectedCategory || ""}
        >
          <option value="" disabled>Choose a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}

      <button
        onClick={handleStart}
        disabled={!selectedCategory || isLoading}
        className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out ${
          selectedCategory && !isLoading
            ? 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;