import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteRecipesType } from '../utils/type';
import shareIcon from '../images/shareIcon.svg';
import favoriteBIcon from '../images/blackHeartIcon.svg';
import LocalStoreContext from '../Context/LocalStoreContext';
import Header from '../components/Header';

function Favorite() {
  const {
    favoriteRecipesStore: recipes,
    setfavoriteRecipesStore: setRecipes } = useContext(LocalStoreContext);

  const [buttonFilter, setButtonFilter] = useState('All');

  const handleShareBtn = (index: number) => {
    return () => {
      const recipe = filteredRecipes[index];

      const url = `http://localhost:3000/${recipe.type}s/${recipe.id}`;

      console.log(url);

      navigator.clipboard.writeText(url);

      const message = document.querySelector(`#message-${index}`);

      console.log(message);

      if (message instanceof HTMLElement) {
        message.style.display = 'block';

        setTimeout(() => { message.style.display = 'none'; }, 3000);
      }
    };
  };

  const handleFavoriteBtn = (idToRemove: string) => {
    const newFavoriteRecipes = recipes.filter((recipe) => recipe.id !== idToRemove);

    setRecipes(newFavoriteRecipes);
  };

  const handleRecipes = (value: string) => {
    setButtonFilter(value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (buttonFilter === 'All') return true;

    if (buttonFilter === 'Drink') return recipe.type === 'drink';

    if (buttonFilter === 'Meal') return recipe.type === 'meal';
    return true;
  });

  return (
    <>
      <Header />
      <div>

        <main>

          <div>

            <button
              onClick={ () => handleRecipes('All') }
              data-testid="filter-by-all-btn"
            >
              All
            </button>

            <button
              onClick={ () => handleRecipes('Meal') }
              data-testid="filter-by-meal-btn"
            >
              Meals
            </button>

            <button
              onClick={ () => handleRecipes('Drink') }
              data-testid="filter-by-drink-btn"
            >
              Drinks
            </button>

          </div>

          <div className="card-container">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <div key={ index }>
                  <Link to={ `/${recipe.type}s/${recipe.id}` }>
                    <img
                      src={ recipe.image }
                      alt={ `Foto de ${recipe.name}` }
                      data-testid={ `${index}-horizontal-image` }
                      height="200px"
                    />

                    <h2
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {recipe.name}
                    </h2>

                  </Link>

                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.type === 'drink'
                      ? recipe.alcoholicOrNot
                      : `${recipe.nationality} - ${recipe.category}`}
                  </p>

                  <button
                    type="button"
                    onClick={ handleShareBtn(index) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Ícone de Compartilhamento"
                    />

                  </button>
                  <span
                    id={ `message-${index}` }
                    style={ { display: 'none' } }
                  >
                    Link copied!
                  </span>

                  <button
                    type="button"
                    onClick={ () => handleFavoriteBtn(recipe.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ favoriteBIcon }
                      alt="Unfavorite"
                    />

                  </button>

                </div>

              ))

            ) : (
              <p>Nenhuma receita encontrada.</p>
            )}
          </div>

        </main>

      </div>

    </>
  );
}

export default Favorite;
