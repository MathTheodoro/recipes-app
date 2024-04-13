import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';

function renderWithRouter(ui: JSX.Element, { route = '/' } = {}) {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
}

describe('Testes da tela RecipeInProgress', () => {
  test('Testando itens na tela', async () => {
    renderWithRouter(<App />, { route: '/done-recipes' });

    // const category = await screen.findByText('Vegetarian');
    // const img = await screen.findByTestId('recipe-photo');
    // expect(category).toBeInTheDocument();
    // expect(img).toBeInTheDocument();
  });
});
