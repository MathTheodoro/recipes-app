import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import LocalStoreProvider from '../Provider/LocalStoreProvider';
import renderWithRouter from './Helpers/RenderWithBrowser';

const DRINKS = 'drinks-bottom-btn';
const MEALS = 'meals-bottom-btn';

describe('Test Footer component', () => {
  test('Renderiza o componente footer na pagina meals corretamente', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/meals' },
    );

    const footerElement = screen.getByTestId('footer');
    const drinksbtn = screen.queryByTestId(DRINKS);
    const mealsbtn = screen.queryByTestId(MEALS);

    expect(footerElement).toBeInTheDocument();
    expect(drinksbtn).toBeInTheDocument();
    expect(mealsbtn).toBeInTheDocument();
  });
  test('Renderiza o componente footer na pagina drinks corretamente', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/drinks' },
    );

    const footerElement = screen.getByTestId('footer');
    const drinksbtn = screen.queryByTestId(DRINKS);
    const mealsbtn = screen.queryByTestId(MEALS);

    expect(footerElement).toBeInTheDocument();
    expect(drinksbtn).toBeInTheDocument();
    expect(mealsbtn).toBeInTheDocument();
  });
  test('Renderiza o componente footer na pagina profile corretamente', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/profile' },
    );

    const footerElement = screen.getByTestId('footer');
    const drinksbtn = screen.queryByTestId(DRINKS);
    const mealsbtn = screen.queryByTestId(MEALS);

    expect(footerElement).toBeInTheDocument();
    expect(drinksbtn).toBeInTheDocument();
    expect(mealsbtn).toBeInTheDocument();
  });
  test('Ao clicar no icone drink leva ate a pagina correta', async () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/profile' },
    );
    const drinksbtn = screen.getByTestId(DRINKS);

    userEvent.click(drinksbtn);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/drinks');
    });
  });
  test('Ao clicar no icone meals leva ate a pagina correta', async () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/profile' },
    );
    const mealsbtn = screen.getByTestId(MEALS);

    userEvent.click(mealsbtn);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/meals');
    });
  });

  test('A pagina de Login nao possui Footer', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
    );

    const footerElement = screen.queryByRole('contentinfo');
    const drinksbtn = screen.queryByTestId(DRINKS);
    const mealsbtn = screen.queryByTestId(MEALS);

    expect(footerElement).toBeNull();
    expect(drinksbtn).toBeNull();
    expect(mealsbtn).toBeNull();
  });
  test('O footer está fixado no final da página', () => {
    renderWithRouter(
      <LocalStoreProvider>
        <App />
      </LocalStoreProvider>,
      { route: '/meals' },
    );

    const footerElement = screen.getByTestId('footer');

    expect(footerElement).toBeInTheDocument();
    const footerComputedStyle = window.getComputedStyle(footerElement);
    expect(footerComputedStyle.position).toBe('fixed');
    expect(footerComputedStyle.bottom).toBe('0px');
  });
});
