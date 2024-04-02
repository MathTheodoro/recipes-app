import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testes para a tela de Login', () => {
  test('Existe input de password', () => {
    render(<App />);
    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
  });
});
