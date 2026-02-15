import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";

function RecipeDetail() {
  const { id } = useParams();

  const recipe = recipesData.find(
    (recipe) => recipe.id === parseInt(id)
  );

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">
          Recipe Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 md:h-96 object-cover"
        />

        <div className="p-6 md:p-10">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {recipe.title}
          </h1>

          {/* Ingredients Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <Link
            to="/"
            className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            ← Back to Recipes
          </Link>

        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
