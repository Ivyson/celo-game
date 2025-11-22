// This component displays a single question and its possible answers.
const Question = ({ question, options, onAnswer }) => {
  return (
    <div className="question-container">
      <h2 className="question-text">{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button 
            key={index} 
            className="option-button" 
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;