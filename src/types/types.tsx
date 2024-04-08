export type TitleProps = {
  title: string
  showSearchButton?: boolean
};

export type SearchType = {
  searchedtext: string,
  searchtype: string,
};

export type DrinkType = {
  idDrink: string
  strAlcoholic: string
  strCategory: string
  strDrink: string
  strDrinkThumb: string
  strGlass: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3: string
  strInstructions: string
  strInstructionsES: string
  strInstructionsIT: string
};

export type MealType = {
  idMeal: string
  strArea: string
  strCategory: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3: string
  strIngredient4: string
  strIngredient5: string
  strIngredient6: string
  strIngredient7: string
  strIngredient8: string
  strInstructions: string
  strMeal: string
  strMealThumb: string
  strTags: string
  strYoutube: string
};

export type Recipe = {
  idMeal?: string;
  strMeal?: string;
  strMealThumb?: string;
  strCategory?: string;
  strInstructions?: string;
  strYoutube?: string;
  idDrink?: string;
  strDrink?: string;
  strDrinkThumb?: string;
  strAlcoholic?: string;
  [key: string]: string | undefined;
};

export type ChangeEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>;
export type SubmitEvent = React.FormEvent<HTMLFormElement>;
