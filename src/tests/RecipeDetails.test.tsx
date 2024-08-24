import { vi } from 'vitest';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/RenderWithBrowser';
import MealsProvider from '../Provider/MealsProvider';
import App from '../App';
import { meals } from './mocks/meals';
import { drinks } from './mocks/drinks';
import DrinksProvider from '../Provider/DrinksProvider';

import { detailMeals } from './mocks/detailMeal';
import UniqueRecipeProvider from '../Provider/UniqueRecipeProvider';
import { mealCategories } from './mocks/mealCategories';
import { drinkCategories } from './mocks/drinkCategories';
import { detailDrinks } from './mocks/detailDrink';

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },

});

const shareBtn = 'share-btn';
const mealRoute = '/meals/52977';

describe('RecipeDetails test', () => {
  vi.spyOn(global, 'fetch').mockImplementation(
    (url) => Promise.resolve(
      {
        status: 200,
        ok: true,
        json: () => {
          if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);
          if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals);
          if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') return Promise.resolve(detailMeals);
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories);
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks);
          if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') return Promise.resolve(detailDrinks);
        },
      } as Response,
    ),

  );

  test('Renderiza paginas "/meals" e "/drinks" corretamente" ', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: '/drinks/15997' },
    );

    expect(await screen.findByText(/GG/i)).toBeInTheDocument();
    expect(await screen.findByText(/Ingredients/i)).toBeInTheDocument();
    expect(await screen.findByText(/Instructions/i)).toBeInTheDocument();
    expect(await screen.findByText(/Pour the Galliano liqueur over ice/i)).toBeInTheDocument();
  });

  test('Renderiza a página de detalhes da receita corretamente', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: mealRoute },
    );

    expect(await screen.findByText(/Corba/i)).toBeInTheDocument();
    expect(await screen.findByText(/Ingredients/i)).toBeInTheDocument();
    expect(await screen.findByText(/Instructions/i)).toBeInTheDocument();
    expect(await screen.findByText(/Pick through your lentils for any foreign debris./i)).toBeInTheDocument();
  });

  test('Verifica se o link da receita é copiado para o clipboard', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: mealRoute },
    );
    await userEvent.click(screen.getByTestId(shareBtn));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52977');
  });
  test('Favorita a receita corretamente', async () => {
    const initialFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(initialFavoriteRecipes).toHaveLength(0);

    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: mealRoute },
    );

    await userEvent.click(screen.getByTestId('favorite-btn'));

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favoriteRecipes).toHaveLength(1);
    expect(favoriteRecipes[0].id).toBe('52977');
  });
});
