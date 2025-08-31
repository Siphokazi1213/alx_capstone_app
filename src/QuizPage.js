import React from 'react';

const QuizPage = ({ questions, currentQuestionIndex, onAnswer, onGoBack, error, isLoading }) => {

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto">
        <p className="text-gray-500">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto">
        <p className="text-red-500 text-center mb-4">{error}</p>
        <button
          onClick={onGoBack}
          className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Back to Start
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
      return null;
  }

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center" dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {currentQuestion.allAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            className="py-4 px-6 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 font-medium hover:bg-indigo-100 hover:border-indigo-400 transition-all duration-200 ease-in-out transform hover:scale-105"
            dangerouslySetInnerHTML={{ __html: answer }}
          ></button>
        ))}
      </div>
      <div className="mt-6 text-center text-lg text-gray-600">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
    </div>
  );
};

export default QuizPage;