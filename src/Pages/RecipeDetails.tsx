import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonStartRecipe from '../components/ButtonStartRecipe';
import { writeClipboardText } from '../utils/writeClipboardText';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoriteStore } from '../utils/favoriteStore';
// import '../Css/Carrosel.css';
import UniqueRecipeContext from '../Context/UniqueRecipeContext';
import LocalStoreContext from '../Context/LocalStoreContext';
import './RecipeDetails.css';

function RecipeDetails({ type }: { type: 'meals' | 'drinks' }) {
  const { id } = useParams();
  // const [details, setDetails] = useState<any>(null);
  const { recipeDetail: details,
    onSetRecipeDetail: setDetails,
  } = useContext(UniqueRecipeContext);
  const [erro, setError] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const { favoriteRecipesStore,
    setfavoriteRecipesStore,
  } = useContext(LocalStoreContext);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetchRecipeDetailsApi();
        const data = await response.json();
        handleRecipeDetailsData(data);
      } catch (error) {
        handleRecipeDetailsError(error);
      }
    };
    const fetchRecommendationsData = async () => {
      try {
        const response = await fetchRecommendationsApi();
        const data = await response.json();
        const recommendationsData = data[type === 'meals' ? 'drinks' : 'meals'];
        const recommendationsToShow = recommendationsData
          .map((recommendation: any, index: any) => ({
            ...recommendation,
            index,
          }))
          .filter((recommendation: any, index: any) => index < 6);

        setRecommendations(recommendationsToShow);
      } catch (error) {
        console.error(`Error fetching ${type === 'meals' ? 'drink' : 'meal'}
         recommendations:`, error);
      }
    };

    fetchRecipeDetails();
    fetchRecommendationsData();
  }, [id, type]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isRecipeFavorite = favoriteRecipes.some((recipe: any) => recipe.id === id);
    setIsFavorite(isRecipeFavorite);
  }, [id]);

  // Função responsável por buscar os detalhes da receita na API
  const fetchRecipeDetailsApi = async () => {
    return fetch(
      type === 'meals'
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
  };

  // Função responsável por buscar as recomendações relacionadas à receita na API
  const fetchRecommendationsApi = async () => {
    return fetch(
      type === 'meals'
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
  };

  // Função responsável por lidar com os dados dos detalhes da receita após a busca na API
  const handleRecipeDetailsData = (data: any) => {
    setDetails(data[type] ? data[type][0] : null);
    setError(null);
    setHasError(false);
  };

  // Função responsável por lidar com erros durante a busca dos detalhes da receita na API
  const handleRecipeDetailsError = (error: any) => {
    setError(`Erro ao buscar os detalhes de ${type === 'meals' ? 'comida' : 'bebida'}`);
    setHasError(true);
    console.error(`Erro ao buscar os detalhes de ${type === 'meals' ? 'comida' : 'bebida'}
    :`, error);
  };
  // Função responsável por compartilhar a URL da receita
  const handleShareRecipe = () => {
    const recipeUrl = window.location.href;
    writeClipboardText(recipeUrl);
  };

  // Função responsável por adicionar ou remover a receita dos favoritos
  const handleToggleFavorite = () => {
    if (!details) return;

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const updatedFavoriteRecipes = isFavorite
      ? favoriteRecipes.filter((recipe: any) => recipe.id !== id)
      : [...favoriteRecipes, favoriteStore(
        details,
        type === 'meals',
        window.location.href,
      )];

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    setfavoriteRecipesStore(updatedFavoriteRecipes);
    setIsFavorite(!isFavorite);
  };

  if (!details) {
    return (
      <div>
        No
        {' '}
        {type === 'meals' ? 'meal' : 'drink'}
        {' '}
        details found.
      </div>
    );
  }

  const ingredients = Object.keys(details)
    .filter((key) => key.includes('strIngredient') && details[key])
    .map((key) => details[key]);

  return (
    <div className="details-recipe">
      <header
        className="details-recipe-header"
      >
        <div>
          <h2 data-testid="recipe-category">
            {type === 'meals' ? details.strCategory : `${details.strCategory} 
          & ${details.strAlcoholic}`}
          </h2>
        </div>
        <div>
          <button
            className="details-recipe-header-btn"
            type="button"
            data-testid="share-btn"
            onClick={ handleShareRecipe }
          >
            <img src={ shareIcon } alt="Share" />
          </button>
          <button
            type="button"
            onClick={ handleToggleFavorite }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Favorite"
              style={ { width: '26px', height: '26px' } }
            />
          </button>
        </div>
      </header>
      <div className="title">
        <h1
          className="details-recipe-header-h1"
          data-testid="recipe-title"
        >
          {type === 'meals' ? details.strMeal
            : details.strDrink}
        </h1>
        <img
          className="details-recipe-img"
          data-testid="recipe-photo"
          src={ type === 'meals' ? details.strMealThumb : details.strDrinkThumb }
          alt={ type === 'meals' ? details.strMeal : details.strDrink }
        />
      </div>

      <div className="ingredients">
        <h3
          className="details-recipe-ingredients"
        >
          Ingredients
        </h3>
        <ul style={ { columnCount: 2 } }>
          {ingredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingredient} - ${details[`strMeasure${index + 1}`] || ''}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="instructions">
        <h3>Instructions</h3>
        <p data-testid="instructions">{details.strInstructions}</p>
        <span data-testid="video">{details.strYoutube}</span>

        <ButtonStartRecipe ingredients={ ingredients } />

      </div>

      <div className="recommendations">
        <h3>Recommendations</h3>
        <div className="recommendation-carousel">
          {recommendations.map((recommendation, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="recommendation-card"
            >
              <p data-testid={ `${index}-recommendation-title` }>
                {type === 'meals' ? recommendation.strDrink : recommendation.strMeal}
              </p>
              <img
                src={ type === 'meals' ? recommendation.strDrinkThumb
                  : recommendation.strMealThumb }
                alt={ type === 'meals'
                  ? recommendation.strDrink : recommendation.strMeal }
              />
            </div>
          ))}
        </div>
      </div>

      {hasError && (
        <div>
          <p>{erro}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
