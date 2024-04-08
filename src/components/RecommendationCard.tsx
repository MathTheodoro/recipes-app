import React from 'react';
import { Recipe } from '../types/types';

type RecommendationProps = {
  recipe: Recipe;
  index: number;
};

function RecommendationCard({ recipe, index }: RecommendationProps) {
  return (
    <div data-testid={ `${index}-recommendation-card` }>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />
      <h2
        data-testid={ `${index}-recommendation-title` }
      >
        {recipe.strMeal || recipe.strDrink}
      </h2>
    </div>
  );
}

export default RecommendationCard;
