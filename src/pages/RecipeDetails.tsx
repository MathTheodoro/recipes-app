import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchRecipe = async () => {
      let url = '';
      if (location.pathname.includes('/meals')) {
        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else if (location.pathname.includes('/drinks')) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
      }
    };
    fetchRecipe();
  }, [id, location.pathname]);

  if (!recipe) return <div>Carregando...</div>;

  return (
    <div>
      <div>RecipeDetails</div>
    </div>
  );
}

export default RecipeDetails;
