import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { doneRecipes } from './mocks/doneRecipe';
import renderWithRouter from './Helpers/RenderWithBrowser';
import LocalStoreProvider from '../Provider/LocalStoreProvider';
import App from '../App';
import * as Copy from '../utils/writeClipboardText';

const doneRecipesRoute = 'done-recipes';

localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

describe('DoneRecipe page test', () => {
  test('Os Cards apresentao as informações corretas quando são Filtrados', async () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: doneRecipesRoute },
    );

    screen.getByText(/Spicy Arrabiata Penne/i);
    screen.getByText(/Aquamarine/i);
    await userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    screen.getByText(/Spicy Arrabiata Penne/i);
    expect(screen.queryByText(/Aquamarine/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    screen.getByText(/Aquamarine/i);
    expect(screen.queryByText(/Spicy Arrabiata Penne/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('filter-by-all-btn'));
    screen.getByText(/Spicy Arrabiata Penne/i);
    screen.getByText(/Aquamarine/i);
  });

  test('Btn share faz a cópia do url de detalhes da receita', async () => {
    const copyUrl = vi.spyOn(Copy, 'writeClipboardText').mockImplementation(() => { return Promise.resolve(); });
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: doneRecipesRoute },
    );

    await userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    expect(copyUrl).toHaveBeenCalled();
    expect(copyUrl).toHaveBeenCalledWith(`http://localhost:3000/meals/${doneRecipes[0].id}`);
  });

  test('Redireciona para página detalhes meals', async () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/done-recipes' },
    );
    await userEvent.click(screen.getByRole('button', { name: 'Spicy Arrabiata Penne' }));
    expect(window.location.href).toBe(`http://localhost:3000/meals/${doneRecipes[0].id}`);
  });

  test('Redireciona para página detalhes drinks', async () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/done-recipes' },
    );

    await userEvent.click(screen.getByAltText('1-img-button'));
    expect(window.location.href).toBe(`http://localhost:3000/drinks/${doneRecipes[1].id}`);
  });
});
