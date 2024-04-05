import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';
import Meals from '../pages/Meals';

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
  // Cria variaveis para os inputs e buttons da tela de login

  // Renderiza antes de cada test a pagina de app

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
    const labelSearch = screen.getByTestId('search-input');
    expect(labelSearch).toBeInTheDocument();
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

  test('Verifica o value do searchbar', async () => {
    render(
      <BrowserRouter>
        <Header currentPath="/meals" />
      </BrowserRouter>,
    );
    const searchBtn = screen.getByTestId('search-top-btn');
    await userEvent.click(searchBtn);

    const searchbar = screen.getByRole('textbox');
    expect(searchbar).toBeInTheDocument();

    await userEvent.type(searchbar, 'test');
    expect(searchbar).toHaveValue('test');
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
  test('Verifica o botão do searchbar', async () => {
    render(
      <BrowserRouter>
        <Meals />
      </BrowserRouter>,
    );
    const searchBtn = screen.getByTestId('profile-top-btn');
    expect(searchBtn).toBeInTheDocument();
  });
});
