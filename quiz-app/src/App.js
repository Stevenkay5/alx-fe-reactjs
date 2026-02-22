// src/App.js
import React, { useState } from 'react';
import './App.css';

// Phase 2: Component Imports
import { 
  Button, 
  Question, 
  AnswerOptions, 
  ProgressBar,
  LoadingSpinner, 
  ErrorMessage 
} from './components';

// Phase 3: Page Imports
import SetupPage from './pages/SetupPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  // App State Management
  const [appState, setAppState] = useState('setup'); // setup, quiz, results, demo
  const [quizConfig, setQuizConfig] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  
  // Demo mode state for testing components
  const [demoMode, setDemoMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  // Handle quiz start
  const handleStartQuiz = (config) => {
    setQuizConfig(config);
    setAppState('quiz');
  };

  // Handle quiz completion
  const handleQuizComplete = (results) => {
    setQuizResults({
      ...results,
      config: quizConfig
    });
    setAppState('results');
  };

  // Handle exit from quiz
  const handleExitQuiz = () => {
    setAppState('setup');
    setQuizConfig(null);
  };

  // Handle play again (same settings)
  const handlePlayAgain = () => {
    setAppState('quiz');
    setQuizResults(null);
  };

  // Handle new quiz (different settings)
  const handleNewQuiz = () => {
    setAppState('setup');
    setQuizConfig(null);
    setQuizResults(null);
  };

  // Demo mode handlers
  const toggleDemoMode = () => {
    setDemoMode(!demoMode);
    setAppState(!demoMode ? 'demo' : 'setup');
  };

  const handleDemoAnswer = (answer) => {
    setSelectedAnswer(answer);
    console.log('Demo mode - Selected:', answer);
  };

  // Sample data for demo mode
  const demoQuestion = "What is the capital of France?";
  const demoOptions = ["London", "Berlin", "Paris", "Madrid"];
  
  // Render demo mode (Phase 2 component showcase)
  const renderDemoMode = () => (
    <div className="demo-container" style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '30px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#333', margin: 0 }}>
          🎯 Quiz App - Component Library (Phase 2)
        </h1>
        <Button variant="secondary" onClick={toggleDemoMode}>
          Exit Demo Mode
        </Button>
      </header>

      <div style={{ display: 'grid', gap: '30px' }}>
        
        {/* Progress Bar Section */}
        <section className="demo-section">
          <h2>1. Progress Bar Component</h2>
          <ProgressBar current={2} total={10} />
          <ProgressBar current={5} total={10} />
          <ProgressBar current={9} total={10} />
        </section>

        {/* Question Component Section */}
        <section className="demo-section">
          <h2>2. Question Component</h2>
          <Question 
            question={demoQuestion}
            questionNumber={3}
            totalQuestions={10}
          />
          <Question 
            question="Which planet is known as the Red Planet?"
            questionNumber={4}
            totalQuestions={10}
          />
        </section>

        {/* Answer Options Section */}
        <section className="demo-section">
          <h2>3. Answer Options Component</h2>
          <AnswerOptions 
            options={demoOptions}
            onAnswerSelect={handleDemoAnswer}
          />
          {selectedAnswer && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#d4edda',
              borderRadius: '5px',
              color: '#155724'
            }}>
              Selected: <strong>{selectedAnswer}</strong>
            </div>
          )}
        </section>

        {/* Button Variants Section */}
        <section className="demo-section">
          <h2>4. Button Component Variants</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full Width</Button>
          </div>
        </section>

        {/* Loading & Error Section */}
        <section className="demo-section">
          <h2>5. Loading & Error Components</h2>
          <div style={{ marginBottom: '20px' }}>
            <Button onClick={() => setShowLoading(!showLoading)}>
              Toggle Loading
            </Button>
          </div>
          
          {showLoading && (
            <LoadingSpinner message="Loading quiz questions..." />
          )}
          
          <ErrorMessage 
            message="Failed to load questions. Please check your connection."
            onRetry={() => alert('Retry clicked!')}
          />
        </section>
      </div>
    </div>
  );

  // Main render based on app state
  return (
    <div className="App">
      {/* Demo Mode Toggle Button (always visible except in demo mode) */}
      {appState !== 'demo' && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000
        }}>
          <Button 
            variant="secondary" 
            size="small" 
            onClick={toggleDemoMode}
          >
            🎨 Component Demo
          </Button>
        </div>
      )}

      {/* Render based on app state */}
      {appState === 'demo' && renderDemoMode()}

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