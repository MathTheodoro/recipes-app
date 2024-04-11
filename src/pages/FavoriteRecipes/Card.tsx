import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconShare from '../../images/shareIcon.svg';
import iconFav from '../../images/blackHeartIcon.svg';

export default function Card({
  image,
  name,
  id,
  category,
  nationality,
  alcoholicOrNot,
  index,
  type,
}: any) {
  const [copy, setCopy] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText((`${window.location.origin}/${type}s/${id}`));
    setCopy(true);
  };

  const desfavoritar = () => {
    // Puxe as receitas favoritas do localStorage
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    // Encontre o índice da receita atual nas receitas favoritas
    const recipeIndex = favoriteRecipes.findIndex((recipe) => recipe.id === id);

    // Se a receita estiver nas receitas favoritas, remova-a
    if (recipeIndex !== -1) {
      favoriteRecipes.splice(recipeIndex, 1);
    }

    // Atualize o localStorage com as novas receitas favoritas
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    console.log('Receita desfavoritada');
  };

  return (
    <div>
      <Link to={ `${window.location.origin}/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { type === 'meal'
            ? `${nationality} - ${category}` : `${alcoholicOrNot} - ${category}`}
        </p>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </p>
      </Link>
      <div>
        <button
          type="button"
          onClick={ () => copyUrl() }
        >
          <img
            src={ iconShare }
            alt="Compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
          />
          Compartilhar
        </button>
        { copy && <p>Link copied!</p>}
        <button
          type="button"
        >
          <img
            src={ iconFav }
            alt="Compartilhar"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
          Desfavoritar
        </button>
      </div>
    </div>
  );
}
