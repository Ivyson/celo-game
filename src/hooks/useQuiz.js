import { useState,useEffect } from 'react';
import allQuestions from '../data/questions';

const useQuiz = (level = 1) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);

  // Get questions for current level
  const questions = allQuestions[`level${level}`] || [];
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const shuffle = (arr = []) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };


  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalRewards(0);
    setIsQuizFinished(false);
    setAnswerHistory([]);
  }, [level]); 


  useEffect(() => {
    if (!currentQuestion || !Array.isArray(currentQuestion.answers)) {
      setCurrentOptions([]);
      return;
    }
    setCurrentOptions(shuffle(currentQuestion.answers));
  }, [currentQuestionIndex, currentQuestion]);


  const handleAnswerSubmission = (selectedAnswer) => {
    if(!currentQuestion) return;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setTotalRewards(prevRewards => prevRewards + currentQuestion.reward);
    }

    setAnswerHistory(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      reward: isCorrect ? currentQuestion.reward : 0
    }]);



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
    currentQuestion,
    currentQuestionIndex,
    score,
    totalRewards,
    isQuizFinished,
    totalQuestions,
    answerHistory,
    currentOptions,
    
    // Actions
    handleAnswerSubmission,
    resetQuiz,
  };
};

export default useQuiz;