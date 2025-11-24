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

    // --- Persistent rewards helpers ---
  const readCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem('cg_currentUser') || 'null');
    } catch (e) {
      return null;
    }
  };

  const writeCurrentUser = (user) => {
    try {
      localStorage.setItem('cg_currentUser', JSON.stringify(user));
    } catch (e) {
      // ignore
    }
  };

  const updateStoredUsers = (userId, partial) => {
    try {
      const users = JSON.parse(localStorage.getItem('cg_users') || '[]');
      const idx = users.findIndex(u => u.id === userId || u.email === userId);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...partial };
      } else if (partial && (partial.username || partial.tokens !== undefined)) {
        // if user not present, optionally add a minimal record
        users.push({ id: userId, username: partial.username || 'You', email: null, tokens: partial.tokens ?? 0 });
      }
      localStorage.setItem('cg_users', JSON.stringify(users));
    } catch (e) {
      // ignore
    }
  };


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
    const cu = readCurrentUser();
    setTotalRewards(cu && Number(cu.tokens) ? Number(cu.tokens) : 0);
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
    const reward = isCorrect ? (Number(currentQuestion.reward) || 0) : 0;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
       setTotalRewards(prevRewards => {
        const next = prevRewards + reward;
        // persist to localStorage for signed-in user
        const cu = readCurrentUser();
        if (cu) {
          const updated = { ...cu, tokens: Number(cu.tokens || 0) + reward };
          writeCurrentUser(updated);
          updateStoredUsers(updated.id || updated.email || updated.username, { tokens: updated.tokens });
        }
        return next;
      });
    }
    

    setAnswerHistory(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      reward: reward
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
    const cu = readCurrentUser();
    setTotalRewards(cu && Number(cu.tokens) ? Number(cu.tokens) : 0);
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