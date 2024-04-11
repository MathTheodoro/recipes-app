// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';
// import Meals from '../components/Meals';
// import Drinks from '../components/Drinks';

// describe('Testes do componente Recipes', () => {
//   describe('Meals', () => {
//     const recipeCode = '0-recipe-card';

//     test('se os botões de categoria aparecem', async () => {
//       render(
//         <MemoryRouter>
//           <Meals />
//         </MemoryRouter>,
//       );
//       const categoryFilter = await screen.findByText('Beef');
//       expect(categoryFilter).toBeInTheDocument();
//     });

//     test('se os filtros de categoria estão na tela', async () => {
//       render(
//         <MemoryRouter>
//           <Meals />
//         </MemoryRouter>,
//       );
//       const categoryFilter = await screen.findByText('Chicken');
//       expect(categoryFilter).toBeInTheDocument();
//     });

//     test('se seleciona um filtro corretamente', async () => {
//       render(
//         <MemoryRouter>
//           <Meals />
//         </MemoryRouter>,
//       );
//       const categoryFilter = await screen.findByText('Beef');
//       userEvent.click(categoryFilter);
//       await waitFor(() => {
//         const recipeCard = screen.getByTestId(recipeCode);
//         expect(recipeCard).toBeInTheDocument();
//       });
//     });

//     test('se o filtro de limpar funciona', async () => {
//       render(
//         <MemoryRouter>
//           <Meals />
//         </MemoryRouter>,
//       );
//       const allFilter = await screen.findByTestId('All-category-filter');
//       userEvent.click(allFilter);
//       await waitFor(() => {
//         const recipeCard = screen.getByTestId(recipeCode);
//         expect(recipeCard).toBeInTheDocument();
//       });
//     });

//     test('se a lista de refeições é exibida corretamente', async () => {
//       render(
//         <MemoryRouter>
//           <Meals />
//         </MemoryRouter>,
//       );
//       const mealList = await screen.findAllByTestId(/^[0-9]-recipe-card$/);
//       expect(mealList.length).toBeGreaterThan(0);
//     });

//     test('se os filtros de categoria funcionam corretamente ao serem clicados', async () => {
//       render(
//         <MemoryRouter>
//           <Meals />
//         </MemoryRouter>,
//       );
//       const categoryFilter = await screen.findByText('Beef');
//       userEvent.click(categoryFilter);
//       const filteredMealList = await screen.findAllByTestId(/^[0-9]-recipe-card$/);
//       expect(filteredMealList.length).toBeGreaterThan(0);
//     });
//   });

//   describe('Drinks', () => {
//     const recipeCode = '0-recipe-card';

//     test('se os botões de categoria aparecem', async () => {
//       render(
//         <MemoryRouter>
//           <Drinks />
//         </MemoryRouter>,
//       );
//       const categoryFilter = await screen.findByText('Ordinary Drink');
//       expect(categoryFilter).toBeInTheDocument();
//     });

//     test('se os filtros de categoria estão na tela', async () => {
//       render(
//         <MemoryRouter>
//           <Drinks />
//         </MemoryRouter>,
//       );
//       const categoryFilter = await screen.findByText('Cocktail');
//       expect(categoryFilter).toBeInTheDocument();
//     });

//     test('se seleciona um filtro corretamente', async () => {
//       render(
//         <MemoryRouter>
//           <Drinks />
//         </MemoryRouter>,
//       );
//       const categoryFilter = await screen.findByText('Ordinary Drink');
//       userEvent.click(categoryFilter);
//       await waitFor(() => {
//         const recipeCard = screen.getByTestId(recipeCode);
//         expect(recipeCard).toBeInTheDocument();
//       });
//     });

//     test('se o filtro de limpar funciona', async () => {
//       render(
//         <MemoryRouter>
//           <Drinks />
//         </MemoryRouter>,
//       );
//       const allFilter = await screen.findByTestId('All-category-filter');
//       userEvent.click(allFilter);
//       await waitFor(() => {
//         const recipeCard = screen.getByTestId(recipeCode);
//         expect(recipeCard).toBeInTheDocument();
//       });
//     });
//   });
// });
