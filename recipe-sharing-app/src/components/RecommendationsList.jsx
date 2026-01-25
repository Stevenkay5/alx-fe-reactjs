import { useRecipeStore } from '../recipeStore/recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) =>
    state.recommendedRecipes()
  );

  if (recommendations.length === 0) {
    return <p>No recommendations available yet.</p>;
  }

  return (
    <div>
      <h2>✨ Recommended for You</h2>
      {recommendations.map((recipe) => (
        <div key={recipe.id}>
          <h4>{recipe.title}</h4>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
