import { useState } from 'react'
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1>🍲 Recipe Sharing App</h1>

      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
