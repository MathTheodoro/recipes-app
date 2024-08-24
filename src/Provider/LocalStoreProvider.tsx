import LocalStoreContext from '../Context/LocalStoreContext';
import useLocalStorage from '../Hooks/useLocalStorage';
import { FavoriteStoreDataType, RecipeInProgressStore } from '../types/type';

type DrinksProviderType = {
  children: React.ReactNode;
};

type UseLocationType = {
  store: FavoriteStoreDataType[];
  setStorage: (value: FavoriteStoreDataType[]) => void;
};

export default function LocalStoreProvider({ children }: DrinksProviderType) {
  const {
    store: favoriteRecipesStore, setStorage: setfavoriteRecipesStore,
  } = useLocalStorage<FavoriteStoreDataType[]>('favoriteRecipes', []) as UseLocationType;

  const {
    store: doneRecipesStore, setStorage: setDoneRecipesStore,
  } = useLocalStorage<FavoriteStoreDataType[]>('doneRecipes', []);

  const {
    store: recipeInProgressStore,
    setStorage: setRecipeInProgressStore,
  } = useLocalStorage<RecipeInProgressStore>(
    'inProgressRecipes',
    { drinks: {}, meals: {} },
  );

  return (
    <LocalStoreContext.Provider
      value={ {
        favoriteRecipesStore,
        setfavoriteRecipesStore,
        doneRecipesStore,
        setDoneRecipesStore,
        recipeInProgressStore,
        setRecipeInProgressStore,
      } }
    >
      {children}
    </LocalStoreContext.Provider>
  );
}
