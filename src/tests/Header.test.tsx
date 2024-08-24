import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './Helpers/RenderWithBrowser';
import App from '../App';
import LocalStoreProvider from '../Provider/LocalStoreProvider';

const SEARCH = 'search-top-btn';
const INPUT = 'search-input';

describe('Test Header component', () => {
  test('Renderiza pagina meals corretamente', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/meals' },
    );

    const icon = screen.getByRole('img', { name: /profile/i });
    const iconSearch = screen.getByRole('img', { name: /search/i });

    expect(screen.getByText(/meals/i)).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
  });
  test('clicking on the search icon appears an input, new click input disappears', async () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/meals' },
    );

    const button = screen.getByRole('button', { name: /search/i });
    const searchInput = screen.queryByTestId(INPUT);

    expect(searchInput).toBeNull();

    userEvent.click(button);

    await waitFor(() => {
      const input = screen.queryByTestId(INPUT);
      expect(input).toBeInTheDocument();
    });

    userEvent.click(button);

    await waitFor(() => {
      const input = screen.queryByTestId(INPUT);
      expect(input).toBeInTheDocument();
    });
  });

  test('Renderiza pagina drinks corretamente', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/drinks' },
    );

    const icon = screen.getByRole('img', { name: /profile/i });
    const iconSearch = screen.getByRole('img', { name: /search/i });

    expect(screen.getByText(/drinks/i)).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
  });

  test('Renderiza pagina Profile corretamente', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/profile' },
    );

    const icon = screen.getByRole('img', { name: /profile/i });
    const search = screen.queryByTestId(SEARCH);

    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(search).toBeNull();
  });

  test('Renderiza pagina Done Recipes corretamente', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/done-recipes' },
    );

    const icon = screen.getByRole('img', { name: /profile/i });
    const search = screen.queryByTestId(SEARCH);

    expect(screen.getByText(/done recipes/i)).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(search).toBeNull();
  });

  test('Renderiza pagina Favorite Recipes corretamente', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/favorite-recipes' },
    );

    const icon = screen.getByRole('img', { name: /profile/i });
    const search = screen.queryByTestId(SEARCH);

    expect(screen.getByText(/favorite recipes/i)).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(search).toBeNull();
  });
  test('A pagina de login não contem Header', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
    );

    const banner = screen.queryByRole('banner');
    expect(banner).toBeNull();
  });
});
