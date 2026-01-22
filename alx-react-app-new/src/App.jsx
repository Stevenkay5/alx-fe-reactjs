import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="App">
        <UserProfile
        name="Alice"
        age="25"
        bio="Loves hiking and photography"
        />
        <h1>Counter App</h1>
        <Counter/>
      <WelcomeMessage />
      <Header/>
      <MainContent/>
      <Footer/>
      <UserProfile/>
    </div>
  );
}

export default App;
