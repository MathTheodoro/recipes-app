import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
      />
      <form>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="searchType"
            value="ingredient"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="searchType"
            value="name"
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="searchType"
            value="first-letter"
          />
          Primeira letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="submit"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
