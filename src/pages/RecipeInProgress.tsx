import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe } from '../types/types';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(true);
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

  const copyLink = () => {
    let url = window.location.href;
    url = url.replace('/in-progress', '');
    navigator.clipboard.writeText(url);
    setCopyMessage('Link copied!');
  };

  // Favorita a comida
  const favoriteRecipe = () => {
    if (recipe) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      let newRecipe;
      if (location.pathname.includes('/meals')) {
        newRecipe = {
          id: recipe.idMeal,
          type: 'meal',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
        };
      } else if (location.pathname.includes('/drinks')) {
        newRecipe = {
          id: recipe.idDrink,
          type: 'drink',
          nationality: '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe.strDrink,
          image: recipe.strDrinkThumb,
        };
      }
      if (newRecipe) {
        favoriteRecipes.push(newRecipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      }
    }
  };

  // Desfavorita a comida
  const unfavoriteRecipe = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    favoriteRecipes = favoriteRecipes.filter((receita: Recipe) => receita.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  // Verifica se a comida está favoritada
  const isFoodFavorited = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    return favoriteRecipes.some((receita: Recipe) => receita.id === id);
  };

  // Função para alternar o estado de favorito da comida
  useEffect(() => {
    setIsFavorited(isFoodFavorited());
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorited) {
      unfavoriteRecipe();
    } else {
      favoriteRecipe();
    }
    setIsFavorited(!isFavorited);
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
      <button data-testid="share-btn" onClick={ copyLink }>Compartilhar</button>
      {copyMessage && <p>{copyMessage}</p>}
      <button onClick={ toggleFavorite }>
        <img
          data-testid="favorite-btn"
          src={ isFoodFavorited()
            ? '/src/images/blackHeartIcon.svg' : '/src/images/whiteHeartIcon.svg' }
          alt="Favorito"
        />
      </button>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default RecipeInProgress;
