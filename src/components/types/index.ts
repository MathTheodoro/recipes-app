export type APIContextType = {
  foods: MealType | DrinkType [],
  searchOption: (param:InfoSearchBar) => void,
};

export type InfoSearchBar = {
  pesquisa: string,
  text: string,
  url: string,
};

export type DrinkType = {
  idDrink: string,
  strDrink: string,
  strDrinkThumb: string,
};

export type MealType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
};
