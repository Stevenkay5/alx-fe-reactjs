import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuiz } from '../hooks/useQuiz';
import { 
  Question, 
  AnswerOptions, 
  ProgressBar, 
  LoadingSpinner, 
  ErrorMessage,
  Button 
} from '../components';
import './QuizPage.css';

const QuizPage = ({ config, onComplete, onExit }) => {
  const {
    loading,
    error,
    currentQuestion,
    progress,
    quizState,
    score,
    userAnswers,
    loadQuestions,
    handleAnswer,
    resetQuiz,
    totalQuestions
  } = useQuiz();

  useEffect(() => {
    if (config) {
      loadQuestions(config);
    }
    return () => {
      resetQuiz();
    };
  }, [config, loadQuestions, resetQuiz]); 

  useEffect(() => {
    if (quizState === 'completed' && onComplete) {
      onComplete({
        score,
        totalQuestions,
        answers: userAnswers,
        percentage: totalQuestions > 0 ? (score / totalQuestions) * 100 : 0
      });
    }
  }, [quizState, score, totalQuestions, userAnswers, onComplete]);

  const onAnswerSelect = (answer) => {
    handleAnswer(answer);
  };

  if (loading) {
    return (
      <div className="quiz-page">
        <LoadingSpinner message="Fetching your quiz questions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-page">
        <ErrorMessage 
          message={error}
          onRetry={() => loadQuestions(config)}
        />
        <div className="quiz-actions">
          <Button variant="secondary" onClick={onExit}>
            Change Settings
          </Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion && quizState !== 'completed') {
    return (
      <div className="quiz-page">
        <ErrorMessage 
          message="No questions available. Please try different settings."
          onRetry={() => loadQuestions(config)}
        />
        <div className="quiz-actions">
          <Button variant="secondary" onClick={onExit}>
            Change Settings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <Button 
          variant="secondary" 
          size="small" 
          onClick={onExit}
          className="exit-button"
        >
          ← Exit Quiz
        </Button>
        <div className="quiz-stats">
          <span className="quiz-category">{config?.categoryName || 'Quiz'}</span>
          <span className={`quiz-difficulty quiz-difficulty-${config?.difficulty}`}>
            {config?.difficulty}
          </span>
        </div>
      </div>

      <ProgressBar 
        current={progress.current - 1} 
        total={progress.total} 
      />

      {currentQuestion && (
        <>
          <Question 
            question={currentQuestion.question}
            questionNumber={progress.current}
            totalQuestions={progress.total}
          />

          <AnswerOptions 
            options={currentQuestion.allAnswers}
            onAnswerSelect={onAnswerSelect}
          />
        </>
      )}

      <div className="quiz-footer">
        <div className="score-display">
          Score: <strong>{score}</strong> / {totalQuestions}
        </div>
      </div>
    </div>
  );
};

QuizPage.propTypes = {
  config: PropTypes.shape({
    amount: PropTypes.number,
    category: PropTypes.number,
    categoryName: PropTypes.string,
    difficulty: PropTypes.string
  }),
  onComplete: PropTypes.func,
  onExit: PropTypes.func.isRequired
};

export default QuizPage;