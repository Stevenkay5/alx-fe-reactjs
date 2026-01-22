import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import { useState } from 'react'
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const userData = {
    name: "Manzi Patrick",
    email: "manzipatrick@yahoo.com"
  };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage/>
    </UserContext.Provider>
      /**<div className="App">
        <UserProfile
        name="Alice"
        age="25"
        bio="Loves hiking and photography"
        />
      <WelcomeMessage />
      <Header/>
      <MainContent/>
      <Footer/>
      <UserProfile/>
    </div>**/
  );
}

export default App;
