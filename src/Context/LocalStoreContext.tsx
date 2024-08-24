import { createContext } from 'react';
import { FavoriteStoreDataType, RecipeInProgressStore } from '../types/type';

type LocalStoreType = {
  favoriteRecipesStore: FavoriteStoreDataType[];
  setfavoriteRecipesStore: (store: FavoriteStoreDataType[]) => void;
  doneRecipesStore: FavoriteStoreDataType[];
  setDoneRecipesStore: (store: FavoriteStoreDataType[]) => void;
  recipeInProgressStore: RecipeInProgressStore;
  setRecipeInProgressStore: (store: RecipeInProgressStore) => void;
};

const LocalStoreContext = createContext({} as LocalStoreType);

export default LocalStoreContext;
