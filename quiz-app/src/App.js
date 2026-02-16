import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 Quiz App</h1>
        <p>Welcome to your React Quiz Application</p>
      </header>
      <main className="app-main">
        <div className="setup-card">
          <h2>Getting Started</h2>
          <p>Phase 1 setup complete! 🎉</p>
          <p>Next steps:</p>
          <ul>
            <li>✅ Project initialized</li>
            <li>✅ Folder structure created</li>
            <li>✅ Basic files updated</li>
            <li>⏳ Ready for Phase 2: Components</li>
          </ul>
        </div>
      </main>
      <footer className="app-footer">
        <p>Quiz App - Development Phase 1</p>
      </footer>
    </div>
  );
}

export default App;