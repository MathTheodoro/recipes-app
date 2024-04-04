import { useEffect, useState } from 'react';
import {
  fetchMealFirstLetterSearch,
  fetchMealIngredientSearch,
  fetchMealNameSearch,
  fetchDrinkNameSearch,
  fetchDrinkIngredientSearch,
  fetchDrinkFirstLetterSearch,
} from '../services/api';

function useFetch(searchType: string, searchText: string, foodType: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const alertFunction = () => {
    if (searchText.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let response;
        switch (searchType) {
          case 'name':
            if (foodType === 'meal') {
              response = await fetchMealNameSearch(searchText);
            }
            response = await fetchDrinkNameSearch(searchText);
            break;
          case 'ingredient':
            if (foodType === 'meal') {
              response = await fetchMealIngredientSearch(searchText);
            }
            response = await fetchDrinkIngredientSearch(searchText);
            break;
          case 'firstletter':
            alertFunction();
            if (foodType === 'meal') {
              response = await fetchMealFirstLetterSearch(searchText);
            }
            response = await fetchDrinkFirstLetterSearch(searchText);
            break;
          default:
            throw new Error('Invalid search type');
        }
        setData(response);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
      }
    }
    fetchData();
    // lembrar de colocar o foodType aqui
  }, [searchType, searchText]);

  return {
    data,
    loading,
    error,
  };
}

export default useFetch;