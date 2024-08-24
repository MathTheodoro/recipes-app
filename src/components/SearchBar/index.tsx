import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MealsContext from '../../Context/MealsContext';
import DrinksContext from '../../Context/DrinksContext';
import './index.css';

export default function SearchBar() {
  const form = { radio: 'name', input: '' };
  const [formData, setFormData] = useState(form);
  const { radio, input } = formData;
  const { handleSearchBarFetch: fetchMeals } = useContext(MealsContext);
  const { handleSearchBarFetch: fetchDrinks } = useContext(DrinksContext);
  const location = useLocation();

  const handleSubmit = () => {
    if (formData.input.length > 1 && formData.radio === 'firstLetter') {
      return window.alert('Your search must have only 1 (one) character');
    }
    switch (location.pathname) {
      case '/meals':
        return fetchMeals(radio, input);
      case '/drinks':
        return fetchDrinks(radio, input);
      default:
        break;
    }
  };

  return (
    <Form className="searchBar">
      <InputGroup
        className="mb-3 search-input"
      >
        <Form.Control
          data-testid="search-input"
          type="text"
          onChange={ ({ target }) => setFormData({ ...formData, input: target.value }) }
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSubmit }
        >
          Search
        </Button>
      </InputGroup>
      <div className="search_radio">

        <label htmlFor="ingredient" className="label">
          Ingredient
          <Form.Check
            checked={ formData.radio === 'ingredient' }
            onChange={ ({ target }) => setFormData({ ...formData, radio: target.name }) }
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="ingredient"
          />
        </label>
        <label htmlFor="name" className="label">
          Name
          <Form.Check
            checked={ formData.radio === 'name' }
            onChange={ ({ target }) => setFormData({ ...formData, radio: target.name }) }
            data-testid="name-search-radio"
            type="radio"
            name="name"
            id="name"
          />
        </label>
        <label htmlFor="firstLetter" className="label">
          First letter
          <Form.Check
            checked={ formData.radio === 'firstLetter' }
            onChange={ ({ target }) => setFormData({ ...formData, radio: target.name }) }
            data-testid="first-letter-search-radio"
            type="radio"
            name="firstLetter"
            id="firstLetter"
          />
        </label>
      </div>
    </Form>
  );
}

// REQUISITO: 9, 10, 11, 12, 13, 14
