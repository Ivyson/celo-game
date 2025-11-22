import { useState } from 'react';
import allQuestions from '../data/questions';

const useQuiz = (level = 1) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);

  // Get questions for current level
  const questions = allQuestions[`level${level}`];
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmission = (selectedAnswer) => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setTotalRewards(prevRewards => prevRewards + currentQuestion.reward);
    }

    // Track answer history (useful for solution screen)
    setAnswerHistory(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      reward: isCorrect ? currentQuestion.reward : 0
    }]);

    // Move to next question
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setIsQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalRewards(0);
    setIsQuizFinished(false);
    setAnswerHistory([]);
  };

  return {
    // Current state of the quiz.
    currentQuestion,
    currentQuestionIndex,
    score,
    totalRewards,
    isQuizFinished,
    totalQuestions,
    answerHistory,
    
    // Actions
    handleAnswerSubmission,
    resetQuiz,
  };
};

export default useQuiz;