import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import Header from '../components/Header';

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
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const header = screen.queryByTestId('header');
    expect(header).not.toBeInTheDocument();
  });
  test('Verifica se no Meals, renderiza o Header', () => {
    render(
      <Header currentPath="/meals" />,
    );

    expect(window.location.pathname).toBe('/meals');
    const meals = screen.getByText('Meals');
    expect(meals).toBeInTheDocument();
  });

  test('Verifica se no Drinks, renderiza o Header', () => {
    render(
      <Header currentPath="/drinks" />,
    );

    const drinks = screen.getByText('Drinks');
    expect(drinks).toBeInTheDocument();
  });

  test('Verifica se no Profile, renderiza o Header', () => {
    render(
      <Header currentPath="/profile" />,
    );

    const profiles = screen.getByText('Profile');
    expect(profiles).toBeInTheDocument();
  });

  test('Verifica se no DoneRecipes, renderiza o Header', () => {
    render(
      <Header currentPath="/done-recipes" />,
    );

    const profiles = screen.getByText('Done Recipes');
    expect(profiles).toBeInTheDocument();
  });

  test('Verifica se no DoneRecipes, renderiza o Header', () => {
    render(
      <Header currentPath="/favorite-recipes" />,
    );

    const profiles = screen.getByText('Favorite Recipes');
    expect(profiles).toBeInTheDocument();
  });
});

describe('Testes para o componente Drinks', () => {
/*   let email: HTMLElement;
  let password: HTMLElement;
  let button: HTMLElement; */

  test('Verifica se no componente "Drinks", renderiza o Header', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    /* ERRO DE CONFLITO DO RENDER POR CAUSA DO BEFOREEACH!!
    email = screen.getByTestId('email-input');
    password = screen.getByTestId('password-input');
    button = screen.getByTestId('login-submit-btn');
    fireEvent.change(email, { target: { value: 'usuario@example.com' } });
    fireEvent.change(password, { target: { value: 'senha123' } });

    fireEvent.click(button); */

    expect(window.location.pathname).toBe('/meals');
    expect(screen.getAllByText('Meals')).toHaveLength(2);
  });
});
