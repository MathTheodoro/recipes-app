import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/RenderWithBrowser';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_INPUT = 'login-submit-btn';
const EMAIL = 'estudante@tryber.com';
const PASSWORD = '1231456';

test('Os data-testids estão presentes', () => {
  renderWithRouter(<App />);
  screen.getByTestId(EMAIL_INPUT);
  screen.getByTestId(PASSWORD_INPUT);
  screen.getByTestId(LOGIN_INPUT);
});

test('Possibilidade de escrever nos campos', async () => {
  renderWithRouter(<App />);
  await userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL);
  await userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD);
  screen.getByDisplayValue(EMAIL);
  screen.getByDisplayValue(PASSWORD);
});

test('Validação do formulario e btn desativado/ativado', async () => {
  renderWithRouter(<App />);
  const btn = screen.getByTestId(LOGIN_INPUT);
  expect(btn).toBeDisabled();
  await userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL);
  await userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD);
  screen.getByDisplayValue(EMAIL);
  screen.getByDisplayValue(PASSWORD);
  expect(btn).toBeEnabled();
});

test('Após a submissão, a chave user está salva em localStorage', async () => {
  renderWithRouter(<App />);
  const btn = screen.getByTestId(LOGIN_INPUT);
  await userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL);
  await userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD);
  await userEvent.click(btn);
  expect(JSON.parse(localStorage.getItem('user') as string)).toEqual({ email: EMAIL });
});

test('Se a rota muda para a tela principal de receitas de comidas', async () => {
  renderWithRouter(<App />);
  const btn = screen.getByTestId('login-submit-btn');
  await userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL);
  await userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD);
  await userEvent.click(btn);
  expect(window.location.href).toBe('http://localhost:3000/meals');
});
