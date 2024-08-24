import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import '../Css/InProgress.css';
import { writeClipboardText } from '../utils/writeClipboardText';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MealsContext from '../Context/MealsContext';
import DrinksContext from '../Context/DrinksContext';
import LocalStoreContext from '../Context/LocalStoreContext';
import { FavoriteStoreDataType } from '../types/type';

function RecipeInProgress({ type }: { type: 'meals' | 'drinks' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchDataId: fetchMeals, dataId: idMeals } = useContext(MealsContext);
  const { fetchDataId: fetchDrinks, dataId: idDrinks } = useContext(DrinksContext);
  const {
    recipeInProgressStore,
    setRecipeInProgressStore,
  } = useContext(LocalStoreContext);
  const { favoriteRecipesStore,
    setfavoriteRecipesStore,
  } = useContext(LocalStoreContext);
  const { doneRecipesStore, setDoneRecipesStore } = useContext(LocalStoreContext);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const dataId = type === 'meals' ? idMeals : idDrinks;
  const [checkboxList, setCheckBoxList] = useState<number[]>([]);

  useEffect(() => {
    // Chame as funções de busca dependendo do tipo
    if (id !== undefined) {
      if (type === 'meals') {
        fetchMeals(id);
      }
      if (type === 'drinks') {
        fetchDrinks(id);
      }
    }

    const isRecipeFavorite = favoriteRecipesStore.some((recipe: any) => recipe.id === id);
    setIsFavorite(isRecipeFavorite);
  }, [id]);

  useEffect(() => {
    if (
      id && 'meals' in recipeInProgressStore
       && id in recipeInProgressStore.meals) {
      setCheckBoxList(recipeInProgressStore[type][id]);
    }

    if (
      id && 'drinks' in recipeInProgressStore
       && id in recipeInProgressStore.drinks) {
      setCheckBoxList(recipeInProgressStore[type][id]);
    }
  }, []);

  // checkbox
  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    if (!checkboxList.includes(index)) { setCheckBoxList([...checkboxList, index]); }
    if (checkboxList.includes(index)) {
      setCheckBoxList(checkboxList.filter((list) => list !== index));
    }
    const newCheckedItems = checkedItems ? [...checkedItems] : [];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    // Verifique se o tipo da página é válido
    if (id !== undefined && (type === 'drinks' || type === 'meals')) {
      // Obtenha o objeto de armazenamento correspondente ao tipo da página
      const currentStore = recipeInProgressStore[type];
      const currentIndexArray = currentStore[id] || [];

      if (isChecked) {
        // Se o checkbox foi marcado, adicione o índice ao array
        currentIndexArray.push(index);
      } else {
        // Se o checkbox foi desmarcado, remova o índice do array
        const indexPosition = currentIndexArray.indexOf(index);
        if (indexPosition !== -1) {
          currentIndexArray.splice(indexPosition, 1);
        }
      }

      // Remova duplicatas do array
      const combinedIndices = Array.from(new Set(currentIndexArray));

      // Salve os índices atualizados para o tipo da página
      setRecipeInProgressStore({
        ...recipeInProgressStore,
        [type]: {
          ...recipeInProgressStore[type],
          [id]: combinedIndices,
        },
      });
    }
  };
  // funcao ao apertar botao finalizar leva para outra rota
  const handleFinishRecipe = () => {
    doneRecipeStore();
    navigate('/done-recipes');
  };
  // Função responsável por compartilhar a URL da receita
  const handleShareRecipe = () => {
    const previousPageUrl = `http://localhost:3000/${type}/${id}`;
    writeClipboardText(previousPageUrl);
  };

  // Função responsável por adicionar ou remover a receita dos favoritos
  const handleToggleFavorite = () => {
    if (dataId && dataId[0]) {
      const newFavoriteRecipe: FavoriteStoreDataType = {
        id: id || '',
        type: type === 'meals' ? 'meal' : 'drink',
        nationality: dataId[0].nationality || '',
        category: dataId[0].categories || '',
        alcoholicOrNot: dataId[0].alcoholic || '',
        name: dataId[0].title,
        image: dataId[0].img,
      };
      const updatedFavoriteRecipes = isFavorite
        ? favoriteRecipesStore.filter((recipe: FavoriteStoreDataType) => recipe.id !== id)
        : [...favoriteRecipesStore, newFavoriteRecipe];
      setfavoriteRecipesStore(updatedFavoriteRecipes);

      // Atualiza os favoritos no localStorage
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));

      // Inverte o estado de isFavorite
      setIsFavorite(!isFavorite);
    }
  };

  // Cria objeto para inserir quando finalizar
  const doneRecipeStore = () => {
    if (dataId && dataId[0]) {
      const date = new Date().toISOString();
      // Converta a string de tags em um array de strings
      const tagsArray = dataId[0].tags ? dataId[0].tags.split(',') : [];
      const newDoneRecipe: FavoriteStoreDataType = {
        id: id || '',
        type: type === 'meals' ? 'meal' : 'drink',
        nationality: dataId[0].nationality || '',
        category: dataId[0].categories || '',
        alcoholicOrNot: dataId[0].alcoholic || '',
        name: dataId[0].title,
        image: dataId[0].img,
        doneDate: date,
        tags: tagsArray,
      };
      const updatedDoneRecipes = [...doneRecipesStore, newDoneRecipe];
      setDoneRecipesStore(updatedDoneRecipes);
    }
  };

  return (
    <div>
      {dataId && dataId.length > 0 ? (
        <>
          <h1 data-testid="recipe-title">{ dataId[0].title }</h1>
          <img src={ dataId[0].img } alt="" data-testid="recipe-photo" />
          <div>
            <button type="button" data-testid="share-btn" onClick={ handleShareRecipe }>
              <img src={ shareIcon } alt="Share" />
            </button>
            <button type="button" onClick={ handleToggleFavorite }>
              <img
                data-testid="favorite-btn"
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                alt={ isFavorite ? 'favorite' : 'notFavorite' }
                style={ { width: '26px', height: '26px' } }
              />
            </button>
          </div>

          <div className="category">
            {type === 'meals' && (
              <p data-testid="recipe-category">{`Category: ${dataId[0].categories}`}</p>
            )}
            {type === 'drinks' && (
              <p data-testid="recipe-category">{`Alcoholic ? ${dataId[0].alcoholic}`}</p>
            )}
          </div>
          <div className="instructions">
            <p
              data-testid="instructions"
            >
              {`Instructions: ${dataId[0].instructions}`}
            </p>
          </div>
          <div className="container-list">
            <ul>
              {dataId[0].ingredients.map((item, index) => (
                <li key={ index }>
                  <label
                    data-testid={ `${index}-ingredient-step` }
                    className={ checkboxList.includes(Number(index)) ? 'checked' : '' }
                  >
                    { `Ingrediente: ${item} - Quantidade: ${dataId[0].measure[index]}` }
                    <input
                      className="check"
                      type="checkbox"
                      value={ index }
                      onChange={ (event) => handleCheckboxChange(
                        +event.target.value,
                        event.target.checked,
                      ) }
                      checked={ checkboxList.includes(Number(index)) }
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>

        </>
      ) : null}
      {dataId && dataId[0] && (
        <div>
          <button
            className="btn-finish"
            data-testid="finish-recipe-btn"
            onClick={ handleFinishRecipe }
            disabled={ checkboxList.length !== dataId[0].ingredients.length }
          >
            Finalizar Receita
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
