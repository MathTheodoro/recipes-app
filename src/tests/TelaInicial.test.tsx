import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './Helpers/RenderWithBrowser';
import MealsProvider from '../Provider/MealsProvider';
import DrinksProvider from '../Provider/DrinksProvider';
import UniqueRecipeProvider from '../Provider/UniqueRecipeProvider';

import { detailMeals } from './mocks/detailMeal';
import { meals } from './mocks/meals';
import { mealCategories } from './mocks/mealCategories';
import { drinkCategories } from './mocks/drinkCategories';
import { drinks } from './mocks/drinks';
import { beef } from './mocks/beef';
import { detailDrinks } from './mocks/detailDrink';
import { cocoaDrinks } from './mocks/btnDrink';

vi.spyOn(global, 'fetch').mockImplementation(
  (url) => Promise.resolve(
    {
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals);
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') return Promise.resolve(detailMeals);
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') return Promise.resolve(beef);
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories);
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks);
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') return Promise.resolve(detailDrinks);
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') return Promise.resolve(cocoaDrinks);
      },
    } as Response,
  ),

);
const beefCategory = 'Beef-category-filter';

describe('Test tela inicial de receitas', () => {
  test('Verifica se o botao categoria meals beef funciona corretamente" ', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: '/meals' },
    );

    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
    expect(await screen.findByText(/Beef/i)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId(beefCategory));
    expect(await screen.findByText(/BIFE NA MANTEGA/i)).toBeInTheDocument();
  });

  test('Verifica se o botao all funciona corretamente" ', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: '/meals' },
    );

    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
    expect(await screen.findByText(/Beef/i)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId(beefCategory));
    expect(await screen.findByText(/BIFE NA MANTEGA/i)).toBeInTheDocument();
    expect(await screen.findByText(/all/i)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('All-category-filter'));
    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
  });

  test('Verifica se o botao categoria drinks funciona corretamente" ', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: '/drinks' },
    );

    expect(await screen.findByText(/GG/i)).toBeInTheDocument();
    expect(await screen.findByText(/Cocoa/i)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('Cocoa-category-filter'));
    expect(await screen.findByText(/Castillian Hot Chocolate/i)).toBeInTheDocument();
  });
  screen.debug();

  test('Renderiza Tela inicial com meals corretamente', async () => {
    renderWithRouter(
      <MealsProvider>
        <App />
      </MealsProvider>,
      { route: '/meals' },
    );
    await waitFor(() => {
      const mealsOne = screen.queryByText(/corba/i);
      const mealsTwo = screen.queryByText(/sushi/i);
      expect(mealsOne).toBeInTheDocument();
      expect(mealsTwo).toBeInTheDocument();
    });
  });

  test('Verifica se esta renderizando os Botoes', async () => {
    renderWithRouter(
      <MealsProvider>
        <App />
      </MealsProvider>,
      { route: '/meals' },
    );
    await waitFor(() => {
      const btnAll = screen.queryByTestId('All-category-filter');
      const btnOne = screen.queryByTestId('Beef-category-filter');
      const btnTwo = screen.queryByTestId('Breakfast-category-filter');
      const btnThree = screen.queryByTestId('Chicken-category-filter');
      const btnFour = screen.queryByTestId('Dessert-category-filter');
      const btnFive = screen.queryByTestId('Goat-category-filter');
      expect(btnAll).toBeInTheDocument();
      expect(btnOne).toBeInTheDocument();
      expect(btnTwo).toBeInTheDocument();
      expect(btnThree).toBeInTheDocument();
      expect(btnFour).toBeInTheDocument();
      expect(btnFive).toBeInTheDocument();
    });
  });

  test('Verifica se esta renderizando os Cards', async () => {
    renderWithRouter(
      <MealsProvider>
        <App />
      </MealsProvider>,
      { route: '/meals' },
    );
    await waitFor(() => {
      const cardOneImg = screen.queryByTestId('0-card-img');
      const cardOneName = screen.queryByTestId('0-card-name');
      const cardTwoImg = screen.queryByTestId('1-card-img');
      const cardTwoName = screen.queryByTestId('1-card-name');

      expect(cardOneImg).toBeInTheDocument();
      expect(cardOneName).toBeInTheDocument();
      expect(cardTwoImg).toBeInTheDocument();
      expect(cardTwoName).toBeInTheDocument();
    });
  });

  test('Ao clicar no link encaminha para pagina detalhes', async () => {
    renderWithRouter(
      <MealsProvider>
        <App />
      </MealsProvider>,
      { route: '/meals' },
    );
    await waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });

    const mealsOne = screen.getByText(/corba/i);
    userEvent.click(mealsOne);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument();
    });
  });

  test('Renderiza Tela inicial com drinks corretamente', async () => {
    renderWithRouter(
      <DrinksProvider>
        <App />
      </DrinksProvider>,
      { route: '/drinks' },
    );
    await waitFor(() => {
      const drinkOne = screen.queryByText(/GG/i);
      const drinkTwo = screen.queryByText(/A1/i);
      expect(drinkOne).toBeInTheDocument();
      expect(drinkTwo).toBeInTheDocument();
    });
  });

  test('Verifica se esta renderizando os Botoes', async () => {
    renderWithRouter(
      <DrinksProvider>
        <App />
      </DrinksProvider>,
      { route: '/drinks' },
    );
    await waitFor(() => {
      const btnOne = screen.queryByTestId('Ordinary Drink-category-filter');
      const btnTwo = screen.queryByTestId('Cocktail-category-filter');
      const btnThree = screen.queryByTestId('Shake-category-filter');
      const btnFour = screen.queryByTestId('Other/Unknown-category-filter');
      const btnFive = screen.queryByTestId('Cocoa-category-filter');
      expect(btnOne).toBeInTheDocument();
      expect(btnTwo).toBeInTheDocument();
      expect(btnThree).toBeInTheDocument();
      expect(btnFour).toBeInTheDocument();
      expect(btnFive).toBeInTheDocument();
    });
  });

  test('Ao clicar no link encaminha para pagina detalhes dos drinks', async () => {
    renderWithRouter(
      <DrinksProvider>
        <App />
      </DrinksProvider>,
      { route: '/drinks' },
    );
    await waitFor(() => {
      expect(screen.getByText(/GG/i)).toBeInTheDocument();
    });

    const drink = screen.getByText(/GG/i);
    userEvent.click(drink);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /GG/i })).toBeInTheDocument();
    });
  });
});
// verificar se carrega os datatestid;
// verificar se carrega as 12 primeiras receitas de drinks;
// verificar se carrega as 12 primeiras de meals;
// verifica se tem 5 botoes de category de comida;
// verifica se tem 5 botoes de category de drinks;
// verifica se tem um botao escrito "all";
// verifica se apertar na categoria botao funciona corretamente;
// verifica se apertar no all fnciona corretamente;
// verifica se apertar novamente no mesmo botao de categoria pagina volta original;
// verifica se ao clicar no card vai para pagina de detalhes tanto comida qt drinks;
