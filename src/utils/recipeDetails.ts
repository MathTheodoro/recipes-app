import { DrinskDataType, MealsDataType } from '../types/type';

export const reduceKeys = (
  value: MealsDataType | DrinskDataType,
  string: string,
) => {
  const array = Object.keys(value).filter((key) => key.includes(string));
  return array.reduce((prev: string[], cur) => {
    if (value[cur] === null) return prev;
    if (value[cur].length === 0) return prev;
    prev.push(value[cur]);
    return prev;
  }, []);
};

export const recipeDetails = (
  data: DrinskDataType[] | MealsDataType[],
  isMeals: boolean,
) => {
  return data.map((value) => {
    const ingredients = reduceKeys(value, 'strIngredient');
    const measures = reduceKeys(value, 'strMeasure');

    return {
      id: isMeals ? value.idMeal : value.idDrink,
      title: isMeals ? value.strMeal : value.strDrink,
      img: isMeals ? value.strMealThumb : value.strDrinkThumb,
      category: isMeals ? value.strCategory : value.strAlcoholic,
      area: isMeals ? value.strArea : '',
      ingredients,
      measures,
      instruction: value.strInstructions,
      video: value.strYoutube,
    };
  });
};

export const getDrinkSugestion = async (): Promise<DrinskDataType[]> => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  return drinks;
};

export const getMealSugestion = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  return meals;
};
