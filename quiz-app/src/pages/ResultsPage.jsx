// src/pages/ResultsPage.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../components';
import { calculateScorePercentage } from '../utils/questionUtils';
import './ResultsPage.css';

const ResultsPage = ({ score, totalQuestions, answers, onPlayAgain, onNewQuiz }) => {
  const percentage = calculateScorePercentage(score, totalQuestions);
  
  const getResultMessage = () => {
    if (percentage >= 80) return 'Excellent! 🌟';
    if (percentage >= 60) return 'Good job! 👍';
    if (percentage >= 40) return 'Not bad! 💪';
    return 'Keep practicing! 📚';
  };

  const getResultColor = () => {
    if (percentage >= 80) return '#28a745';
    if (percentage >= 60) return '#17a2b8';
    if (percentage >= 40) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div className="results-page">
      <div className="results-container">
        <h1 className="results-title">Quiz Complete! 🎉</h1>
        
        <div className="score-circle" style={{ borderColor: getResultColor() }}>
          <div className="score-number">{score}</div>
          <div className="score-total">/{totalQuestions}</div>
        </div>

        <div className="score-percentage" style={{ color: getResultColor() }}>
          {percentage}%
        </div>

        <div className="result-message" style={{ color: getResultColor() }}>
          {getResultMessage()}
        </div>

        <div className="answers-review">
          <h2>Review Your Answers</h2>
          <div className="answers-list">
            {answers.map((answer, index) => (
              <div 
                key={index} 
                className={`answer-review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="answer-question">
                  <span className="question-number">Q{index + 1}:</span>
                  <span className="question-text">{answer.question}</span>
                </div>
                <div className="answer-details">
                  <p className="your-answer">
                    <span>Your answer: </span>
                    <strong className={answer.isCorrect ? 'text-correct' : 'text-incorrect'}>
                      {answer.selectedAnswer}
                    </strong>
                  </p>
                  {!answer.isCorrect && (
                    <p className="correct-answer">
                      <span>Correct answer: </span>
                      <strong className="text-correct">{answer.correctAnswer}</strong>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="results-actions">
          <Button variant="primary" size="large" onClick={onPlayAgain}>
            Play Again
          </Button>
          <Button variant="secondary" size="large" onClick={onNewQuiz}>
            New Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

ResultsPage.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
    selectedAnswer: PropTypes.string,
    correctAnswer: PropTypes.string,
    isCorrect: PropTypes.bool
  })).isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  onNewQuiz: PropTypes.func.isRequired
};

export default ResultsPage;