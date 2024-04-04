import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import RecipeContext from './RecipeContext';
import { SearchType } from '../types/types';

type RecipeProviderProps = {
  children: React.ReactNode;
};

function RecipeProvider({ children }: RecipeProviderProps) {
  const [filterData, setFilterData] = useState<any>({});
  const [foodType, setFoodType] = useState('meal');

  const searchedInput = (input: SearchType) => {
    setFilterData(input);
  };

  const foodTypeSearched = (input: string) => {
    setFoodType(input);
  };

  // fetchNameSearch prescisa ser uma variavel que pega o radio do search e transforma no fetch adequado
  const { data, loading, error } = useFetch(
    filterData.searchtype,
    filterData.searchedtext,
    foodType,
    // filterData.foodType, mas como eu vou receber isso no search? um handleClick no icone pode usar um state aqui no provider??
  );

  const value = {
    data,
    loading,
    error,
    searchedInput,
    foodTypeSearched,
  };
  return (
    <RecipeContext.Provider
      value={ value }
    >
      { children }
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;