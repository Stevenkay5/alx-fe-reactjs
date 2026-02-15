import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipeForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Recipe title is required.";
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else if (ingredients.split(",").length < 2) {
      newErrors.ingredients = "Please include at least two ingredients.";
    }

    if (!steps.trim()) {
      newErrors.steps = "Preparation steps are required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate submission
      console.log({
        title,
        ingredients: ingredients.split(","),
        steps: steps.split("\n"),
      });

      alert("Recipe submitted successfully! 🎉");

      // Reset form
      setTitle("");
      setIngredients("");
      setSteps("");

      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Add New Recipe 🍳
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Recipe Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${errors.title ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
              placeholder="Enter recipe title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ingredients (separate with commas)
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows="4"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${errors.ingredients ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
              placeholder="e.g. Flour, Sugar, Eggs"
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
          </div>

          {/* Steps */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Preparation Steps (one step per line)
            </label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              rows="5"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${errors.steps ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
              placeholder="Step 1: ...&#10;Step 2: ..."
            />
            {errors.steps && (
              <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                       hover:bg-blue-700 transition duration-300"
          >
            Submit Recipe
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddRecipeForm;
