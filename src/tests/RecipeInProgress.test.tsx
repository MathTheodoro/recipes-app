import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';

const Arrabiata = 'Spicy Arrabiata Penne';
const arrabiataImg = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
const rota = '/meals/52771/in-progress';

afterEach(() => { window.localStorage.clear(); });

const mockRecipeMeal = {
  idMeal: '52771',
  strMeal: `${Arrabiata}`,
  strDrinkAlternate: null,
  strCategory: 'Vegetarian',
  strArea: 'Italian',
  strInstructions:
          'Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\n'
          + 'In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\n'
          + 'Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.',
  strMealThumb:
          `${arrabiataImg}`,
  strTags: 'Pasta,Curry',
  strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
  strIngredient1: 'penne rigate',
  strIngredient2: 'olive oil',
  strIngredient3: 'garlic',
  strIngredient4: 'chopped tomatoes',
  strIngredient5: 'red chile flakes',
  strIngredient6: 'italian seasoning',
  strIngredient7: 'basil',
  strIngredient8: 'Parmigiano-Reggiano',
  strIngredient9: '',
  strIngredient10: '',
  strIngredient11: '',
  strIngredient12: '',
  strIngredient13: '',
  strIngredient14: '',
  strIngredient15: '',
  strIngredient16: null,
  strIngredient17: null,
  strIngredient18: null,
  strIngredient19: null,
  strIngredient20: null,
  strMeasure1: '1 pound',
  strMeasure2: '1/4 cup',
  strMeasure3: '3 cloves',
  strMeasure4: '1 tin ',
  strMeasure5: '1/2 teaspoon',
  strMeasure6: '1/2 teaspoon',
  strMeasure7: '6 leaves',
  strMeasure8: 'spinkling',
  strMeasure9: '',
  strMeasure10: '',
  strMeasure11: '',
  strMeasure12: '',
  strMeasure13: '',
  strMeasure14: '',
  strMeasure15: '',
  strMeasure16: null,
  strMeasure17: null,
  strMeasure18: null,
  strMeasure19: null,
  strMeasure20: null,
  strSource: null,
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

function renderWithRouter(ui: JSX.Element, { route = '/' } = {}) {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
}

describe('Testes da tela RecipeInProgress', () => {
  test('Testando itens na tela', async () => {
    const fetchResolvedValue = {
      json: async () => ({ meals: [mockRecipeMeal] }),
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolvedValue);

    renderWithRouter(<App />, { route: `${rota}` });

    const category = await screen.findByText('Vegetarian');
    const img = await screen.findByTestId('recipe-photo');
    expect(category).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('Testando a função handleCheck', async () => {
    // Configuração do teste
    const { user } = renderWithRouter(<App />, { route: `${rota}` });

    // Cria um espião para a função setItem do localStorage
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const ingredientCheckbox = await screen.findByTestId('0-ingredient-step');
    expect(ingredientCheckbox).toBeInTheDocument();
    await user.click(ingredientCheckbox);

    expect(setItemSpy).toHaveBeenCalledWith(
      'inProgressRecipes',
      JSON.stringify([
        'penne rigate',
      ]),
    );
    // Limpa o espião após o teste
    setItemSpy.mockRestore();
    window.localStorage.clear();
  });

  test('Testando a função copyLink', async () => {
    const { user } = renderWithRouter(<App />, { route: `${rota}` });

    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    const shareButton = await screen.findByTestId('share-btn');
    await user.click(shareButton);

    expect(writeTextSpy).toHaveBeenCalledWith(
      'http://localhost:3000/meals/52771',
    );
  });

  test('Testando a função toggleFavorite', async () => {
    // Configuração do teste
    const { user } = renderWithRouter(<App />, { route: `${rota}` });

    // Cria um espião para a função setItem do localStorage
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    await user.click(favoriteButton);

    expect(setItemSpy).toHaveBeenCalledWith(
      'favoriteRecipes',
      JSON.stringify([{
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: `${Arrabiata}`,
        image: `${arrabiataImg}`,
      }]),
    );

    await user.click(favoriteButton);

    expect(setItemSpy).toHaveBeenCalledWith(
      'favoriteRecipes',
      JSON.stringify([]),
    );

    // Limpa o espião após o teste
    setItemSpy.mockRestore();
  });

  /*   test('Testando a função createDrinks', async () => {
    // Configuração do teste
    const { user } = renderWithRouter(<App />, { route: `${routeDrinks}` });

    // Cria um espião para a função setItem do localStorage
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    await user.click(favoriteButton);

    expect(setItemSpy).toHaveBeenCalledWith(
      'favoriteRecipes',
      JSON.stringify([{
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: `${Arrabiata}`,
        image: `${arrabiataImg}`,
      }]),
    );
    setItemSpy.mockRestore();
  }); */

  test('Testando a função copyLink', async () => {
    const { user } = renderWithRouter(<App />, { route: `${rota}` });

    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    const shareButton = await screen.findByTestId('share-btn');
    await user.click(shareButton);

    expect(writeTextSpy).toHaveBeenCalledWith(
      'http://localhost:3000/meals/52771',
    );
  });

  test('Testando a função finishRecipe', async () => {
    // Configuração do teste
    const { user } = renderWithRouter(<App />, { route: `${rota}` });
    // const dateNow = new Date('2024-01-01T00:00:00Z');

    // const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    // vi.spyOn(RecipeInProgress, 'createMealRecipe').mockReturnValue({
    //   id: '52771',
    //   nationality: 'Italian',
    //   name: `${Arrabiata}`,
    //   category: 'Vegetarian',
    //   image: `${arrabiataImg}`,
    //   tags: ['Pasta', 'Curry'],
    //   alcoholicOrNot: '',
    //   type: 'meal',
    //   doneDate: dateNow,
    // });

    const checkbox0 = await screen.findByTestId('0-ingredient-step');
    const checkbox1 = await screen.findByTestId('1-ingredient-step');
    const checkbox2 = await screen.findByTestId('2-ingredient-step');
    const checkbox3 = await screen.findByTestId('3-ingredient-step');
    const checkbox4 = await screen.findByTestId('4-ingredient-step');
    const checkbox5 = await screen.findByTestId('5-ingredient-step');
    const checkbox6 = await screen.findByTestId('6-ingredient-step');
    const checkbox7 = await screen.findByTestId('7-ingredient-step');

    await user.click(checkbox0);
    await user.click(checkbox1);
    await user.click(checkbox2);
    await user.click(checkbox3);
    await user.click(checkbox4);
    await user.click(checkbox5);
    await user.click(checkbox6);
    await user.click(checkbox7);

    const finishButton = await screen.findByTestId('finish-recipe-btn');
    expect(finishButton).toBeEnabled();
    await user.click(finishButton);

    expect(window.location.pathname).toBe('/done-recipes');

    // expect(setItemSpy).toHaveBeenCalledWith(
    //   'doneRecipes',
    //   JSON.stringify([{
    //     id: '52771',
    //     nationality: 'Italian',
    //     name: `${Arrabiata}`,
    //     category: 'Vegetarian',
    //     image: `${arrabiataImg}`,
    //     tags: ['Pasta', 'Curry'],
    //     alcoholicOrNot: '',
    //     type: 'meal',
    //     doneDate: dateNow,
    //   }]),
    // );

    // Limpa o espião após o teste
    // setItemSpy.mockRestore();
  });
});
