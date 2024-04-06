import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../services/api';
import { Recipe } from '../types/types';
import RecommendationCard from '../components/RecommendationCard';

function RecipeDetails() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Array<string>>([]);
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchRecipe = async () => {
      let url = '';
      if (location.pathname.includes('/meals')) {
        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetchDrinks();
      } else if (location.pathname.includes('/drinks')) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetchMeals();
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        const recipeData = data.meals ? data.meals[0] : data.drinks[0];
        setRecipe(recipeData);
        setIngredients(saveArrIng(recipeData));
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
      }
    };
    fetchRecipe();
  }, [id, location.pathname]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        let data;
        if (location.pathname.includes('/meals')) {
          data = await fetchDrinks();
        } else if (location.pathname.includes('/drinks')) {
          data = await fetchMeals();
        }
        setRecommendations(data);
      } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
      }
    };
    fetchRecommendations();
  }, [id, location.pathname]);

  const saveArrIng = (data: any) => {
    const ingredientsArr = [];
    for (let i = 1; i <= 20; i += 1) {
      if (data[`strIngredient${i}`]) {
        ingredientsArr.push(`${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`);
      }
    }
    return ingredientsArr;
  };

  if (!recipe) return <div>Carregando...</div>;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      <p data-testid="recipe-category">
        {
      `${recipe.strCategory}Alcoholic`
      || (recipe.strAlcoholic ? 'Alcoholic' : 'Non-Alcoholic')
}
      </p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {ingredient}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {recipe.strYoutube && (
        <iframe
          data-testid="video"
          title="YouTube Video"
          src="https://www.youtube.com/watch?v=HokyEdjb2HU"
          allowFullScreen
        />
      )}
      <div style={ { display: 'flex', overflowX: 'scroll', minWidth: '1200px' } }>
        {recommendations.slice(0, 6).map((recommendation, index) => (
          <RecommendationCard key={ index } recipe={ recommendation } index={ index } />
        ))}
      </div>
      <button
        type="button"
        style={ {
          position: 'fixed',
          bottom: '0',
          width: '100%',
          height: '50px',
          backgroundColor: '#f8f9fa',
          border: 'none',
          borderRadius: '5px',
          color: '#495057',
          fontSize: '18px',
          fontWeight: 'bold',
        } }
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;
