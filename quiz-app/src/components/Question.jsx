import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';

const Question = ({ question, questionNumber, totalQuestions }) => {
  return (
    <div className="question-container">
      <div className="question-header">
        <span className="question-badge">Question {questionNumber}</span>
        <span className="question-count">of {totalQuestions}</span>
      </div>
      <div className="question-card">
        <h2 className="question-text">{question}</h2>
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  questionNumber: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired
};

export default Question;