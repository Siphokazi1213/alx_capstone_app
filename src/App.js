import React, { useState, useEffect } from 'react';

// StartScreen component for category selection
const StartScreen = ({ onStartQuiz, categories, isLoading, error }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to start the quiz, passing the selected category ID to the parent component
  const handleStart = () => {
    if (selectedCategory) {
      onStartQuiz(selectedCategory);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 text-center">QuizMaster</h1>
        <p className="text-xl text-gray-700 mt-2 mb-6 text-center">Test your knowledge!</p>

      <div className="w-full">
        {isLoading && <p className="text-gray-500 text-center">Loading categories...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {!isLoading && categories.length > 0 && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose Your Category</label>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-4 w-full bg-gray-100 border-2 border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              value={selectedCategory || ""}
            >
              <option value="" disabled>Select a quiz category...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={!selectedCategory || isLoading}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
            selectedCategory && !isLoading
              ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Start Quiz
        </button>
      </div>

      <div className="text-center pt-6 mt-6 border-t border-gray-200 w-full">
        <p className="text-sm text-gray-500">
          🎯 10 questions • 📊 Instant results • 🏆 Score tracking
        </p>
      </div>
    </div>
  );
};

// QuizPage component to display questions and handle answers
const QuizPage = ({ questions, currentQuestionIndex, onAnswer, onGoBack, error, isLoading }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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
  
  // Handle answer selection with visual feedback and a delay
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null); // Reset for the next question
    }, 2000); // 2 second delay
  };

  // Button color based on answer state
  const getButtonColor = (answer) => {
    // If no answer has been selected yet, use the default color
    if (selectedAnswer === null) {
      return 'bg-gray-100 hover:bg-indigo-100 border-gray-300 hover:border-indigo-400';
    }

    // If the answer is correct, turn it green
    if (answer === currentQuestion.correctAnswer) {
      return 'bg-green-500 border-green-700 text-white';
    }

    // If the user selected an incorrect answer, turn it red
    if (answer === selectedAnswer && answer !== currentQuestion.correctAnswer) {
      return 'bg-red-500 border-red-700 text-white';
    }

    // All other buttons are disabled after a selection
    return 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed';
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow2-lg w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center" dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {currentQuestion.allAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            disabled={selectedAnswer !== null} // Disable buttons after an answer is selected
            className={`py-4 px-6 rounded-xl border-2 font-medium transition-all duration-200 ease-in-out ${getButtonColor(answer)}`}
            dangerouslySetInnerHTML={{ __html: answer }}
          ></button>
        ))}
      </div>
      <div className="mt-8 text-center text-lg text-gray-600">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      
      {/* Back to Home button */}
      <button
        onClick={onGoBack}
        className="mt-6 py-2 px-4 rounded-xl bg-gray-200 text-gray-800 font-semibold transition-all duration-300 ease-in-out hover:bg-gray-300 transform hover:scale-105"
      >
        Back to Home
      </button>
    </div>
  );
};

// EndScreen component to display the final score
const EndScreen = ({ score, totalQuestions, onPlayAgain }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-auto text-center">
    <h2 className="text-5xl font-extrabold text-green-600 mb-4">Quiz Complete! 🎉</h2>
    <p className="text-2xl text-gray-700 mb-6">
      You scored <span className="text-green-600 font-bold">{score}</span> out of {totalQuestions}!
    </p>
    <button
      onClick={onPlayAgain}
      className="py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      Play Again
    </button>
  </div>
);

// Main App component for the quiz application
const App = () => {
  // State variables to manage the quiz flow and data
  const [quizState, setQuizState] = useState('start'); // 'start', 'quiz', 'end'
  const [categories, setCategories] = useState([]); // List of quiz categories
  const [questions, setQuestions] = useState([]); // The fetched quiz questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
  const [score, setScore] = useState(0); // User's score
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(null); // Error state for API calls

  // Fetches the list of quiz categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        setCategories(data.trivia_categories);
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load quiz categories. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Function to shuffle an array (for randomizing answer options)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to start the quiz based on the selected category
  const startQuiz = async (categoryId) => {
    setIsLoading(true);
    setError(null);
    try {
      // API call to fetch 10 questions of the selected category and multiple choice type
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`);
      const data = await response.json();

      if (data.response_code !== 0) {
        setError("Could not retrieve questions. Try a different category.");
        return;
      }

      // Map the API results to a more usable format and shuffle the answer options
      const formattedQuestions = data.results.map(q => {
        const incorrectAnswers = q.incorrect_answers;
        const correctAnswer = q.correct_answer;
        const allAnswers = shuffleArray([...incorrectAnswers, correctAnswer]);

        return {
          question: q.question,
          correctAnswer,
          allAnswers,
        };
      });

      setQuestions(formattedQuestions);
      setScore(0);
      setCurrentQuestionIndex(0);
      setQuizState('quiz');
      setError(null);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please check your network connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handles the user's answer selection
  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question or end the quiz
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizState('end');
    }
  };

  // Main component rendering based on quiz state
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4 font-inter">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" />
      <div className="w-full max-w-3xl">
        {quizState === 'start' && (
          <StartScreen
            onStartQuiz={startQuiz}
            categories={categories}
            isLoading={isLoading}
            error={error}
          />
        )}
        {quizState === 'quiz' && (
          <QuizPage
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onAnswer={handleAnswer}
            onGoBack={() => setQuizState('start')}
            error={error}
            isLoading={isLoading}
          />
        )}
        {quizState === 'end' && (
          <EndScreen
            score={score}
            totalQuestions={questions.length}
            onPlayAgain={() => setQuizState('start')}
          />
        )}
      </div>
    </div>
  );
};

export default App;
