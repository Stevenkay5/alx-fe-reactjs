import React, { useState } from 'react';
import './App.css';

import SetupPage from './pages/SetupPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  const [appState, setAppState] = useState('setup'); // setup, quiz, results
  const [quizConfig, setQuizConfig] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const handleStartQuiz = (config) => {
    setQuizConfig(config);
    setAppState('quiz');
  };

  const handleQuizComplete = (results) => {
    setQuizResults({
      ...results,
      config: quizConfig
    });
    setAppState('results');
  };

  const handleExitQuiz = () => {
    setAppState('setup');
    setQuizConfig(null);
  };

  const handlePlayAgain = () => {
    setAppState('quiz');
    setQuizResults(null);
  };

  const handleNewQuiz = () => {
    setAppState('setup');
    setQuizConfig(null);
    setQuizResults(null);
  };

  return (
    <div className="App">
      {appState === 'setup' && (
        <SetupPage onStart={handleStartQuiz} />
      )}

      {appState === 'quiz' && quizConfig && (
        <QuizPage 
          config={quizConfig}
          onComplete={handleQuizComplete}
          onExit={handleExitQuiz}
        />
      )}

      {appState === 'results' && quizResults && (
        <ResultsPage 
          score={quizResults.score}
          totalQuestions={quizResults.totalQuestions}
          answers={quizResults.answers || []}
          onPlayAgain={handlePlayAgain}
          onNewQuiz={handleNewQuiz}
        />
      )}
    </div>
  );
}

export default App;