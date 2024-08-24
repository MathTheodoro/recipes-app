import { DrinskDataType, MealsDataType } from '../types/type';

export const favoriteStore = (
  data: MealsDataType | DrinskDataType,
  isMeal = false,
  url = '',
) => {
  const date = new Date().toDateString();

  return {
    id: isMeal ? data.idMeal : data.idDrink,
    type: isMeal ? 'meal' : 'drink',
    nationality: isMeal ? data.strArea : '',
    category: data.strCategory ? data.strCategory : '',
    alcoholicOrNot: isMeal ? '' : data.strAlcoholic || '',
    name: isMeal ? data.strMeal : data.strDrink,
    image: isMeal ? data.strMealThumb : data.strDrinkThumb,
  };
};
