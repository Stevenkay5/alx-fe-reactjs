// src/App.js
import React, { useState } from 'react';
import './App.css';
import { 
  Button, 
  Question, 
  AnswerOptions, 
  ProgressBar,
  LoadingSpinner,
  ErrorMessage 
} from './components';

function App() {
  const [activeDemo, setActiveDemo] = useState('all');

  // Sample data
  const sampleQuestion = "What is the capital of France?";
  const sampleOptions = ["London", "Berlin", "Paris", "Madrid"];
  
  return (
    <div className="app">
      <header style={{
        backgroundColor: '#282c34',
        padding: '20px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1>🎯 Quiz App - Component Library</h1>
        <p>Phase 2: Basic UI Components</p>
      </header>

      <main style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Component Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <Button variant={activeDemo === 'all' ? 'primary' : 'secondary'} 
                  onClick={() => setActiveDemo('all')}>
            Show All
          </Button>
          <Button variant={activeDemo === 'progress' ? 'primary' : 'secondary'} 
                  onClick={() => setActiveDemo('progress')}>
            Progress Bar
          </Button>
          <Button variant={activeDemo === 'question' ? 'primary' : 'secondary'} 
                  onClick={() => setActiveDemo('question')}>
            Question
          </Button>
          <Button variant={activeDemo === 'answers' ? 'primary' : 'secondary'} 
                  onClick={() => setActiveDemo('answers')}>
            Answer Options
          </Button>
          <Button variant={activeDemo === 'buttons' ? 'primary' : 'secondary'} 
                  onClick={() => setActiveDemo('buttons')}>
            Buttons
          </Button>
          <Button variant={activeDemo === 'loading' ? 'primary' : 'secondary'} 
                  onClick={() => setActiveDemo('loading')}>
            Loading & Error
          </Button>
        </div>

        {/* Component Display Area */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '30px', 
          borderRadius: '10px',
          minHeight: '400px'
        }}>
          
          {/* All Components View */}
          {activeDemo === 'all' && (
            <>
              <h2>Progress Bar</h2>
              <ProgressBar current={2} total={10} />
              
              <h2 style={{ marginTop: '30px' }}>Question Component</h2>
              <Question 
                question={sampleQuestion}
                questionNumber={3}
                totalQuestions={10}
              />
              
              <h2 style={{ marginTop: '30px' }}>Answer Options</h2>
              <AnswerOptions 
                options={sampleOptions}
                onAnswerSelect={(ans) => console.log('Selected:', ans)}
              />
              
              <h2 style={{ marginTop: '30px' }}>Button Variants</h2>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button disabled>Disabled</Button>
              </div>
              
              <h2 style={{ marginTop: '30px' }}>Loading & Error</h2>
              <LoadingSpinner message="Fetching quiz data..." />
              <ErrorMessage 
                message="Network error occurred"
                onRetry={() => alert('Retrying...')}
              />
            </>
          )}

          {/* Individual Component Views */}
          {activeDemo === 'progress' && (
            <>
              <h2>Progress Bar Examples</h2>
              <ProgressBar current={0} total={10} />
              <ProgressBar current={5} total={10} />
              <ProgressBar current={9} total={10} />
            </>
          )}

          {activeDemo === 'question' && (
            <>
              <h2>Question Examples</h2>
              <Question 
                question="What is the largest ocean on Earth?"
                questionNumber={1}
                totalQuestions={5}
              />
              <Question 
                question="Which planet is known as the Red Planet?"
                questionNumber={2}
                totalQuestions={5}
              />
            </>
          )}

          {activeDemo === 'answers' && (
            <>
              <h2>Answer Options Demo</h2>
              <AnswerOptions 
                options={["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"]}
                onAnswerSelect={(ans) => alert(`You selected: ${ans}`)}
              />
            </>
          )}

          {activeDemo === 'buttons' && (
            <>
              <h2>Button Variants</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3>Colors:</h3>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                </div>
                <div>
                  <h3>Sizes:</h3>
                  <Button size="small">Small</Button>
                  <Button size="medium">Medium</Button>
                  <Button size="large">Large</Button>
                </div>
                <div>
                  <h3>States:</h3>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              </div>
            </>
          )}

          {activeDemo === 'loading' && (
            <>
              <h2>Loading States</h2>
              <LoadingSpinner />
              <LoadingSpinner message="Please wait while we prepare your quiz..." />
              
              <h2 style={{ marginTop: '40px' }}>Error States</h2>
              <ErrorMessage 
                message="Failed to load questions from the server"
                onRetry={() => alert('Retry clicked!')}
              />
              <ErrorMessage 
                message="Network connection lost"
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;