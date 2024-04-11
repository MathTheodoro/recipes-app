import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RecipeInProgressType } from '../../types/types';
import './RecipeInProgress.css';

export const createMealRecipe = (receita: RecipeInProgressType) => {
  return {
    id: receita.idMeal,
    nationality: receita.strArea,
    name: receita.strMeal,
    category: receita.strCategory,
    image: receita.strMealThumb,
    tags: receita.strTags ? receita.strTags.split(',') : [],
    alcoholicOrNot: receita.strAlcoholic || '',
    type: 'meal',
    doneDate: new Date(),
  };
};

function RecipeInProgress() {
  const [recipe, setRecipe] = useState<RecipeInProgressType | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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
    favoriteRecipes = favoriteRecipes
      .filter((receita: RecipeInProgressType) => receita.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  // Verifica se a comida está favoritada
  const isFoodFavorited = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    return favoriteRecipes.some((receita: RecipeInProgressType) => receita.id === id);
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

  // Verifica se todos os ingredientes estão marcados
  const allIngredientsChecked = () => {
    if (recipe) {
      const ingredients = Object.keys(recipe)
        .filter((key) => key.startsWith('strIngredient') && recipe[key])
        .map((key) => recipe[key] as string);
      return ingredients.every((ingredient) => checkedIngredients.includes(ingredient));
    }
    return false;
  };

  const createDrinkRecipe = (receita: RecipeInProgressType) => {
    return {
      alcoholicOrNot: receita.strAlcoholic || '',
      category: receita.strCategory,
      doneDate: new Date(),
      id: receita.idDrink,
      image: receita.strDrinkThumb,
      name: receita.strDrink,
      nationality: receita.strArea || '',
      tags: receita.strTags ? receita.strTags.split(',') : [],
      type: 'drink',
    };
  };

  const finishRecipe = () => {
    if (recipe) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      let newRecipe;
      if (location.pathname.includes('/meals')) {
        newRecipe = createMealRecipe(recipe);
      } else {
        newRecipe = createDrinkRecipe(recipe);
      }
      if (newRecipe) {
        const newRecipies = [...doneRecipes, newRecipe];
        localStorage.setItem('doneRecipes', JSON.stringify(newRecipies));
        navigate('/done-recipes');
      }
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
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
      <button
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked() }
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
