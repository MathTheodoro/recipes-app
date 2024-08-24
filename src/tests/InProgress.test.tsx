import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './Helpers/RenderWithBrowser';
import MealsProvider from '../Provider/MealsProvider';
import DrinksProvider from '../Provider/DrinksProvider';
import UniqueRecipeProvider from '../Provider/UniqueRecipeProvider';
import { detailDrinks } from './mocks/detailDrink';
import { detailMeals } from './mocks/detailMeal';
import LocalStoreProvider from '../Provider/LocalStoreProvider';

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },

});

vi.spyOn(global, 'fetch').mockImplementation(
  (url) => Promise.resolve(
    {
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') return Promise.resolve(detailMeals);
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') return Promise.resolve(detailDrinks);
      },
    } as Response,
  ),
);
const rout = '/meals/52977/in-progress';
const drinkRout = '/drinks/15997/in-progress';
const buttonFinish = 'finish-recipe-btn';
const buttonFavorite = 'favorite-btn';
describe('Testando pagina inProgress', () => {
  test('Verifica se renderiza os dataTestId na receita "/meals"', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: rout },
    );

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /corba/i })).toBeInTheDocument();
      expect(screen.queryByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.queryByTestId('recipe-title')).toBeInTheDocument();
      expect(screen.queryByTestId('share-btn')).toBeInTheDocument();
      expect(screen.queryByTestId(buttonFavorite)).toBeInTheDocument();
      expect(screen.queryByTestId('recipe-category')).toBeInTheDocument();
      expect(screen.queryByTestId('instructions')).toBeInTheDocument();
      expect(screen.queryByTestId(buttonFinish)).toBeInTheDocument();
      expect(screen.queryByTestId('0-ingredient-step')).toBeInTheDocument();
    });
  });

  test('Verifica se renderiza os dataTestId na receita "/drinks"', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: drinkRout },
    );

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /GG/i })).toBeInTheDocument();
      expect(screen.queryByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.queryByTestId('recipe-title')).toBeInTheDocument();
      expect(screen.queryByTestId('share-btn')).toBeInTheDocument();
      expect(screen.queryByTestId(buttonFavorite)).toBeInTheDocument();
      expect(screen.queryByTestId('recipe-category')).toBeInTheDocument();
      expect(screen.queryByTestId('instructions')).toBeInTheDocument();
      expect(screen.queryByTestId(buttonFinish)).toBeInTheDocument();
      expect(screen.queryByTestId('0-ingredient-step')).toBeInTheDocument();
    });
  });

  test('Verifica se renderiza lista de ingredientes', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: rout },
    );
    await waitFor(() => {
      expect(screen.queryByRole('list')).toBeInTheDocument();
      expect(screen.queryByText(/ingrediente: lentils - quantidade: 1 cup/i)).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /ingrediente: lentils - quantidade: 1 cup/i })).toBeInTheDocument();
    });
  });

  test('Verifica se tem botao de favoritar', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: rout },
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /favorite/i })).toBeInTheDocument();
    });
    const btn = screen.getByRole('button', { name: /favorite/i });
    userEvent.click(btn);

    expect(screen.getByAltText(/favorite/i)).toBeInTheDocument();
  });

  test('Verifica se tem botao de compartilhar copia o url correto', async () => {
    const mockedCopy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: rout },
    );

    const btnShare = await screen.findByTestId('share-btn');

    await userEvent.click(btnShare);

    expect(mockedCopy).toHaveBeenCalledWith('http://localhost:3000/meals/52977');
  });

  test('Verifica se o botao de finalizar esta desabilitado', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: rout },
    );
    await waitFor(() => {
      expect(screen.getByTestId(buttonFinish)).toBeDisabled();
    });
  });

  test('Salva receita "meals" no favoriteStore', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: rout },
    );

    await userEvent.click(await screen.findByTestId(buttonFavorite));
  });
  test('Salva receita "drinks" no favoriteStore', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: drinkRout },
    );

    await userEvent.click(await screen.findByTestId(buttonFavorite));
  });

  test('Retira receita no favoriteStore', async () => {
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: rout },
    );

    await userEvent.click(await screen.findByTestId(buttonFavorite));
    await userEvent.click(await screen.findByTestId(buttonFavorite));
  });

  test('Salva receita "meals" no doneRecipeStore', async () => {
    localStorage.clear();
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: rout },
    );
    const checkBoxs = await screen.findAllByRole('checkbox');

    await userEvent.click(checkBoxs[0]);
    expect(checkBoxs[0]).toBeChecked();
    await userEvent.click(checkBoxs[1]);
    await userEvent.click(checkBoxs[2]);
    await userEvent.click(checkBoxs[3]);
    await userEvent.click(checkBoxs[4]);
    await userEvent.click(checkBoxs[5]);
    await userEvent.click(checkBoxs[6]);
    await userEvent.click(checkBoxs[7]);
    await userEvent.click(checkBoxs[8]);
    await userEvent.click(checkBoxs[9]);
    await userEvent.click(checkBoxs[10]);
    await userEvent.click(checkBoxs[11]);
    await userEvent.click(checkBoxs[12]);

    expect(screen.getByTestId(buttonFinish)).toBeEnabled();
    await userEvent.click(screen.getByTestId(buttonFinish));
    expect(window.location.href).toBe('http://localhost:3000/done-recipes');
  });

  test('Salva receita "meals" no doneRecipeStore', async () => {
    localStorage.clear();
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: drinkRout },
    );
    const checkBoxs = await screen.findAllByRole('checkbox');

    await userEvent.click(checkBoxs[0]);
    expect(checkBoxs[0]).toBeChecked();
    await userEvent.click(checkBoxs[1]);
    await userEvent.click(checkBoxs[2]);

    expect(screen.getByTestId(buttonFinish)).toBeEnabled();
    await userEvent.click(screen.getByTestId(buttonFinish));
    expect(window.location.href).toBe('http://localhost:3000/done-recipes');
  });

  test('Marca e desmarca os checkbox', async () => {
    localStorage.clear();
    renderWithRouter(
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>,
      { route: drinkRout },
    );
    const checkBoxs = await screen.findAllByRole('checkbox');

    await userEvent.click(checkBoxs[0]);
    expect(checkBoxs[0]).toBeChecked();
    await userEvent.click(checkBoxs[0]);
    expect(checkBoxs[1]).not.toBeChecked();
  });

  test('Testa se os checkboxs salvos na recipeInProgressStore "meals" sao remarcados', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 15997: [0] } }));
    renderWithRouter(
      <LocalStoreProvider>
        <UniqueRecipeProvider>
          <DrinksProvider>
            <MealsProvider>
              <App />
            </MealsProvider>
          </DrinksProvider>
        </UniqueRecipeProvider>
      </LocalStoreProvider>,
      { route: drinkRout },
    );
    const checkBoxs = await screen.findAllByRole('checkbox');

    expect(checkBoxs[0]).toBeChecked();
  });

  test('Testa se os checkboxs salvos na recipeInProgressStore "meals" sao remarcados', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 52977: [0, 1, 2] } }));
    renderWithRouter(
      <LocalStoreProvider>
        <UniqueRecipeProvider>
          <DrinksProvider>
            <MealsProvider>
              <App />
            </MealsProvider>
          </DrinksProvider>
        </UniqueRecipeProvider>
      </LocalStoreProvider>,
      { route: rout },
    );
    const checkBoxs = await screen.findAllByRole('checkbox');

    expect(checkBoxs[0]).toBeChecked();
    expect(checkBoxs[1]).toBeChecked();
    expect(checkBoxs[2]).toBeChecked();
  });
});

// ao clicar no checkbox fica salvo no localstorage reinicia a tela continua check
// botao compartilhar
// verifica se favorita ou tira drink e comida
// botao finalizar
// botao esta disable
// redireciona apos click no botao para doneRecipes
// se e adicionada no localstorage donerecipes
