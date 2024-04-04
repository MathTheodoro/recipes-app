import { useContext, useState } from 'react';
import RecipeContext from '../context/RecipeContext';
import { SearchType, ChangeEvent, SubmitEvent } from '../types/types';

function Search() {
  const { searchedInput } = useContext(RecipeContext);

  // searchData
  const [searchData, setSearchData] = useState<SearchType>({
    searchedtext: '',
    searchtype: 'name',
  });

  // handleChange
  const handleChange = (e: ChangeEvent) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  // handleSubmit
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    searchedInput(searchData);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <fieldset>
          <legend>Select search:</legend>
          <label>
            <input
              data-testid="name-search-radio"
              type="radio"
              name="searchtype"
              value="name"
              checked={ searchData.searchtype === 'name' }
              onChange={ handleChange }
            />
            Name
          </label>
          <label>
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              name="searchtype"
              value="ingredient"
              checked={ searchData.searchtype === 'ingredient' }
              onChange={ handleChange }
            />
            Ingredient
          </label>
          <label>
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              name="searchtype"
              value="firstletter"
              checked={ searchData.searchtype === 'firstletter' }
              onChange={ handleChange }
            />
            First Letter
          </label>
        </fieldset>
        <label htmlFor="textInput">
          <input
            data-testid="search-input"
            type="text"
            name="searchedtext"
            id="searchedtext"
            value={ searchData.searchedtext }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="exec-search-btn"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
