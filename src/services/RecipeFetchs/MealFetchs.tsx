export const fetchMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals;
};

export const fetchMealCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.meals.slice(0, 5);
};

export const fetchMealsByCategory = async (category: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
};

export const fetchMealsByFilters = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
  const data = await response.json();
  return data.meals;
};
