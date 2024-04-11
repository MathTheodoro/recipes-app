import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import { CategoriesList, Drink } from '../types/types';
import {
  fetchDrinkCategories,
  fetchDrinks,
  fetchDrinksByCategory,
  fetchDrinksByFilters } from '../services/RecipesFetchs/DrinkFetchs';
import Footer from './Footer/Footer';

function Drinks() {
  const location = useLocation();
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [categories, setCategories] = useState<CategoriesList>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchDrinks().then((data) => setDrinks(data.slice(0, 12)));
    fetchDrinkCategories().then((data) => setCategories(data.slice(0, 5)));
  }, []);

  const handleCategoryFilter = async (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
      const allDrinks = await fetchDrinks();
      setDrinks(allDrinks.slice(0, 12));
    } else {
      let filteredDrinks;

      const categoriesToLoad12Meals = ['Ordinary Drink',
        'Cocktail', 'Shake', 'Cocoa', 'Other/Unknown'];
      if (categoriesToLoad12Meals.includes(category)) {
        filteredDrinks = await fetchDrinksByCategory(category);
        filteredDrinks = filteredDrinks.slice(0, 12);
      } else {
        filteredDrinks = await fetchDrinksByFilters();
      }

      setDrinks(filteredDrinks);
      setSelectedCategory(category);
    }
  };

  const handleRecipeClick = (id: string) => {
    navigate(`/drinks/${id}`);
  };

  return (
    <>
      <Header currentPath={ location.pathname } />
      <h3>Drinks</h3>
      <div>
        <div>
          <button
            key="all"
            data-testid="All-category-filter"
            onClick={ () => handleCategoryFilter(selectedCategory || '') }
          >
            {selectedCategory ? 'Clear Filter' : 'All'}
          </button>
          {categories.map((category) => (
            <button
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => handleCategoryFilter(category.strCategory) }
            >
              {category.strCategory}
            </button>
          ))}
        </div>
        {drinks.map((drink, index) => (
          <div
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
            role="button"
            tabIndex={ 0 }
            onClick={ () => handleRecipeClick(drink.idDrink) }
            onKeyDown={ (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleRecipeClick(drink.idDrink);
              }
            } }
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {drink.strDrink}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
