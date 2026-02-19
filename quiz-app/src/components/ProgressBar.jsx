import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

const ProgressBar = ({ current, total }) => {
  const percentage = ((current + 1) / total) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-label">Progress</span>
        <span className="progress-percentage">{Math.round(percentage)}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="progress-stats">
        Question {current + 1} of {total}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default ProgressBar;