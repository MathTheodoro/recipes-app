import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe } from '../types/types';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
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
        console.log(data);
        const recipeData = location.pathname.includes('/meals')
          ? data.meals[0] : data.drinks[0];
        setRecipe(recipeData);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
      }
    };
    fetchRecipe();
  }, [id, location.pathname]);

  useEffect(() => {
    const savedIngredients = localStorage.getItem('inProgressRecipes');
    if (savedIngredients) {
      setCheckedIngredients(JSON.parse(savedIngredients));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedIngredients));
  }, [checkedIngredients, id]);

  const handleCheck = (ingredient: string) => {
    if (checkedIngredients.includes(ingredient)) {
      setCheckedIngredients(checkedIngredients.filter((item) => item !== ingredient));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    }
  };

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
        {Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient')
            && recipe[key]).map((key, index) => {
            const ingredient = recipe[key] as string;
            return (
              <li key={ key }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  className={
                    checkedIngredients.includes(ingredient)
                      ? 'checked-ingredient' : ''
                  }
                >
                  <input
                    type="checkbox"
                    onChange={ () => handleCheck(ingredient) }
                    checked={ checkedIngredients.includes(ingredient) }
                  />
                  <span>
                    {ingredient}
                  </span>
                </label>
              </li>
            );
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
