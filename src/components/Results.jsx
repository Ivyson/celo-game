// import Equation from "./Equations";
import Leaderboard from "./Leaderboard";
import MathText from "../utils/MathTex";
import { useState } from "react";
const Results = ({
  score = 0,
  totalQuestions = 0,
  totalRewards = 0,
  answerHistory = [],
  resetQuiz,
  currentLevel = 1,
  onNextLevel,
}) => {
  const totalQ = Number(totalQuestions) || 0;
  const sc = Number(score) || 0;
  const tr = Number(totalRewards) || 0;
  const answers = Array.isArray(answerHistory) ? answerHistory : [];
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const percentage = totalQ ? Math.round((sc / totalQ) * 100) : 0;

  const getGrade = () => {
    if (percentage >= 90) return { grade: "A+", color: "from-green-500 to-emerald-600", emoji: "🌟", message: "Outstanding!" };
    if (percentage >= 80) return { grade: "A", color: "from-green-400 to-green-600", emoji: "🎉", message: "Excellent!" };
    if (percentage >= 70) return { grade: "B", color: "from-blue-400 to-blue-600", emoji: "👏", message: "Well Done!" };
    if (percentage >= 60) return { grade: "C", color: "from-yellow-400 to-yellow-600", emoji: "💪", message: "Good Effort!" };
    return { grade: "D", color: "from-orange-400 to-orange-600", emoji: "📚", message: "Keep Practicing!" };
  };

  const { grade, color, emoji, message } = getGrade();

  const handleNextLevel = () => {
    if (typeof onNextLevel === "function") {
      if (currentLevel < 4)
      onNextLevel(currentLevel + 1);
    else{
      onNextLevel(1); 
    }
    }
    if (typeof resetQuiz === "function") {
      resetQuiz();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 py-8 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Results Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
          {/* Confetti Header */}
          <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
            <div className="relative z-10">
              <div className="text-8xl mb-6 animate-bounce-subtle">{emoji}</div>
              <h1 className="text-5xl md:text-6xl font-black mb-3 drop-shadow-lg">Quiz Complete!</h1>
              <p className="text-2xl text-white/90 font-semibold">{message}</p>
            </div>
          </div>

          {/* Score Summary Cards */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Score Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-purple-100 rounded-2xl p-8 text-center border-2 border-primary-200 shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-up">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200 rounded-full blur-2xl opacity-50" />
                <div className="relative z-10">
                  <div className="text-primary-600 text-sm font-black uppercase tracking-wider mb-3">Score</div>
                  <div className="text-6xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    {sc}
                    <span className="text-3xl text-gray-400">/{totalQ}</span>
                  </div>
                  <div className="text-primary-700 font-bold text-xl">{percentage}% Correct</div>
                </div>
              </div>

              {/* Grade Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 text-center border-2 border-purple-200 shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-2xl opacity-50" />
                <div className="relative z-10">
                  <div className="text-purple-600 text-sm font-black uppercase tracking-wider mb-3">Grade</div>
                  <div className={`text-6xl font-black mb-3 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{grade}</div>
                  <div className="text-purple-700 font-bold text-xl">{message}</div>
                </div>
              </div>

              {/* Rewards Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-8 text-center border-2 border-yellow-200 shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-2xl opacity-50" />
                <div className="relative z-10">
                  <div className="text-yellow-600 text-sm font-black uppercase tracking-wider mb-3">Rewards</div>
                  <div className="text-6xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3">
                    {tr}
                  </div>
                  <div className="text-yellow-700 font-bold text-xl flex items-center justify-center gap-2">
                    <span className="text-2xl">🪙</span> Tokens
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Review Section */}
            <div className="mb-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                Answer Review
              </h3>

              <div className="space-y-4">
                {answers.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-gray-50 text-center text-gray-600">No answers to review.</div>
                ) : (
                  answers.map((answer, index) => {
                    
                    const key = answer.id ?? answer.question ?? index;
                    const isCorrect = Boolean(answer.isCorrect);
                    const reward = Number(answer.reward) || 0;
                    const questionText = answer.question ?? `Question ${index + 1}`;
                    const selected = answer.selectedAnswer ?? "";
                    const correct = answer.correctAnswer ?? "";

                    return (
                      <div
                        key={key}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
                          isCorrect ? "bg-gradient-to-r from-success-50 to-green-100 border-success-300" : "bg-gradient-to-r from-danger-50 to-red-100 border-danger-300"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl shadow-lg ${
                              isCorrect ? "bg-success-500 text-white" : "bg-danger-500 text-white"
                            }`}
                          >
                            {isCorrect ? "✓" : "✗"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <p className="font-bold text-gray-900 text-lg leading-relaxed">
                                Q{index + 1}: <MathText text={questionText} />
                              </p>
                              {isCorrect && (
                                <div className="flex-shrink-0 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-black shadow-md">
                                  +{reward} 🪙
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <div className={`font-semibold ${isCorrect ? "text-success-700" : "text-danger-700"}`}>
                                Your answer:{" "}
                                <span className="font-black">
                                  <MathText text={selected} />
                                </span>
                              </div>
                              {!isCorrect && (
                                <div className="text-success-700 font-semibold">
                                  Correct answer:{" "}
                                  <span className="font-black">
                                    <MathText text={correct} />
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button
                type="button"
                onClick={() => typeof resetQuiz === "function" && resetQuiz()}
                className="bg-gradient-to-r from-primary-600 to-purple-600 text-white font-black py-5 px-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl text-lg"
              >
                Try Again
              </button>

              <button
                type="button"
                onClick={handleNextLevel}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-5 px-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl text-lg"
              >
                Next Level
              </button>

              <button
                type="button"
                onClick={() => { setShowLeaderboard(true); console.log("Leaderboard clicked"); }}
                className="bg-white border-2 border-gray-300 text-gray-800 font-black py-5 px-6 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
              >
                Leaderboard
              </button>
            </div>

            {/* Blockchain Claim Section */}
            <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 border-2 border-yellow-300 rounded-2xl p-8 shadow-xl animate-pulse-glow">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-6xl md:text-7xl animate-bounce-subtle">🔗</div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-black text-gray-900 mb-2">Claim Your Rewards on Blockchain</h4>
                  <p className="text-gray-700 font-semibold">
                    Connect your Celo wallet to claim{" "}
                    <span className="font-black text-orange-600">{tr} tokens</span> to your account
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl transform hover:scale-105 active:scale-95 text-lg whitespace-nowrap"
                  onClick={() => console.log("Connect wallet placeholder")}
                >
                  Connect Wallet 🔐
                </button>
              </div>
            </div>
          </div>
        </div>
              
                
        {/* Motivational Footer */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <p className="text-2xl font-black text-white drop-shadow-lg">
              {percentage >= 80 ? "Outstanding work! You're mastering college mathematics!" : "Keep practicing! Every question makes you stronger!"}
            </p>
          </div>
        </div>
        <Leaderboard isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} tokens={tr} score={score} />
      </div>
    </div>
  );
};

export default Results;