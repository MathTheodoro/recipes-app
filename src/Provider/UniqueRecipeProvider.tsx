import { useState } from 'react';
import { FecthApiDataType } from '../types/type';
import UniqueRecipeContext from '../Context/UniqueRecipeContext';

type DetailsRecipeProviderType = {
  children: React.ReactNode;
};

export default function DetailsRecipeProvider({ children }: DetailsRecipeProviderType) {
  const [recipeDetail, setRecipeDetail] = useState<FecthApiDataType>([]);

  const onSetRecipeDetail = (recipe: FecthApiDataType) => {
    setRecipeDetail(recipe);
  };

  return (
    <UniqueRecipeContext.Provider
      value={ {
        onSetRecipeDetail,
        recipeDetail,
      } }
    >
      {children}
    </UniqueRecipeContext.Provider>
  );
}
