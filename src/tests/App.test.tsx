import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

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
    button = screen.getByRole('button');
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
    // Simula o usuário digitando um e-mail e uma senha corretos
    fireEvent.change(email, { target: { value: 'usuario@example.com' } });
    fireEvent.change(password, { target: { value: 'senha123' } });

    fireEvent.click(button);

    expect(window.location.pathname).toBe('/meals');
  });
});
