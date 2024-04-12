import React, { useCallback, useState } from 'react';
import { DoneRecipeType } from '../../types/types';

type CardDoneRecipesProps = {
  recipe: DoneRecipeType;
  index: number;
};

function CardDoneRecipes({ recipe, index }: CardDoneRecipesProps) {
  const isDrink = recipe.type === 'drink';
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const handleShareClick = useCallback(() => {
    const recipeUrl = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    navigator.clipboard.writeText(recipeUrl)
      .then(() => alert('Recipe URL copied to clipboard!'))
      .catch((err) => console.error('Could not copy text: ', err));
    setCopyMessage('Link copied!');
  }, [recipe]);

  return (
    <div key={ index }>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>
        {isDrink
          ? `${recipe.alcoholicOrNot}` : `${recipe.nationality} - ${recipe.category}`}
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      <button onClick={ handleShareClick }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src="src/images/shareIcon.svg"
          alt="Share"
        />
      </button>
      {copyMessage && <p>{copyMessage}</p>}
      {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
        <span
          key={ tagIndex }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default CardDoneRecipes;
