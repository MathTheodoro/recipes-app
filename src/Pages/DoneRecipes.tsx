import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LocalStoreContext from '../Context/LocalStoreContext';
import { FavoriteStoreDataType } from '../types/type';
import { writeClipboardText } from '../utils/writeClipboardText';
import ShareIcon from '../images/shareIcon.svg';
import './DoneRecipes.css';

const btnCategory = [
  'src/images/drinks.png',
  'src/images/foods.png',
  'src/images/All.png',
];

function DoneRecipesPage() {
  const { doneRecipesStore } = useContext(LocalStoreContext);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filterTypeDoneRecipes = filter !== 'all'
    ? doneRecipesStore.filter(({ type }) => type === filter)
    : doneRecipesStore;

  const handleClickNavigate = (recipe: FavoriteStoreDataType) => {
    if (recipe.type === 'meal') { return navigate(`/meals/${recipe.id}`); }
    if (recipe.type === 'drink') { return navigate(`/drinks/${recipe.id}`); }
  };

  return (
    <div className="doneRecipe">
      <Header />
      {/* <img src="src/images/Group 10.png" alt="" /> */}
      <div className="doneRecipes-btns">
        <button
          onClick={ () => setFilter('all') }
          data-testid="filter-by-all-btn"
        >
          <img src={ btnCategory[2] } alt="" />
        </button>
        <button
          onClick={ () => setFilter('meal') }
          data-testid="filter-by-meal-btn"
        >
          <img src={ btnCategory[1] } alt="" />
        </button>
        <button
          onClick={ () => setFilter('drink') }
          data-testid="filter-by-drink-btn"
        >
          <img src={ btnCategory[0] } alt="" />
        </button>
      </div>
      <section className="doneRecipe-container">
        {filterTypeDoneRecipes && (
          filterTypeDoneRecipes.map((recipe, index) => (
            <div
              className="doneRecipes-card"
              key={ recipe.id }
            >
              <button
                onClick={ () => handleClickNavigate(recipe) }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ `${index}-img-button` }
                />
              </button>
              <div
                className={
                recipe.type === 'meal'
                  ? 'doneRecipe-info-meals'
                  : 'doneRecipe-info-drinks'
              }
              >
                <div className="doneRecipe-info-share-btn">
                  <button onClick={ () => handleClickNavigate(recipe) }>
                    <h4
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {recipe.name}
                    </h4>
                  </button>
                  <button
                    className="btn"
                    onClick={ () => writeClipboardText(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }
                  >
                    <img
                      className="recipeDone-share-btn"
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ ShareIcon }
                      alt="copy_url"
                    />
                  </button>
                </div>
                {recipe.type === 'meal' && (

                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                )}
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {`Done-in: ${recipe.doneDate}`}
                </p>
                <div
                  className="doneRecipe-tags"
                >
                  {recipe.type === 'meal' && (
                    recipe.tags.map((tag, indexTag) => (
                      <p
                        key={ indexTag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>)))}
                </div>
                {recipe.type === 'drink' && (
                  <p
                    style={ { marginTop: '-35px' } }
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </p>)}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default DoneRecipesPage;
