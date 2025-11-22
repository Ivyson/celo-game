import React from 'react';
import Quiz from './components/Quiz';
import './styles/app.css';

// This is the main component of the Mathematics Quiz application.
const App = () => {
  return (
    <div className="app-container">
      <h1 className="text-center">Mathematics Quiz Game</h1>
      <Quiz />
    </div>
  );
};

export default App;