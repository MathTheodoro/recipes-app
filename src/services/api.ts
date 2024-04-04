export const fetchMealNameSearch = async (nome: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
    const data = await response.json();
    return data.meals;
  };
  
  export const fetchMealIngredientSearch = async (ingredient: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
  };
  
  export const fetchMealFirstLetterSearch = async (firstLetter: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const data = await response.json();
    return data.meals;
  };
  
  export const fetchDrinkNameSearch = async (nome: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
    const data = await response.json();
    return data.drinks;
  };
  
  export const fetchDrinkIngredientSearch = async (ingredient: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.drinks;
  };
  
  export const fetchDrinkFirstLetterSearch = async (firstLetter: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const data = await response.json();
    return data.drinks;
  };