import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../../services/api';
import { Recipe } from '../../types/types';
import RecommendationCard from '../../components/RecommendationCard';
import './RecipeDetails.css';

function RecipeDetails() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Array<string>>([]);
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState('');
  const { id } = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  const erroRecive = 'Erro ao buscar receita:';

  const handleStartRecipeClick = () => {
    const recipeType = location.pathname.includes('/meals') ? 'meals' : 'drinks';
    console.log('>>>>OLHA PRA CÁ<<<<', location.pathname);
    navigate(`/${recipeType}/${id}/in-progress`);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this recipe!',
        url: window.location.href,
      }).then(() => {
        setCopySuccess('Link copied!'); // Atualize o estado quando a cópia for bem-sucedida
      }).catch(console.error);
    } else {
      console.log('==================>>>', navigator);
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setCopySuccess('Link copied!'); // Atualize o estado quando a cópia for bem-sucedida
        })
        .catch((err) => console.error('Could not copy text: ', err));
    }
  };

  const fetchDrink = async (drinkId: string | undefined): Promise<Recipe | null> => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.drinks.length > 0) { return data.drinks[0]; }
    } catch (error) {
      console.error(erroRecive, error);
    }
    return null;
  };

  const fetchMeal = async (mealId: string | undefined): Promise<Recipe | null> => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.meals.length > 0) { return data.meals[0]; }
    } catch (error) {
      console.error(erroRecive, error);
    }
    return null;
  };

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes') as string)
      : [];
    const isFav = favoriteRecipes.some((favRecipe: any) => favRecipe.id === id);
    setIsFavorite(isFav);
  }, [id]);

  const handleFavoriteClick = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes') as string)
      : [];

    if (recipe) { // Adicione esta verificação
      if (isFavorite) {
        const newFavoriteRecipes = favoriteRecipes.filter(
          (favRecipe: any) => favRecipe.id !== id,
        );
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
        setIsFavorite(false);
      } else {
        const newFavoriteRecipe = {
          id: recipe.idMeal || recipe.idDrink,
          type: location.pathname.includes('/meals') ? 'meal' : 'drink',
          nationality: recipe.strArea || '',
          category: recipe.strCategory || '',
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe.strMeal || recipe.strDrink,
          image: recipe.strMealThumb || recipe.strDrinkThumb,
        };
        localStorage.setItem('favoriteRecipes', JSON.stringify(
          [...favoriteRecipes, newFavoriteRecipe],
        ));
        setIsFavorite(true);
      }
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = location.pathname.includes('/meals')
          ? await fetchMeal(id) as Recipe
          : await fetchDrink(id) as Recipe;
        setRecipe(recipeData);
        setIngredients(saveArrIng(recipeData));
      } catch (error) {
        console.error(erroRecive, error);
      }
    };
    fetchRecipe();
  }, [id, location.pathname]);

  useEffect(() => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes') as string)
      : { meals: {}, drinks: {} };

    if (id) { // Verifique se id não é undefined
      const currentRecipeId = id;
      const isCurrentRecipeInProgress = location.pathname.includes('/meals')
        ? inProgressRecipes.meals[currentRecipeId]
        : inProgressRecipes.drinks[currentRecipeId];

      setIsRecipeInProgress(isCurrentRecipeInProgress);
    }
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
    <div className="RecipeDetails">
      <p>Dados da Receita</p>
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
        className="startRecipeBtn"
        data-testid="start-recipe-btn"
        onClick={ handleStartRecipeClick }
      >
        {isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
      <button
        type="button"
        data-testid="share-btn"
        className="compartilhar"
        onClick={ handleShareClick }
      >
        Compartilhar
      </button>
      <input
        type="image"
        data-testid="favorite-btn"
        onClick={ handleFavoriteClick }
        src={ isFavorite
          ? 'src/images/blackHeartIcon.svg' : 'src/images/whiteHeartIcon.svg' }
        alt="Favorite"
      />

      {copySuccess && <div>{copySuccess}</div>}
    </div>
  );
}

export default RecipeDetails;
