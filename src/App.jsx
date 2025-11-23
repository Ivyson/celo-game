import { useState } from 'react';
// import MathText from './utils/MathTex';
// import "katex"
// import 'katex/dist/katex.min.css';
// import { BlockMath, InlineMath } from 'react-katex';
import Quiz from './components/Quiz';
import { useAuth } from './components/Landing_Page';
import './styles/App.css';




function App() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const { currentUser, logout } = useAuth();
  if (selectedLevel) {
    console.log("Selected Level:", selectedLevel);
    return <Quiz level={selectedLevel} setLevel={setSelectedLevel} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* User Authentication Bar */}
      <div className="relative z-20">
        {currentUser ? (
          <div className="flex items-center justify-end gap-4 p-6">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 shadow-lg">
              <span className="text-white font-semibold">
                👤 <strong className="font-bold">{currentUser.username}</strong>
              </span>
            </div>
            <button 
              onClick={logout} 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Sign out →
            </button>
          </div>
        ) : (
          <div className="flex justify-end p-6">
            <a 
              href="./login.html" 
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg inline-block"
            >
              Sign in →
            </a>
          </div>
        )}
      </div>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-400/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '0.75s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-slide-down">
          <div className="mb-6 flex justify-center">
            <div className="text-8xl animate-bounce-subtle">🎓</div>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
            MathQuest
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-semibold leading-relaxed drop-shadow-lg">
            Master College mathematics while earning virtual Coins.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 text-white font-bold shadow-lg">
              Powered by Celo
            </div>
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 text-white font-bold shadow-lg">
              🪙 Earn Real Tokens
            </div>
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 text-white font-bold shadow-lg">
              Learn & Compete
            </div>
          </div>
        </div>

        {/* Level Selection */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">
              Choose Your Challenge
            </h2>
            <p className="text-xl text-white/80 font-semibold">
              Select a difficulty level to begin your journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
            {/* Level 1 Card */}
            <div className="group bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-glow-lg animate-scale-in">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-4xl font-black text-white drop-shadow-lg mb-2">Level 1</h3>
                    <p className="text-2xl text-green-50 font-bold">Beginner</p>
                  </div>
                  <div className="text-7xl animate-bounce-subtle">🌱</div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      📚
                    </div>
                    <span className="font-bold text-lg">Algebra • Functions • Trigonometry</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      ⏱️
                    </div>
                    <span className="font-bold text-lg">5 Questions</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🪙
                    </div>
                    <span className="font-bold text-lg">10 Tokens per question</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedLevel(1)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black text-xl py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl"
                >
                  Start Level 1 →
                </button>
              </div>
            </div>




            {/* Level 2 Card */}
            <div className="group bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-glow-lg animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-4xl font-black text-white drop-shadow-lg mb-2">Level 2</h3>
                    <p className="text-2xl text-blue-50 font-bold">Intermediate</p>
                  </div>
                  <div className="text-7xl animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>🚀</div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      📚
                    </div>
                    <span className="font-bold text-lg">Calculus • Linear Algebra</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      ⏱️
                    </div>
                    <span className="font-bold text-lg">5  Questions</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🪙
                    </div>
                    <span className="font-bold text-lg">15 Tokens per question</span>
                  </div>

                  
                </div>
                
                <button
                  onClick={() => setSelectedLevel(2)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-xl py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl"
                >
                  Start Level 2 →
                </button>
              </div>
            </div>
            {/* Level 3 Card */}
            <div className="group bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-glow-lg animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-4xl font-black text-white drop-shadow-lg mb-2">Level 3</h3>
                    <p className="text-2xl text-blue-50 font-bold">Advanced</p>
                  </div>
                  <div className="text-7xl animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>🔥</div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      📚
                    </div>
                    <span className="font-bold text-lg">Vectors & Advanced Calculus</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      ⏱️
                    </div>
                    <span className="font-bold text-lg">5  Questions</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🪙
                    </div>
                    <span className="font-bold text-lg">20 Tokens per question</span>
                  </div>

                  
                </div>
                
                <button
                  onClick={() => setSelectedLevel(3)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-xl py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl"
                >
                  Start Level 3 →
                </button>
              </div>
            </div>

            {/* Level 4  */}
            <div className="group bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-glow-lg animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-4xl font-black text-white drop-shadow-lg mb-2">Level 4</h3>
                    <p className="text-2xl text-blue-50 font-bold">Expert</p>
                  </div>
                  <div className="text-7xl animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>⚡</div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      📚
                    </div>
                    <span className="font-bold text-lg">Advanced Probability & Linear Algebra</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      ⏱️
                    </div>
                    <span className="font-bold text-lg">5  Questions</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🪙
                    </div>
                    <span className="font-bold text-lg">25 Tokens per question</span>
                  </div>

                  
                </div>
                
                <button
                  onClick={() => setSelectedLevel(4)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-xl py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl"
                >
                  Start Level 4 →
                </button>
              </div>
            </div>
            

            
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border-2 border-white/20 shadow-2xl">
            <h3 className="text-4xl font-black text-white text-center mb-10">
              Why Choose MathQuest?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center transform transition-all duration-300 hover:scale-110">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30">
                  <span className="text-6xl">📖</span>
                </div>
                <h4 className="text-2xl font-black text-white mb-3">Learn Effectively</h4>
                <p className="text-white/80 text-lg font-semibold leading-relaxed">
                  Detailed step-by-step solutions for every problem to deepen your understanding
                </p>
              </div>
              
              <div className="text-center transform transition-all duration-300 hover:scale-110">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30">
                  <span className="text-6xl">🏆</span>
                </div>
                <h4 className="text-2xl font-black text-white mb-3">Earn Real Rewards</h4>
                <p className="text-white/80 text-lg font-semibold leading-relaxed">
                  Get blockchain tokens for correct answers that have real value
                </p>
              </div>
              {/* <div className="bg-blue-500 text-white p-4 rounded mb-4">TAILWIND TEST — visible if working</div> */}
              {/* {katex.render("E=mc^2", document.createElement('div'), {
                throwOnError: false
              }) /* KaTeX test */} 
              {/* <div className="main-question">
            {/* <MathText text={"Hello World My Equation is \\(E=mc^2\\)"} /> */}
      {/* </div> */}

              <div className="text-center transform transition-all duration-300 hover:scale-110">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30">
                  <span className="text-6xl">📊</span>
                </div>
                <h4 className="text-2xl font-black text-white mb-3">Track Progress</h4>
                <p className="text-white/80 text-lg font-semibold leading-relaxed">
                  Monitor your performance and watch your skills improve over time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex-1">
                <div className="text-5xl font-black text-white mb-2">1,000+</div>
                <div className="text-white/90 font-bold text-lg">Students Learning</div>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/30"></div>
              <div className="flex-1">
                <div className="text-5xl font-black text-white mb-2">50,000+</div>
                <div className="text-white/90 font-bold text-lg">Tokens Earned</div>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/30"></div>
              <div className="flex-1">
                <div className="text-5xl font-black text-white mb-2">95%</div>
                <div className="text-white/90 font-bold text-lg">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-10 text-white/60 text-sm font-semibold relative z-10">
        <p>Powered by Celo Blockchain • Learn, Earn, Succeed</p>
      </div>
    </div>
  );
}

export default App;