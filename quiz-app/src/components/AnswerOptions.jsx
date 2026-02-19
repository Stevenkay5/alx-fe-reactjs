import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AnswerOptions.css';

const AnswerOptions = ({ options, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer, index) => {
    setSelectedAnswer(index);
    onAnswerSelect(answer);
  };

  return (
    <div className="answers-container">
      <h3 className="answers-title">Select your answer:</h3>
      <div className="answers-grid">
        {options.map((answer, index) => {
          const letter = String.fromCharCode(65 + index);
          return (
            <button
              key={index}
              className={`answer-button ${selectedAnswer === index ? 'selected' : ''}`}
              onClick={() => handleAnswerClick(answer, index)}
            >
              <span className="answer-letter">{letter}</span>
              <span className="answer-text">{answer}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

AnswerOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelect: PropTypes.func.isRequired
};

export default AnswerOptions;