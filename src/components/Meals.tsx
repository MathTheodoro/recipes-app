import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoriesList, Meal } from '../types/types';
import { fetchMealCategories,
  fetchMeals,
  fetchMealsByCategory,
  fetchMealsByFilters } from '../services/RecipesFetchs/MealFetchs';
import Header from './Header';
import Footer from './Footer/Footer';

function Meals() {
  const location = useLocation();
  const navigate = useNavigate();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<CategoriesList>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchMeals().then((data) => setMeals(data.slice(0, 12)));
    fetchMealCategories().then((data) => setCategories(data.slice(0, 5)));
  }, []);

  const handleCategoryFilter = async (category: string) => {
    if (category === activeFilter) {
      const allMeals = await fetchMeals();
      setMeals(allMeals.slice(0, 12));
      setActiveFilter(null);
    } else {
      let filteredMeals;
      const categoriesToLoad12Meals = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
      if (categoriesToLoad12Meals.includes(category)) {
        filteredMeals = await fetchMealsByCategory(category);
        filteredMeals = filteredMeals.slice(0, 12);
      } else {
        filteredMeals = await fetchMealsByFilters();
      }
      setMeals(filteredMeals);
      setActiveFilter(category);
    }
  };

  const handleClearFilters = async () => {
    const allMeals = await fetchMeals();
    setMeals(allMeals.slice(0, 12));
    setActiveFilter(null);
  };

  const handleRecipeClick = (id: string) => {
    navigate(`/meals/${id}`);
  };

  return (
    <>
      <Header currentPath={ location.pathname } />
      <h3>Meals</h3>
      <div>
        <div>
          <button
            key="all"
            data-testid="All-category-filter"
            onClick={ handleClearFilters }
          >
            All
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
        {meals.map((meal, index) => (
          <div
            key={ meal.idMeal }
            data-testid={ `${index}-recipe-card` }
            role="button"
            tabIndex={ 0 }
            onClick={ () => handleRecipeClick(meal.idMeal) }
            onKeyDown={ (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleRecipeClick(meal.idMeal);
              }
            } }
          >
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          </div>

        ))}
      </div>
      <Footer />
    </>
  );
}

export default Meals;
