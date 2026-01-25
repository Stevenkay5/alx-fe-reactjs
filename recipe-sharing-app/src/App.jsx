import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import AddRecipeForm from './AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1> Recipe Sharing App</h1>
      <Routes>
        <Route
        path="/"
        element={
          <>
          <AddRecipeForm />
          <RecipeList />
          </>
        }
        />
        <Route path="/recipes/:id" element={<RecipeDetails/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
