import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchMealFirstLetterSearch,
  fetchMealIngredientSearch,
  fetchMealNameSearch,
  fetchDrinkNameSearch,
  fetchDrinkIngredientSearch,
  fetchDrinkFirstLetterSearch,
} from '../services/api';
import { DrinkType, MealType } from '../types/types';

function useFetch(searchType: string, searchText: string, foodType: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const alertFunction = () => {
    if (searchText.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
  };

  const notFoundRecipies = (param: MealType[] | DrinkType[] | null) => {
    if (param === null) {
      window.alert("Sorry, we haven't found any recipes for these filters");
    }
  };

  const drinkOrMeal = async (
    mealParam: (value: string) => Promise<MealType[]>,
    drinkParam: (value: string) => Promise<DrinkType[]>,
  ) => {
    if (foodType === 'meal') {
      const response = await mealParam(searchText);
      notFoundRecipies(response);
      if (response && response.length === 1) {
        navigate(`/${foodType}s/${response[0].idMeal}`);
      }
      setData(response);
      return;
    }
    const response = await drinkParam(searchText);
    notFoundRecipies(response);
    if (response && response.length === 1) {
      navigate(`/${foodType}s/${response[0].idDrink}`);
      setData(response);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        switch (searchType) {
          case 'name':
            drinkOrMeal(fetchMealNameSearch, fetchDrinkNameSearch);
            break;
          case 'ingredient':
            drinkOrMeal(fetchMealIngredientSearch, fetchDrinkIngredientSearch);
            break;
          case 'firstletter':
            alertFunction();
            drinkOrMeal(fetchMealFirstLetterSearch, fetchDrinkFirstLetterSearch);
            break;
          default:
            throw new Error('Invalid search type');
        }
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
