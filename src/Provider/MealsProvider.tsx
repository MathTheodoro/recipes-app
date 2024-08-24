import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeysOfCategoriesDataType,
  MealsDataType, RecipeCardDataType } from '../types/type';
import MealsContext from '../Context/MealsContext';
import useFetch from '../Hooks/useFetch';

type MealsProviderType = {
  children: React.ReactNode;
};

type EffectCategoryType = {
  data: KeysOfCategoriesDataType
  | undefined;
  loading: boolean;
};

export default function MealsProvider({ children }: MealsProviderType) {
  const [apiMealsLoading, setApiMealsLoading] = useState(true);
  const [apiMealsError, setApiMealsError] = useState<unknown>();
  const [apiMealsData, setApiMealsData] = useState<RecipeCardDataType[]>([]);
  const [dataId, setDataId] = useState<RecipeCardDataType[]>([]);

  const location = useLocation();
  const categoryRef = useRef<string>('');
  const navigate = useNavigate();

  const { data: categories, loading: loadingCategories } = useFetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  ) as EffectCategoryType;

  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchData(url);
  }, []);

  const extractIngredients = (data: MealsDataType): string[] => {
    const ingredientKeys = Object
      .keys(data).filter((key) => key.startsWith('strIngredient'));

    const ingredients = ingredientKeys.map((key) => data[key]);

    return ingredients.filter(Boolean);
  };

  const extractQtd = (data: MealsDataType): string[] => {
    const qtdKeys = Object
      .keys(data).filter((key) => key.startsWith('strMeasure'));

    const measures = qtdKeys.map((key) => data[key]);

    return measures
      .filter((measure) => typeof measure === 'string' && measure.trim() !== '');
  };

  const filterDataKeys = (data: MealsDataType[]) => {
    return data.map((value) => {
      return {
        id: value.idMeal,
        title: value.strMeal,
        img: value.strMealThumb,
        categories: value.strCategory,
        instructions: value.strInstructions,
        ingredients: extractIngredients(value),
        measure: extractQtd(value),
        nationality: value.strArea,
        doneDate: value.dateModified,
        tags: value.strTags,
      };
    });
  };

  const fetchDataId = async (id: string) => {
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setDataId(filterDataKeys(data.meals));
    } catch (err) {
      if (err instanceof Error) {
        setApiMealsError(err);
      }
    }
  };

  const fetchData = async (url = '', redirect = false) => {
    setApiMealsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.meals === null) {
        return window.alert('Sorry, we haven\'t found any recipes for these filters');
      }
      setApiMealsData(filterDataKeys(data.meals));
      if (data.meals.length === 1 && redirect) {
        navigate(`${location.pathname}/${data.meals[0].idMeal}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setApiMealsError(err);
      }
    } finally {
      setApiMealsLoading(false);
    }
  };

  const handleSearchBarFetch = async (radio = '', input = '') => {
    switch (radio) {
      case 'ingredient':
        fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`, true);
        break;
      case 'name':
        fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`, true);
        break;
      case 'firstLetter':
        fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`, true);
        break;
      default:
        break;
    }
  };

  const fetchByCategory = (category: string) => {
    if (category === 'all' || categoryRef.current === category) {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      categoryRef.current = category;
      return fetchData(url);
    }
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchData(url, false);
    categoryRef.current = category;
  };

  return (
    <MealsContext.Provider
      value={ {
        apiMealsData,
        apiMealsError,
        apiMealsLoading,
        handleSearchBarFetch,
        fetchByCategory,
        categories,
        fetchDataId,
        dataId,
        loadingCategories } }
    >
      {children}
    </MealsContext.Provider>
  );
}
