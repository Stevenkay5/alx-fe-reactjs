// src/pages/SetupPage.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CATEGORIES, DIFFICULTIES } from '../services/triviaApi';
import { Button } from '../components';
import './SetupPage.css';

const SetupPage = ({ onStart }) => {
  const [config, setConfig] = useState({
    amount: 10,
    category: 9,
    categoryName: 'General Knowledge',
    difficulty: 'easy'
  });

  const [errors, setErrors] = useState({});

  const validateConfig = () => {
    const newErrors = {};
    
    if (config.amount < 5 || config.amount > 50) {
      newErrors.amount = 'Number of questions must be between 5 and 50';
    }
    
    if (!config.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!config.difficulty) {
      newErrors.difficulty = 'Please select a difficulty';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateConfig()) {
      onStart(config);
    }
  };

  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value);
    setConfig(prev => ({
      ...prev,
      amount: value
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedCategory = CATEGORIES.find(c => c.id === selectedId);
    setConfig(prev => ({
      ...prev,
      category: selectedId,
      categoryName: selectedCategory?.name || 'General Knowledge'
    }));
  };

  const handleDifficultyChange = (e) => {
    setConfig(prev => ({
      ...prev,
      difficulty: e.target.value
    }));
  };

  return (
    <div className="setup-page">
      <div className="setup-container">
        <h1 className="setup-title">Quiz Setup</h1>
        <p className="setup-subtitle">Customize your quiz experience</p>

        <form onSubmit={handleSubmit} className="setup-form">
          {/* Number of Questions */}
          <div className="form-group">
            <label htmlFor="amount">Number of Questions:</label>
            <input
              type="range"
              id="amount"
              min="5"
              max="50"
              value={config.amount}
              onChange={handleAmountChange}
              className="amount-slider"
            />
            <div className="amount-display">
              <span>{config.amount} questions</span>
            </div>
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>

          {/* Category Selection */}
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={config.category}
              onChange={handleCategoryChange}
              className="category-select"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          {/* Difficulty Selection */}
          <div className="form-group">
            <label>Difficulty:</label>
            <div className="difficulty-options">
              {DIFFICULTIES.map(diff => (
                <label key={diff.id} className="difficulty-option">
                  <input
                    type="radio"
                    name="difficulty"
                    value={diff.id}
                    checked={config.difficulty === diff.id}
                    onChange={handleDifficultyChange}
                  />
                  <span className={`difficulty-label difficulty-${diff.id}`}>
                    {diff.name}
                  </span>
                </label>
              ))}
            </div>
            {errors.difficulty && <span className="error-message">{errors.difficulty}</span>}
          </div>

          {/* Quiz Preview */}
          <div className="quiz-preview">
            <h3>Your Quiz Settings:</h3>
            <ul className="preview-list">
              <li>
                <span>Questions:</span>
                <strong>{config.amount}</strong>
              </li>
              <li>
                <span>Category:</span>
                <strong>{config.categoryName}</strong>
              </li>
              <li>
                <span>Difficulty:</span>
                <strong className={`difficulty-${config.difficulty}`}>
                  {config.difficulty.charAt(0).toUpperCase() + config.difficulty.slice(1)}
                </strong>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="setup-actions">
            <Button 
              type="submit" 
              variant="primary" 
              size="large"
              fullWidth
            >
              Start Quiz 
            </Button>
          </div>
        </form>

        <div className="setup-footer">
          <p>Powered by Open Trivia Database</p>
          <small>Questions are fetched in real-time</small>
        </div>
      </div>
    </div>
  );
};

SetupPage.propTypes = {
  onStart: PropTypes.func.isRequired
};

export default SetupPage;