import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/RenderWithBrowser';

const emailTestId = 'profile-email';

const doneRecipesTestId = 'profile-done-btn';

const favoriteRecipesTestId = 'profile-favorite-btn';

const logoutTestId = 'profile-logout-btn';

describe('Profile', () => {
  it('renderiza o email e os botoes', () => {
    renderWithRouter(<App />, { route: '/profile' });

    expect(screen.getByTestId(emailTestId)).toBeInTheDocument();

    expect(screen.getByTestId(doneRecipesTestId)).toBeInTheDocument();

    expect(screen.getByTestId(favoriteRecipesTestId)).toBeInTheDocument();

    expect(screen.getByTestId(logoutTestId)).toBeInTheDocument();
  });

  it('Navega para rota Done Recipes quando o clique do botao ocorre', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    await userEvent.click(screen.getByTestId(doneRecipesTestId));

    expect(window.location.pathname).toBe('/done-recipes');
  });

  it('Navega para rota Favorite quando o clique do botao ocorre', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    await userEvent.click(screen.getByTestId(favoriteRecipesTestId));

    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  it('Navega para Home e limpa local Storage quando o clique do botao ocorre', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    await userEvent.click(screen.getByTestId(logoutTestId));

    expect(window.location.pathname).toBe('/');

    expect(localStorage.getItem('user')).toBeNull();

    expect(localStorage.getItem('doneRecipes')).toBeNull();

    expect(localStorage.getItem('favoriteRecipes')).toBeNull();

    expect(localStorage.getItem('inProgressRecipes')).toBeNull();
  });

  it('Email do usuario salvo no local storage renderiza na tela', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));

    renderWithRouter(<App />, { route: '/profile' });

    expect(screen.getByTestId(emailTestId)).toHaveTextContent('teste@teste.com');
  });
});
