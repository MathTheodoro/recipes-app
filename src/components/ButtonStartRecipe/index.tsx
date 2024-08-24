import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

function ButtonStartRecipe({ ingredients }: { ingredients: any[] }) {
  const [recipeDone, setRecipeDone] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const recipeId = location.pathname.split('/')[2];
  const recipeType = location.pathname.split('/')[1];

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes') || '{}');

    const isRecipeDone = doneRecipes.some((recipe: any) => recipe.id === recipeId);
    const isRecipeInProgress = !!inProgressRecipes[recipeType]?.[recipeId];

    setRecipeDone(isRecipeDone);
    setRecipeInProgress(inProgressRecipes);
  }, [recipeId]);

  const handleStartRecipe = () => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes') || '{}',
    );

    if (!inProgressRecipes[recipeType]) {
      inProgressRecipes[recipeType] = {};
    }

    if (!inProgressRecipes[recipeType][recipeId]) {
      inProgressRecipes[recipeType][recipeId] = [];
    } else {
      const oldIngredients = inProgressRecipes[recipeType][recipeId];
      inProgressRecipes[recipeType][recipeId] = [...oldIngredients, ...ingredients];
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    navigate(`/${recipeType}/${recipeId}/in-progress`);
  };

  return (
    <div>
      {recipeDone ? (
        <p>Recipe done!</p>
      ) : (
        <button
          onClick={ handleStartRecipe }
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0px', left: '0px' } }
          className="btn"
        >
          {recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}
export default ButtonStartRecipe;
