import { useState, useEffect } from 'react';
import useQuiz from '../hooks/useQuiz';
import Results from './Results';
import MathText from '../utils/MathTex';

const Quiz = ({ level, setLevel }) => {
  const {
    currentQuestion,
    currentQuestionIndex,
    score,
    totalRewards,
    isQuizFinished,
    totalQuestions,
    answerHistory,
    currentOptions,
    handleAnswerSubmission,
    resetQuiz,
  } = useQuiz(level);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const showSolution = selectedAnswer !== null; 
  const questionsAnswered = currentQuestionIndex + (showSolution ? 1 : 0);
  const accuracy = questionsAnswered > 0 ? Math.round((score / questionsAnswered) * 100) : 0;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, level]);

  const handleNextLevel = (nextLevel) => {
    if (typeof setLevel === 'function') {
      setLevel(nextLevel);
    }
    if (typeof resetQuiz === 'function') {
      resetQuiz();
    }
  };

  if (isQuizFinished) {
    return (
      <Results
        score={score}
        totalQuestions={totalQuestions}
        totalRewards={totalRewards}
        answerHistory={answerHistory}
        resetQuiz={resetQuiz}
        currentLevel={level}
        onNextLevel={handleNextLevel}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scale-in">
          <h2 className="text-2xl font-bold text-gray-800">No questions available</h2>
        </div>
      </div>
    );
  }

  const handleAnswerClick = (answer) => {
    if (showSolution) return;
    setSelectedAnswer(answer);
  };

  // const handleSubmit = () => {
  //   if (selectedAnswer == null) return;
    
  //   if (typeof handleAnswerSubmission === 'function') {
  //     handleAnswerSubmission(selectedAnswer);
  //   } else {
  //     console.warn('handleAnswerSubmission is not a function');
  //   }
  // };

  const handleNext = () => {

    setSelectedAnswer(null);
    
   if (selectedAnswer == null) return;
    
    if (typeof handleAnswerSubmission === 'function') {
      handleAnswerSubmission(selectedAnswer);
    } else {
      console.warn('handleAnswerSubmission is not a function');
    }
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const progress = totalQuestions ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
  const answers = Array.isArray(currentOptions) ? currentOptions : [];
  const solutionSteps = Array.isArray(currentQuestion.solution) ? currentQuestion.solution : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className={`bg-white/95 backdrop-blur-sm rounded-t-2xl shadow-2xl p-6 ${isAnimating ? 'animate-slide-down' : ''}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Level {level}
                </span>
                <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {currentQuestion.category ?? 'General'}
                </span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Question {currentQuestionIndex + 1} of {totalQuestions || 0}
              </h2>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 font-medium mb-1">Current Score</div>
              <div className="text-4xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                {score ?? 0}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse" />
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs font-semibold text-gray-600">
              <span>{Math.round(progress)}% Complete</span>
              <span>{(totalQuestions || 0) - (currentQuestionIndex + 1)} remaining</span>
            </div>
          </div>
        </div>

        <div className={`bg-white/95 backdrop-blur-sm shadow-2xl p-8 md:p-12 ${isAnimating ? 'animate-fade-in' : ''}`}>
          <div className="mb-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                <span className="text-white font-black text-2xl">Q</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
                  {<MathText text={currentQuestion.background + " " + currentQuestion.question} />}
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-2xl px-5 py-3 shadow-md">
              <div className="text-3xl animate-bounce-subtle">🏆</div>
              <div>
                <div className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">Reward</div>
                <div className="text-lg font-black text-yellow-800">
                  {currentQuestion.reward ?? 0} Tokens
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {answers.map((answer, index) => {
              const isSelected = selectedAnswer === answer;
              const isCorrectAnswer = answer === currentQuestion.correctAnswer;
              let buttonClass = 'group relative w-full text-left p-5 md:p-6 rounded-2xl transition-all duration-300 transform ';

              if (showSolution) {
                if (isCorrectAnswer) {
                  buttonClass += 'bg-gradient-to-r from-success-50 to-green-100 border-success-500 shadow-lg scale-105';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'bg-gradient-to-r from-danger-50 to-red-100 border-danger-500 shadow-lg';
                } else {
                  buttonClass += 'bg-gray-50 border-gray-200 opacity-60';
                }
              } else if (isSelected) {
                buttonClass += 'bg-gradient-to-r from-primary-50 to-purple-50 border-primary-500 shadow-xl scale-105';
              } else {
                buttonClass += 'bg-white border-gray-300 hover:border-primary-400 hover:shadow-lg';
              }
              const key = typeof answer === 'string' ? answer : index;

              return (
                <button
                  key={key}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={showSolution}
                  className={buttonClass}
                  type="button"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all duration-300
                      ${showSolution && isCorrectAnswer 
                        ? 'bg-success-500 text-white shadow-lg' 
                        : showSolution && isSelected && !isCorrect
                          ? 'bg-danger-500 text-white shadow-lg'
                          : isSelected 
                            ? 'bg-primary-500 text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>

                    <span className="flex-1 font-semibold text-gray-800 text-lg">
                      <MathText text={answer} />
                    </span>

                    {showSolution && isCorrectAnswer && (
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">✓</span>
                      </div>
                    )}
                    {showSolution && isSelected && !isCorrect && (
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">✗</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showSolution && (
            <div className={`mb-8 rounded-2xl overflow-hidden shadow-2xl ${isCorrect ? 'bg-gradient-to-br from-success-50 to-green-100' : 'bg-gradient-to-br from-danger-50 to-red-100'}`}>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">
                    {isCorrect ? '🎉' : '💡'}
                  </div>
                  <div>
                    <h4 className={`text-3xl font-black mb-1 ${isCorrect ? 'text-success-700' : 'text-danger-700'}`}>
                      {isCorrect ? 'Correct!' : 'Not Quite Right'}
                    </h4>
                    {isCorrect && (
                      <p className="text-success-600 font-semibold text-lg">
                        You earned {currentQuestion.reward ?? 0} tokens! 🪙
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-inner">
                  <h5 className="font-black text-gray-800 text-xl mb-4 flex items-center gap-2">
                    <span>📖</span> Step-by-Step Solution
                  </h5>
                  <div className="space-y-3">
                    {solutionSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed font-medium flex-1">
                          {<MathText text={step} />}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {!showSolution ? (
              <>
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer == null}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-black text-lg py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50"
                  type="button"
                >
                  Submit Answer →
                </button>
                <button
                  className="px-8 py-5 border border-gray-300 text-gray-700 font-black text-lg rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  onClick={() => setSelectedAnswer(null)}
                  type="button"
                >
                  Clear
                </button>
              </>
            ) : (
              <button
                onClick={ () => { handleNext(); } }
                className="flex-1 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-black text-lg py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                type="button"
              >
                {currentQuestionIndex < (totalQuestions || 0) - 1 ? 'Next Question →' : 'View Results 🎉'}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-b-2xl shadow-2xl p-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪙</span>
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase">Total Rewards</div>
                <div className="text-xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {totalRewards ?? 0} Tokens
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <div className="text-right">
                <div className="text-xs text-gray-500 font-semibold uppercase">Accuracy</div>
                <div className="text-xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  {accuracy}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;