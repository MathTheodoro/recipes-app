import { useContext } from 'react';
import { Link } from 'react-router-dom';
import MealsContext from '../../Context/MealsContext';
import DrinksContext from '../../Context/DrinksContext';
import { RecipeCardDataType } from '../../types/type';
import './recipes.css';

type CategoryData = {
  strCategory: string;
};

const btnCategory = [
  '/src/images/beef.png',
  'src/images/breakfast.png',
  'src/images/chicken.png',
  'src/images/dessert.png',
  'src/images/goat.png',
];
function Recipes({ type }: any) {
  const {
    apiMealsData,
    categories: mealsCategories,
    fetchByCategory: mealsFetch,
  } = useContext(MealsContext);
  const {
    apiDrinksData,
    categories: drinksCategories,
    fetchByCategory: drinksFetch,
  } = useContext(DrinksContext);

  let recipes: RecipeCardDataType[] = [];
  let categories: CategoryData[] = [];

  if (type === 'meals') {
    recipes = apiMealsData ? apiMealsData.slice(0, 12) : [];
    categories = mealsCategories ? mealsCategories.meals.slice(0, 5) : [];
  }
  if (type === 'drinks') {
    recipes = apiDrinksData ? apiDrinksData.slice(0, 12) : [];
    categories = drinksCategories ? drinksCategories.drinks.slice(0, 5) : [];
  }

  const handleClick = (categoryStr: string) => {
    if (type === 'meals') {
      mealsFetch(categoryStr);
    }
    if (type === 'drinks') {
      drinksFetch(categoryStr);
    }
  };

  return (
    <main className="recites-page">
      <section className="buttons">
        <button
          className="recites-cat-btn"
          data-testid="All-category-filter"
          onClick={ () => handleClick('all') }
        >
          <img src="/src/images/All.png" alt="" />

        </button>
        {categories && categories.map((category, index) => (
          <button
            className="recites-cat-btn"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            onClick={ () => handleClick(category.strCategory) }
          >
            <img src={ btnCategory[index] } alt="" />
          </button>
        ))}
      </section>
      <section className="recites-card">
        {recipes && recipes.map((recipe, index) => (
          <Link
            key={ index }
            to={ type === 'meals' ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }
          >
            <div key={ index } data-testid={ `${index}-recipe-card` } className="cards">
              <img
                src={ recipe.img }
                alt={ recipe.title }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{ recipe.title }</h3>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Recipes;
