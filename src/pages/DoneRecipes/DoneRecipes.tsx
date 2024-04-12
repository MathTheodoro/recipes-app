import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import CardDoneRecipes from './CardDoneRecipes';
import { DoneRecipeType } from '../../types/types';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<DoneRecipeType[]>([]);
  const location = useLocation();

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setDoneRecipes(savedRecipes);
    setFilteredRecipes(savedRecipes);
  }, []);

  const filterRecipes = (type: string) => {
    if (type === 'All') {
      setFilteredRecipes(doneRecipes);
    } else {
      setFilteredRecipes(doneRecipes.filter((recipe) => recipe.type === type));
    }
  };

  return (
    <>
      <Header currentPath={ location.pathname } />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('All') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => filterRecipes('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drink') }
        >
          Drinks
        </button>
        {filteredRecipes.map((recipe, index) => (
          <CardDoneRecipes key={ index } recipe={ recipe } index={ index } />
        ))}
      </div>
    </>
  );
}
