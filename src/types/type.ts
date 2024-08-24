export type KeysOfRecipeDetailsDataType = {
  meals: MealsDataType[]
  drinks: DrinskDataType[]
};

export type MealsDataType = {
  [key: string]: string;
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
};

export type DrinskDataType = {
  [key: string]: string;
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string;
  strTags: string;
  strVideo: string;
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string;
  strInstructionsDE: string;
  strInstructionsFR: string;
  strInstructionsIT: string;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strImageSource: string;
  strImageAttribution: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
};

export type RecipeCardDataType = {
  id: string;
  title: string;
  img: string;
  categories: string;
  instructions: string;
  ingredients: string[];
  measure: string[];
  alcoholic?: string;
  nationality: string;
  doneDate: string;
  tags: string;
};

export type IngredientKeyDataType = {
  [key: string]: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
};

export type KeysOfCategoriesDataType = {
  meals: { strCategory: string }[];
  drinks: { strCategory: string }[];
};

export type DrinksContextType = {
  apiDrinksData: RecipeCardDataType[] | null;
  apiDrinksError: unknown;
  apiDrinksLoading: boolean;
  handleSearchBarFetch: (radio: string, input: string) => void,
  fetchByCategory: (category: string) => void;
  categories: KeysOfCategoriesDataType | undefined;
  loadingCategories: boolean;
  dataId: RecipeCardDataType[] | null;
  fetchDataId: (id: string) => void;
};

export type MealsContextType = {
  apiMealsData: RecipeCardDataType[] | null;
  apiMealsError: unknown;
  apiMealsLoading: boolean;
  handleSearchBarFetch: (radio: string, input: string) => void,
  fetchByCategory: (category: string) => void;
  fetchDataId: (id: string) => void;
  dataId: RecipeCardDataType[] | null;
  categories: KeysOfCategoriesDataType | undefined;
  loadingCategories: boolean;
};

export type FavoriteStoreDataType = {

  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate?: string;
  tags?: string[];
  detailLink?: string;
  date?: string;
};

export type RecipeDetailDataType = {
  id: string;
  title: string;
  img: string;
  category: string;
  area: string;
  ingredients: string[];
  measures: string[];
  instruction: string;
  video?: string;
};

export type Recommendation = {
  id: string;
  title: string;
  img: string;
};

export type FecthApiDataType =
   { meals: MealsDataType[] } | { drinks: DrinskDataType[] } | [];

export type RecipeInProgressStore = {
  drinks: { [key: string]: number[] };
  meals: { [key: string]: number[] };
};
