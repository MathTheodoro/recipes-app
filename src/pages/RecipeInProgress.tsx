import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe } from '../types/types';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchRecipe = async () => {
      let url = '';
      if (location.pathname.includes('/meals')) {
        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else if (location.pathname.includes('/drinks')) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        const recipeData = location.pathname.includes('/meals')
          ? data.meals[0] : data.drinks[0];
        setRecipe(recipeData);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
      }
    };
    fetchRecipe();
  }, [id, location.pathname]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      {recipe.strAlcoholic && <p>{recipe.strAlcoholic}</p>}
      <ul>
        {Object.keys(recipe).map((key) => {
          if (key.startsWith('strIngredient') && recipe[key]) {
            return <li key={ key }>{recipe[key]}</li>;
          }
          return null;
        })}
      </ul>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default RecipeInProgress;
