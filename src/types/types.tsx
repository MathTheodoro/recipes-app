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
  strIngredient4: string
  strIngredient5: string
  strIngredient6: string
  strIngredient7: string
  strIngredient8: string
  strIngredient9: string
  strIngredient10: string
  strIngredient11: string
  strIngredient12: string
  strIngredient13: string
  strIngredient14: string
  strIngredient15: string
  strInstructions: string
  strInstructionsES: string
  strInstructionsIT: string
  strTags: string[]
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
  strIngredient9: string
  strIngredient10: string
  strIngredient11: string
  strIngredient12: string
  strIngredient13: string
  strIngredient14: string
  strIngredient15: string
  strIngredient16: string
  strIngredient17: string
  strIngredient18: string
  strIngredient19: string
  strIngredient20: string
  strInstructions: string
  strMeal: string
  strMealThumb: string
  strTags: string
  strYoutube: string
};

export type Recipe = DrinkType & MealType;

export type ChangeEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>;
export type SubmitEvent = React.FormEvent<HTMLFormElement>;

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export type CategoriesList = Category[];

