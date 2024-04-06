import { DrinkType, MealType } from '../types/types';

export const fetchMealNameSearch = async (nome: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  console.log(data.meals);
  return data.meals as MealType[];
};

export const fetchMealIngredientSearch = async (ingredient: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.meals as MealType[];
};

export const fetchMealFirstLetterSearch = async (firstLetter: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data.meals as MealType[];
};

export const fetchDrinkNameSearch = async (nome: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  return data.drinks as DrinkType[];
};

export const fetchDrinkIngredientSearch = async (ingredient: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.drinks as DrinkType[];
};

export const fetchDrinkFirstLetterSearch = async (firstLetter: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data.drinks as DrinkType[];
};

export const fetchMeals = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Aqui você pode manipular os dados recebidos da API de bebidas
    console.log(data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const fetchDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Aqui você pode manipular os dados recebidos da API de bebidas
    console.log(data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
