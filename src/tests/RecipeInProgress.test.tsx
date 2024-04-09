import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeInProgress from '../pages/RecipeInProgress';

// Mock data
const mockData = {
  meals: [{
    strMeal: 'Chicken Handi',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979820.jpg',
    strCategory: 'Chicken',
    strInstructions: 'Mix all the spices and coat the chicken with it.',
    strIngredient1: 'Chicken',
    // Add all other properties as needed
  }],
};

// Mock fetch function
global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify(mockData))));

test('verifica se os componentes corretos são renderizados', async () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={ ['/meals/52771/in-progress'] }>
      <RecipeInProgress />
    </MemoryRouter>,
  );

  await waitFor(() => getByTestId('recipe-photo'));
  await waitFor(() => getByTestId('recipe-title'));
  await waitFor(() => getByTestId('recipe-category'));
  await waitFor(() => getByTestId('instructions'));
  await waitFor(() => getByTestId('share-btn'));
  await waitFor(() => getByTestId('favorite-btn'));
  await waitFor(() => getByTestId('finish-recipe-btn'));

  expect(getByTestId('recipe-photo')).toBeInTheDocument();
  expect(getByTestId('recipe-title')).toBeInTheDocument();
  expect(getByTestId('recipe-category')).toBeInTheDocument();
  expect(getByTestId('instructions')).toBeInTheDocument();
  expect(getByTestId('share-btn')).toBeInTheDocument();
  expect(getByTestId('favorite-btn')).toBeInTheDocument();
  expect(getByTestId('finish-recipe-btn')).toBeInTheDocument();
});
