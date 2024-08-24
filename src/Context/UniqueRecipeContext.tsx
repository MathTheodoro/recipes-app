import { createContext } from 'react';
import { DataType } from '../types/type';

type UniqueRecipeContextType = {
  onSetRecipeDetail: (recipe: DataType) => void;
  recipeDetail: DataType,
};

const UniqueRecipeContext = createContext({} as UniqueRecipeContextType);

export default UniqueRecipeContext;
