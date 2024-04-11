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
          src={ iconShare }
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => copyUrl() }
        >
          Compartilhar
        </button>
        { copy && <p>Link copied!</p>}
        <button
          type="button"
          src={ iconFav }
          data-testid={ `${index}-horizontal-favorite-btn` }
        >
          Desfavoritar
        </button>
      </div>
    </div>
  );
}
