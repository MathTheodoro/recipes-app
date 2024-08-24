import { screen, waitFor } from '@testing-library/react';
import { describe, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/RenderWithBrowser';

beforeEach(() => {
  const favoriteRecipes = [
    {
      id: '1',
      type: 'meal',
      nationality: 'American',
      category: 'Breakfast',
      alcoholicOrNot: '',
      name: item0,
      image: 'https://www.themealdb.com/images/media/meals/1543774956.jpg',
    },
    {
      id: '2',
      type: 'drink',
      nationality: '',
      category: 'Cocoa',
      alcoholicOrNot: '',
      image: 'https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg',
      name: 'Castillian Hot Chocolate',
    },
    {
      id: '3',
      type: 'meal',
      nationality: 'Kenyan',
      category: 'Goat',
      alcoholicOrNot: '',
      image: 'https://www.themealdb.com/images/media/meals/cuio7s1555492979.jpg',
      name: 'Mbuzi Choma (Roasted Goat)',
    },
    {
      id: '4',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      image: 'https://www.thecocktaildb.com/images/media/drink/i9suxb1582474926.jpg',
      name: '747 Drink',
    },
  ];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn(),
    },
  });
});

afterAll(() => {
  localStorage.clear();
  vi.resetAllMocks();
});
const endereco = '/favorite-recipes';
const shareBtn = '0-horizontal-share-btn';
const item0 = 'Fruit and Cream Cheese Breakfast Pastries';

describe('Verifica a montagem itens na tela', () => {
  it('Verifica se as receitas são carregadas do localStorage', () => {
    renderWithRouter(<App />, { route: endereco });
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByText('747 Drink')).toBeInTheDocument();
    expect(screen.getByTestId('2-horizontal-name')).toBeInTheDocument();
  });
  it('Verifica se os elementos estão na tela', () => {
    renderWithRouter(<App />, { route: endereco });
    expect(screen.getByRole('heading', { name: /favorite recipes/i })).toBeInTheDocument();
    expect(screen.getByTestId(shareBtn)).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('2-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });
  it('Verifica se a opção Nacionalidade - Categoria é exibida corretamente', () => {
    renderWithRouter(<App />, { route: endereco });
    expect(screen.getByText('747 Drink')).toBeInTheDocument();
    expect(screen.getByText(item0)).toBeInTheDocument();
    expect(screen.getByText(/American/i)).toBeInTheDocument();
    expect(screen.getByText(/alcoholic/i)).toBeInTheDocument();
  });
});

describe('Verifica a funcionalidade dos botões', () => {
  it('Verifica texto de aviso do botão de compartilhar', async () => {
    renderWithRouter(<App />, { route: endereco });

    await userEvent.click(screen.getByTestId(shareBtn));
    const shareMsg = screen.getAllByText('Link copied!');
    await waitFor(() => expect(shareMsg[0]).toHaveStyle('display: block'));
    await waitFor(() => expect(shareMsg[0]).toHaveStyle('display: none'), { timeout: 3000 });
  });

  it('Verifica se o link da receita é copiado para o clipboard', async () => {
    renderWithRouter(<App />, { route: endereco });

    await userEvent.click(screen.getByTestId(shareBtn));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/1');
  });

  it('Verifica se a receita é removida da tela e do localStorage', async () => {
    renderWithRouter(<App />, { route: endereco });

    expect(screen.getByText('747 Drink')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('3-horizontal-favorite-btn'));
    expect(screen.queryByText('747 Drink')).not.toBeInTheDocument();
  });
  it('Verifica se a mensagem "Nenhuma receita encontrada" é exibida corretamente', async () => {
    renderWithRouter(<App />, { route: endereco });

    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent(item0);
    expect(screen.getByTestId('1-horizontal-name')).toHaveTextContent('Castillian Hot Chocolate');
    expect(screen.getByTestId('2-horizontal-name')).toHaveTextContent('Mbuzi Choma (Roasted Goat)');
    expect(screen.getByTestId('3-horizontal-name')).toHaveTextContent('747 Drink');

    await userEvent.click(screen.getByTestId('3-horizontal-favorite-btn'));
    await userEvent.click(screen.getByTestId('2-horizontal-favorite-btn'));
    await userEvent.click(screen.getByTestId('1-horizontal-favorite-btn'));
    await userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));

    expect(screen.getByText('Nenhuma receita encontrada.')).toBeInTheDocument();
  });
  it('Verifica se o filtro de bebidas funciona corretamente', async () => {
    renderWithRouter(<App />, { route: endereco });

    expect(screen.getByText('747 Drink')).toBeInTheDocument();
    expect(screen.getByText(item0)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.queryByText(item0)).not.toBeInTheDocument();
    expect(screen.getByText('747 Drink')).toBeInTheDocument();
  });
  it('Verifica se o filtro de comidas funciona corretamente', async () => {
    renderWithRouter(<App />, { route: endereco });

    expect(screen.getByText('747 Drink')).toBeInTheDocument();
    expect(screen.getByText(item0)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.queryByText('747 Drink')).not.toBeInTheDocument();
    expect(screen.getByText(item0)).toBeInTheDocument();
  });
  it('Verifica se o filtro ALL funciona corretamente', async () => {
    renderWithRouter(<App />, { route: endereco });

    expect(screen.getByText('747 Drink')).toBeInTheDocument();
    expect(screen.getByText(item0)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getByText('747 Drink')).toBeInTheDocument();
    expect(screen.getByText(item0)).toBeInTheDocument();
  });

  describe('Verifica redirecionamento dos botões', () => {
    it('Verifica se o botão de perfil redireciona para a página de perfil', async () => {
      renderWithRouter(<App />, { route: endereco });
      const profileButton = screen.getByTestId('profile-top-btn');
      await userEvent.click(profileButton);
      expect(screen.getByRole('heading', { name: /profile/i })).toBeInTheDocument();
    });

    it('Verifica se ao clicar receita redireciona para a página de detalhes', async () => {
      renderWithRouter(<App />, { route: endereco });

      userEvent.click(screen.getByTestId('0-horizontal-image'));

      setTimeout(() => {
        expect(screen.getByTestId('recipe-title')).toHaveTextContent(item0);
      }, 2000);

      userEvent.click(screen.getByTestId('3-horizontal-name'));
      setTimeout(() => {
        expect(screen.getByTestId('recipe-title')).toHaveTextContent('747 Drink');
      }, 2000);
    });
  });
});
