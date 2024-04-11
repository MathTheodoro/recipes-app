import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Card from './Card';

export default function FavoriteRecipes() {
  const location = useLocation();

  const [typeBtn, setTypeBtn] = useState('all');

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  return (
    <>
      <Header currentPath={ location.pathname } />
      <div>
        {typeBtn === 'all'
        && favoriteRecipes.map((favorite: any, index: any) => (
          <Card
            image={ favorite.image }
            name={ favorite.name }
            id={ favorite.id }
            category={ favorite.category }
            nationality={ favorite.nationality }
            alcoholicOrNot={ favorite.alcoholicOrNot }
            key={ favorite.id }
            index={ index }
            type={ favorite.type }
          />
        ))}
        {favoriteRecipes.filter((favorite: any) => favorite.type === typeBtn)
          .map((favorite: any, index: any) => (
            <Card
              image={ favorite.image }
              name={ favorite.name }
              id={ favorite.id }
              category={ favorite.category }
              nationality={ favorite.nationality }
              alcoholicOrNot={ favorite.alcoholicOrNot }
              key={ favorite.id }
              index={ index }
              type={ favorite.type }
            />
          ))}
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setTypeBtn('all') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => setTypeBtn('meal') }
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setTypeBtn('drink') }
          >
            Drinks
          </button>
        </div>
      </div>
    </>
  );
}
