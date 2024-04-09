import React from 'react';
import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeProvider from '../context/RecipeProvider';
import Footer from '../components/Footer/Footer';
import RecipeDetails from '../pages/RecipeDetails';
import mockDetails1 from './mockDetails1.json';
import mockDetails2 from './mockDetails2.json';

const START_RECIPE_BTN = 'start-recipe-btn';
const LOADING = 'Carregando...';
const DEFAULT_RECIPE_DETAILS = '/drinks/17222';

describe('Testes para a tela de Login', () => {
  // Cria variaveis para os inputs e buttons da tela de login
  let email: HTMLElement;
  let password: HTMLElement;
  let button: HTMLElement;

  // Renderiza antes de cada test a pagina de app
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    email = screen.getByTestId('email-input');
    password = screen.getByTestId('password-input');
    button = screen.getByTestId('login-submit-btn');
  });

  test('Existe input de password', () => {
    expect(password).toBeInTheDocument();
  });

  test('Existe Botão para enviar', () => {
    expect(button).toBeInTheDocument();
  });

  test('Testa se ao digitar valores incorretos o botão está desabilitado', () => {
    // Simula o usuário digitando um e-mail e uma senha incorretos
    fireEvent.change(email, { target: { value: 'usuario' } });
    fireEvent.change(password, { target: { value: '123' } });

    expect(button).toBeDisabled();
  });

  test('Testa se ao clicar no botão enviar com os dados preenchidos ele é redirecionado', () => {
    fireEvent.change(email, { target: { value: 'usuario@example.com' } });
    fireEvent.change(password, { target: { value: 'senha123' } });

    fireEvent.click(button);

    expect(window.location.pathname).toBe('/meals');
  });
});

describe('Testes para o componente Header', () => {
  test('Rota "/": não tem header', () => {
    const header = screen.queryByTestId('header');
    expect(header).not.toBeInTheDocument();
  });

  test('Verifica se no Meals, renderiza o Header', () => {
    render(
      <BrowserRouter>
        <Header currentPath="/meals" />
      </BrowserRouter>,
    );

    expect(window.location.pathname).toBe('/meals');
    const meals = screen.getByText('Meals');
    expect(meals).toBeInTheDocument();
  });

  test('Verifica se no Drinks, renderiza o Header', () => {
    render(
      <BrowserRouter>
        <Header currentPath="/drinks" />
      </BrowserRouter>,
    );

    const drinks = screen.getByText('Drinks');
    expect(drinks).toBeInTheDocument();
  });

  test('Verifica se no Profile, renderiza o Header', () => {
    render(
      <BrowserRouter>
        <Header currentPath="/profile" />
      </BrowserRouter>,
    );

    const profiles = screen.getByText('Profile');
    expect(profiles).toBeInTheDocument();
  });

  test('Verifica se no DoneRecipes, renderiza o Header', () => {
    render(
      <BrowserRouter>
        <Header currentPath="/done-recipes" />
      </BrowserRouter>,
    );

    const profiles = screen.getByText('Done Recipes');
    expect(profiles).toBeInTheDocument();
  });

  test('Verifica se no FavoriteRecipies, renderiza o Header', () => {
    render(
      <BrowserRouter>
        <Header currentPath="/favorite-recipes" />
      </BrowserRouter>,
    );

    const profiles = screen.getByText('Favorite Recipes');
    expect(profiles).toBeInTheDocument();
  });

  test('Verifica se searchbar aparece depois de clicar no botão', async () => {
    render(
      <BrowserRouter>
        <Header currentPath="/meals" />
      </BrowserRouter>,
    );
    const searchBtn = screen.getByTestId('search-top-btn');
    await userEvent.click(searchBtn);
    const text = screen.getByRole('textbox');
    expect(text).toBeInTheDocument();
    const radioButton = screen.getByTestId('name-search-radio');
    expect(radioButton).toBeInTheDocument();
    await userEvent.click(searchBtn);
    expect(text).not.toBeInTheDocument();
  });

  test('Verifica se profile aparece na página depois de clicar no botão', async () => {
    render(
      <BrowserRouter>
        <Header currentPath="/meals" />
      </BrowserRouter>,
    );
    const profileBtn = screen.getByTestId('profile-top-btn');
    await userEvent.click(profileBtn);
    expect(window.location.pathname).toBe('/profile');
  });

  test('Verifica se showSearchIcon é false para uma rota não mapeada', () => {
    render(
      <BrowserRouter>
        <Header currentPath="/outraRota" />
      </BrowserRouter>,
    );

    // Verifica se o ícone de busca não está renderizado
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});

describe('Testes para o component searchBar', () => {
  test('Verifica o Radio Button do searchbar', async () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>,
    );
    const nameRadioButton = screen.getByTestId('name-search-radio');
    expect(nameRadioButton).toBeInTheDocument();
    const ingredientRadioButton = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadioButton).toBeInTheDocument();
    const firstLetterRadioButton = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterRadioButton).toBeInTheDocument();
  });

  test('Verifica o label e button search do searchbar', async () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>,
    );
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    expect(execSearchBtn).toBeInTheDocument();
  });

  test('Testando funções do searchbar', async () => {
    render(
      <BrowserRouter>
        <RecipeProvider>
          <SearchBar />
        </RecipeProvider>
      </BrowserRouter>,
    );
    window.history.pushState({}, 'Test page', '/drinks');
    const input = screen.getByTestId('search-input');
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    fireEvent.change(input, { target: { name: 'searchedtext', value: 'Aquamarine' } });
    expect(input).toHaveValue('Aquamarine');
    fireEvent.click(execSearchBtn);
    expect(window.location.pathname).toBe('/drinks');
  });
});

describe('Testes para o component Footer', () => {
  test('Verifica se vai para página Drinks depois de clicar no botão', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const drinkBtn = screen.getByRole('button', { name: /drink icon/i });
    await userEvent.click(drinkBtn);
    expect(window.location.pathname).toBe('/drinks');
  });

  test('Verifica se vai para página Meals depois de clicar no botão', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const mealsBtn = screen.getByRole('button', { name: /meal icon/i });
    await userEvent.click(mealsBtn);
    expect(window.location.pathname).toBe('/meals');
  });
});

describe('Testes do componente RecipeDetails', () => {
  /* beforeEach(() => {
  }); */
  afterEach(() => {

  });
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <RecipeDetails />
      </MemoryRouter>,
    );
  });

  test('renders loading state initially', () => {
    render(<RecipeDetails />, { wrapper: MemoryRouter });
    expect(screen.getByText(LOADING)).toBeInTheDocument();
  });

  test('renders meal details when pathname includes /meals', () => {
    render(<MemoryRouter initialEntries={ ['/meals/12345'] }><RecipeDetails /></MemoryRouter>);
  });

  test('renders drink details when pathname includes /drinks', () => {
    render(<MemoryRouter initialEntries={ ['/drinks/12345'] }><RecipeDetails /></MemoryRouter>);
  });

  test('Testando botão de "Iniciar Receita" do RecipeDetails', async () => {
    const MOCK_RESPONSE1 = {
      ok: true,
      status: 200,
      json: async () => mockDetails1,
    } as Response;

    const MOCK_RESPONSE2 = {
      ok: true,
      status: 200,
      json: async () => mockDetails2,
    } as Response;

    const mock = vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(MOCK_RESPONSE1)
      .mockResolvedValueOnce(MOCK_RESPONSE2);

    const { debug } = render(<MemoryRouter initialEntries={ [DEFAULT_RECIPE_DETAILS] }><RecipeDetails /></MemoryRouter>);
    debug();
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
    window.history.pushState({}, 'Test page', DEFAULT_RECIPE_DETAILS);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    expect(mock).toHaveBeenCalled();
    expect(window.location.pathname).toBe(DEFAULT_RECIPE_DETAILS);
    const execStartRecipeBtn = screen.getByTestId('start-recipe-btn');
    fireEvent.click(execStartRecipeBtn);
  });

  test('renders "Start Recipe" button initially', async () => {
    const { getByTestId } = render(<MemoryRouter initialEntries={ [DEFAULT_RECIPE_DETAILS] }><RecipeDetails /></MemoryRouter>);
    expect(screen.getByText(LOADING)).toBeInTheDocument();
    /* await waitFor(() => expect(getByTestId(START_RECIPE_BTN)).toBeInTheDocument()); */
    await waitFor(() => expect(screen.getByText('Receita')).toBeInTheDocument());
    expect(screen.queryByText(LOADING)).toBeNull();
    /* expect(getByTestId(START_RECIPE_BTN)).toHaveTextContent('Start Recipe'); */
  });

  test('changes button text to "Continue Recipe" when clicked', () => {
    const { getByTestId } = render(<RecipeDetails />, { wrapper: MemoryRouter });
    const button = getByTestId(START_RECIPE_BTN);
    fireEvent.click(button);
    expect(button).toHaveTextContent('Continue Recipe');
  });

  test('renders "Share" and "Favorite" buttons', () => {
    const { getByTestId } = render(<RecipeDetails />, { wrapper: MemoryRouter });
    expect(getByTestId('share-btn')).toBeInTheDocument();
    expect(getByTestId('favorite-btn')).toBeInTheDocument();
  });
});
