import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import App from '../App';
import DrinksProvider from '../Provider/DrinksProvider';
import MealsProvider from '../Provider/MealsProvider';

import { oneMeal } from './mocks/oneMeal';
import { drinks } from './mocks/drinks';
import { oneDrink } from './mocks/oneDrink';
import { meals } from './mocks/meals';
import renderWithRouter from './Helpers/RenderWithBrowser';

const SEARCH_STRING = 'a';

const ingredientUrlMeal = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${SEARCH_STRING}`;
const nameUrlMeal = `https://www.themealdb.com/api/json/v1/1/search.php?s=${SEARCH_STRING}`;
const firstLetterUrlMeal = `https://www.themealdb.com/api/json/v1/1/search.php?f=${SEARCH_STRING}`;

const ingredientDrinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${SEARCH_STRING}`;
const nameDrinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${SEARCH_STRING}`;
const firstLetterDrinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${SEARCH_STRING}`;

const testIdFirstLetter = 'first-letter-search-radio';
const testIdNameSearch = 'name-search-radio';
const testIdSearchInput = 'search-input';
const testIdBtnSearch = 'exec-search-btn';

describe('Test component Barra de Busca ', () => {
  it('Cada opção na pagina de "/meals" busca pela API_URL correta" ', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValue({ status: 200, ok: true, json: async () => { return meals; },
      } as Response).mockResolvedValueOnce({ status: 200, ok: true, json: async () => { return mealCategories; },
      } as Response);

    renderWithRouter(
      <MealsProvider>
        <App />
      </MealsProvider>,
      { route: '/meals' },
    );

    const iconSearch = await screen.findByRole('img', { name: /search/i });

    await userEvent.click(iconSearch);

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(testIdNameSearch);
    const firstLetterRadio = screen.getByTestId(testIdFirstLetter);
    const searchInput = screen.getByTestId(testIdSearchInput);
    const searchBtn = screen.getByTestId(testIdBtnSearch);

    await userEvent.click(ingredientRadio);
    await userEvent.type(searchInput, SEARCH_STRING);
    await userEvent.click(searchBtn);

    expect(global.fetch).toHaveBeenCalledWith(ingredientUrlMeal);

    await userEvent.click(nameRadio);
    await userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(nameUrlMeal);

    await userEvent.click(firstLetterRadio);
    await userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(firstLetterUrlMeal);
  });

  test('Cada opção na pagina de "/drinks" busca pela API_URL correta', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValue({ status: 200, ok: true, json: async () => { return drinks; },
      } as Response)
      .mockResolvedValueOnce({ status: 200, ok: true, json: async () => { return drinkCategories; },
      } as Response);
    renderWithRouter(
      <DrinksProvider>
        <App />
      </DrinksProvider>,
      { route: '/drinks' },
    );

    expect(fetch).toHaveBeenCalledTimes(2);
    const iconSearch = screen.getByRole('img', { name: /search/i });

    await userEvent.click(iconSearch);

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(testIdNameSearch);
    const firstLetterRadio = screen.getByTestId(testIdFirstLetter);
    const searchInput = screen.getByTestId(testIdSearchInput);
    const searchBtn = screen.getByTestId(testIdBtnSearch);

    await userEvent.click(ingredientRadio);
    await userEvent.type(searchInput, SEARCH_STRING);
    await userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(ingredientDrinksUrl);

    await userEvent.click(nameRadio);
    await userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith(nameDrinksUrl);

    await userEvent.click(firstLetterRadio);
    await userEvent.click(searchBtn);

    expect(global.fetch).toHaveBeenCalledWith(firstLetterDrinksUrl);
  });

  test('Redericiona para a página "/drinks" de detalhes quando encontra apenas uma receita ', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValue({ status: 200, ok: true, json: async () => { return oneDrink; },
      } as Response).mockResolvedValueOnce({ status: 200, ok: true, json: async () => { return drinkCategories; },
      } as Response);
    renderWithRouter(
      <DrinksProvider>
        <App />
      </DrinksProvider>,
      { route: '/drinks' },
    );

    const iconSearch = screen.getByRole('img', { name: /search/i });

    await userEvent.click(iconSearch);
    const searchInput = screen.getByTestId(testIdSearchInput);
    const searchBtn = screen.getByTestId(testIdBtnSearch);
    const nameRadio = screen.getByTestId(testIdNameSearch);

    await userEvent.click(nameRadio);
    await userEvent.type(searchInput, SEARCH_STRING);
    await userEvent.click(searchBtn);

    expect(window.location.href).toMatch(oneDrink.drinks[0].idDrink);
  });

  test('Redericiona para a página "/meals" de detalhes quando encontra apenas uma receita ', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValue({ status: 200, ok: true, json: async () => { return oneMeal; },
      } as Response)
      .mockResolvedValueOnce({ status: 200, ok: true, json: async () => { return mealCategories; },
      } as Response);

    renderWithRouter(
      <MealsProvider>
        <App />
      </MealsProvider>,
      { route: '/meals' },
    );

    const iconSearch = screen.getByRole('img', { name: /search/i });

    await userEvent.click(iconSearch);
    const searchInput = screen.getByTestId(testIdSearchInput);
    const searchBtn = screen.getByTestId(testIdBtnSearch);
    const nameRadio = screen.getByTestId(testIdNameSearch);

    await userEvent.click(nameRadio);
    await userEvent.type(searchInput, SEARCH_STRING);
    await userEvent.click(searchBtn);

    expect(window.location.href).toMatch(oneMeal.meals[0].idMeal);
  });

  test('Quando não acha receita de "meals", retorna um alert ', async () => {
    const mockedAlert = vi.spyOn(global, 'alert').mockImplementation(() => {});
    vi.spyOn(global, 'fetch')
      .mockResolvedValue({ status: 200, ok: true, json: async () => { return { meals: null }; },
      } as Response)
      .mockResolvedValueOnce({ status: 200, ok: true, json: async () => { return mealCategories; },
      } as Response);

    renderWithRouter(
      <MealsProvider>
        <App />
      </MealsProvider>,
      { route: '/meals' },
    );

    const iconSearch = screen.getByRole('img', { name: /search/i });
    await userEvent.click(iconSearch);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const searchBtn = screen.getByTestId(testIdBtnSearch);
    const nameRadio = screen.getByTestId(testIdNameSearch);

    await userEvent.click(nameRadio);
    await userEvent.type(searchInput, SEARCH_STRING);
    await userEvent.click(searchBtn);

    expect(mockedAlert).toHaveBeenCalled();
  });

  test('Quando não acha receita de "drinks", retorna um alert ', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValue({ status: 200, ok: true, json: async () => { return { drinks: null }; },
      } as Response)
      .mockResolvedValueOnce({ status: 200, ok: true, json: async () => { return drinkCategories; },
      } as Response);
    const mockedAlert = vi.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(
      <DrinksProvider>
        <App />
      </DrinksProvider>,
      { route: '/drinks' },
    );

    const iconSearch = screen.getByRole('img', { name: /search/i });
    await userEvent.click(iconSearch);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const searchBtn = screen.getByTestId(testIdBtnSearch);
    const nameRadio = screen.getByTestId(testIdNameSearch);

    await userEvent.click(nameRadio);
    await userEvent.type(searchInput, SEARCH_STRING);
    await userEvent.click(searchBtn);

    expect(mockedAlert).toHaveBeenCalled();
  });
  test('Campo de Buca de "firstLetter", tem mas de uma letra ', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValue({ status: 200, ok: true, json: async () => { return { oneMeal }; },
      } as Response)
      .mockResolvedValueOnce({ status: 200, ok: true, json: async () => { return mealCategories; },
      } as Response);

    renderWithRouter(
      <MealsProvider>
        <App />
      </MealsProvider>,
      { route: '/meals' },
    );

    const iconSearch = screen.getByRole('img', { name: /search/i });
    await userEvent.click(iconSearch);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const searchBtn = screen.getByTestId(testIdBtnSearch);
    const firstLetterRadio = screen.getByTestId(testIdFirstLetter);

    await userEvent.click(firstLetterRadio);
    await userEvent.type(searchInput, 'aa');
    await userEvent.click(searchBtn);

    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});
