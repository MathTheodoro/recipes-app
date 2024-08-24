import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DrinskDataType,
  KeysOfCategoriesDataType,
  RecipeCardDataType,
} from '../types/type';
import RecipesContext from '../Context/DrinksContext';
import useFetch from '../Hooks/useFetch';

type DrinksProviderType = {
  children: React.ReactNode;
};

type EffectCategoryType = {
  data: KeysOfCategoriesDataType | undefined;
  loading: boolean;
};

export default function DrinksProvider({ children }: DrinksProviderType) {
  const [apiDrinksLoading, setApiDrinksLoading] = useState(true);
  const [apiDrinksError, setApiDrinksError] = useState<unknown>();
  const [apiDrinksData, setApiDrinksData] = useState<RecipeCardDataType[]>([]);
  const [dataId, setDataId] = useState<RecipeCardDataType[]>([]);

  const location = useLocation();

  const categoryRef = useRef<string>('');
  const navigate = useNavigate();

  const { data: categories, loading: loadingCategories } = useFetch(
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  ) as EffectCategoryType;

  useEffect(() => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchData(url);
  }, []);

  const extractIngredients = (data: DrinskDataType): string[] => {
    const ingredientKeys = Object
      .keys(data).filter((key) => key.startsWith('strIngredient'));

    const ingredients = ingredientKeys.map((key) => data[key]);

    return ingredients.filter(Boolean);
  };

  const extractQtd = (data: DrinskDataType): string[] => {
    const qtdKeys = Object
      .keys(data).filter((key) => key.startsWith('strMeasure'));

    const measures = qtdKeys.map((key) => data[key]);

    return measures
      .filter((measure) => typeof measure === 'string' && measure.trim() !== '');
  };

  const filterDataKeys = (data: DrinskDataType[]) => {
    return data.map((value) => {
      return {
        id: value.idDrink,
        title: value.strDrink,
        img: value.strDrinkThumb,
        categories: value.strCategory,
        instructions: value.strInstructions,
        alcoholic: value.strAlcoholic,
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
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setDataId(filterDataKeys(data.drinks));
    } catch (err) {
      if (err instanceof Error) {
        setApiDrinksError(err);
      }
    }
  };

  const fetchData = async (url = '', redirect = false) => {
    setApiDrinksLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.drinks === null) {
        return window.alert('Sorry, we haven\'t found any recipes for these filters');
      }

      setApiDrinksData(filterDataKeys(data.drinks));

      if (data.drinks.length === 1 && redirect) {
        navigate(`${location.pathname}/${data.drinks[0].idDrink}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setApiDrinksError(err);
      }
    } finally {
      setApiDrinksLoading(false);
    }
  };

  const handleSearchBarFetch = async (radio = '', input = '') => {
    switch (radio) {
      case 'ingredient':
        fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`, true);
        break;
      case 'name':
        fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`, true);
        break;
      case 'firstLetter':
        fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`, true);
        break;
      default:
        break;
    }
  };

  const fetchByCategory = (category: string) => {
    if (category === 'all' || categoryRef.current === category) {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      categoryRef.current = category;
      return fetchData(url);
    }
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchData(url, false);
    categoryRef.current = category;
  };

  return (
    <RecipesContext.Provider
      value={ {
        apiDrinksData,
        apiDrinksError,
        apiDrinksLoading,
        handleSearchBarFetch,
        fetchByCategory,
        categories,
        loadingCategories,
        dataId,
        fetchDataId,
      } }
    >
      {children}
    </RecipesContext.Provider>
  );
}
