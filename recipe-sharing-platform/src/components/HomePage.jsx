import { useState, useEffect } from "react";
import recipesData from "../data/data.json";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setRecipes(recipesData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Recipe Sharing Platform 🍳
      </h1>

      <div className="
        grid gap-8
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        max-w-6xl
        mx-auto
      ">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="
              bg-white
              rounded-xl
              shadow-md
              overflow-hidden
              transition duration-300
              hover:shadow-xl
              hover:scale-105
            "
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {recipe.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4">
                {recipe.summary}
              </p>

              <button className="
                text-blue-600
                font-medium
                hover:text-blue-800
                transition-colors
              ">
                View Recipe →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
