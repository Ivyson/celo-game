import { useState, useEffect } from 'react';

const Leaderboard = ({ isOpen, onClose, tokens = 0, score = 0 }) => {
  const [activeTab, setActiveTab] = useState('global'); // 'global' or 'level'
  const [currentUserRank, setCurrentUserRank] = useState(null);

  // Simulated leaderboard data
  const globalLeaderboard = [
    { rank: 1, username: "MathWizard2024", score: 485, tokens: 9700, level: 4, avatar: "🏆" },
    { rank: 2, username: "CalculusKing", score: 472, tokens: 9440, level: 4, avatar: "👑" },
    { rank: 3, username: "AlgebraQueen", score: 468, tokens: 9360, level: 4, avatar: "⭐" },
    { rank: 4, username: "TrigMaster", score: 451, tokens: 9020, level: 3, avatar: "🎯" },
    { rank: 5, username: "LinearLegend", score: 445, tokens: 8900, level: 4, avatar: "💎" },
    { rank: 6, username: "DerivativesDev", score: 438, tokens: 8760, level: 3, avatar: "🚀" },
    { rank: 7, username: "IntegralPro", score: 425, tokens: 8500, level: 3, avatar: "⚡" },
    { rank: 8, username: "ProbabilityPro", score: 418, tokens: 8360, level: 4, avatar: "🎲" },
    { rank: 9, username: "VectorVirtuoso", score: 410, tokens: 8200, level: 3, avatar: "🔥" },
    { rank: 10, username: "MatrixMaster", score: 395, tokens: 7900, level: 3, avatar: "💫" },
  ];

  const levelLeaderboard = [
    { rank: 1, username: "CalculusChamp", score: 245, tokens: 3675, level: 2, avatar: "🥇" },
    { rank: 2, username: "AlgebraAce", score: 238, tokens: 3570, level: 2, avatar: "🥈" },
    { rank: 3, username: "MathNinja", score: 230, tokens: 3450, level: 2, avatar: "🥉" },
    { rank: 4, username: "QuizMaster", score: 225, tokens: 3375, level: 2, avatar: "🎓" },
    { rank: 5, username: "NumberCruncher", score: 218, tokens: 3270, level: 2, avatar: "🔢" },
    { rank: 6, username: "FormulaFanatic", score: 210, tokens: 3150, level: 2, avatar: "📐" },
    { rank: 7, username: "TheoremThrasher", score: 205, tokens: 3075, level: 2, avatar: "📊" },
    { rank: 8, username: "EquationExpert", score: 198, tokens: 2970, level: 2, avatar: "✏️" },
  ];

  const currentLeaderboard = activeTab === 'global' ? globalLeaderboard : levelLeaderboard;
  useEffect(() => {
    if (isOpen && score > 0) {
      const userEntry = {
        rank: currentLeaderboard.length + 1,
        username: "You",
        score: score,
        tokens: tokens,
        level: 2,
        avatar: "👤",
        isCurrentUser: true
      };
      setCurrentUserRank(userEntry);
    }
  }, [isOpen, score, tokens, activeTab]);

  if (!isOpen) return null;

  const getMedalEmoji = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 animate-pulse" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-2 drop-shadow-lg">🏆 Leaderboard</h2>
              <p className="text-xl text-white/90 font-semibold">Top Performers in MathQuest</p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/30"
            >
              <span className="text-3xl">x</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-100 border-b border-gray-200 px-8 pt-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-6 py-3 font-black text-lg rounded-t-xl transition-all duration-300 ${
                activeTab === 'global'
                  ? 'bg-white text-primary-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              Global
            </button>
            <button
              onClick={() => setActiveTab('level')}
              className={`px-6 py-3 font-black text-lg rounded-t-xl transition-all duration-300 ${
                activeTab === 'level'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              By Level
            </button>
          </div>
        </div>

        {/* Leaderboard Content */}
        <div className="p-8 overflow-y-auto max-h-[500px]">
          {/* Top 3 Podium */}
          {activeTab === 'global' && (
            <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-up">
              {/* 2nd Place */}
              <div className="flex flex-col items-center order-2 md:order-1">
                <div className="text-5xl mb-3 animate-bounce-subtle" style={{ animationDelay: '0.1s' }}>
                  {currentLeaderboard[1].avatar}
                </div>
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-4 w-full text-center shadow-lg border-2 border-gray-400">
                  <div className="text-4xl mb-2">🥈</div>
                  <div className="font-black text-gray-900 text-sm mb-1 truncate">
                    {currentLeaderboard[1].username}
                  </div>
                  <div className="text-2xl font-black text-gray-700">{currentLeaderboard[1].score}</div>
                  <div className="text-sm font-semibold text-gray-600">{currentLeaderboard[1].tokens} 🪙</div>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center order-1 md:order-2 col-span-3 md:col-span-1">
                <div className="text-6xl mb-3 animate-bounce-subtle">
                  {currentLeaderboard[0].avatar}
                </div>
                <div className="bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-2xl p-6 w-full text-center shadow-xl border-4 border-yellow-500 transform scale-110">
                  <div className="text-5xl mb-2">🥇</div>
                  <div className="font-black text-gray-900 text-base mb-1 truncate">
                    {currentLeaderboard[0].username}
                  </div>
                  <div className="text-3xl font-black text-gray-800">{currentLeaderboard[0].score}</div>
                  <div className="text-base font-semibold text-gray-700">{currentLeaderboard[0].tokens} 🪙</div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center order-3">
                <div className="text-5xl mb-3 animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>
                  {currentLeaderboard[2].avatar}
                </div>
                <div className="bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl p-4 w-full text-center shadow-lg border-2 border-orange-400">
                  <div className="text-4xl mb-2">🥉</div>
                  <div className="font-black text-gray-900 text-sm mb-1 truncate">
                    {currentLeaderboard[2].username}
                  </div>
                  <div className="text-2xl font-black text-gray-700">{currentLeaderboard[2].score}</div>
                  <div className="text-sm font-semibold text-gray-600">{currentLeaderboard[2].tokens} 🪙</div>
                </div>
              </div>
            </div>
          )}

          {/* Rankings Table */}
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">📋</span>
              Rankings
            </h3>
            
            {currentLeaderboard.slice(activeTab === 'global' ? 3 : 0).map((entry, index) => {
              const actualRank = activeTab === 'global' ? index + 4 : entry.rank;
              return (
                <div
                  key={entry.rank}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl p-4 border-2 border-gray-200 transition-all duration-300 hover:shadow-lg hover:scale-102 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-black text-xl">
                        {getMedalEmoji(actualRank) || `#${actualRank}`}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="text-4xl flex-shrink-0">{entry.avatar}</div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-gray-900 text-lg truncate">{entry.username}</div>
                      <div className="text-sm font-semibold text-gray-600">Level {entry.level}</div>
                    </div>

                    {/* Stats */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-black text-gray-900">{entry.score}</div>
                      <div className="text-sm font-semibold text-gray-600 flex items-center justify-end gap-1">
                        {entry.tokens} <span className="text-base">🪙</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Current User Position */}
            {currentUserRank && (
              <div className="mt-6 pt-6 border-t-4 border-dashed border-gray-300">
                <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-4 border-primary-400 rounded-xl p-4 shadow-xl animate-pulse-glow">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-black text-xl">#{currentUserRank.rank}</span>
                    </div>
                    <div className="text-4xl flex-shrink-0">{currentUserRank.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-primary-900 text-lg">You (Current Session)</div>
                      <div className="text-sm font-semibold text-primary-700">Level {currentUserRank.level}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-black text-primary-900">{currentUserRank.score}</div>
                      <div className="text-sm font-semibold text-primary-700 flex items-center justify-end gap-1">
                        {currentUserRank.tokens} <span className="text-base">🪙</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center mt-3 text-gray-600 font-semibold text-sm">
                  Keep playing to climb the rankings!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 border-t border-gray-300">
          <div className="text-center">
            <p className="text-gray-700 font-bold text-lg mb-2">
              Compete with students worldwide!
            </p>
            <p className="text-gray-600 font-semibold text-sm">
              Rankings update in real-time • Earn tokens to climb higher
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;