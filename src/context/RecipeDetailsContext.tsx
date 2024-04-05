/* import React, { createContext, useContext, useEffect, useState } from 'react';

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string;
  created: string;
  edited: string;
  url: string;
};

type PlanetContextType = { planets: Planet[] };

export const PlanetContext = createContext<PlanetContextType>({
  planets: [],
});

export const useRecipeDetailsContext = () => {
  const context = useContext(PlanetContext);
  if (!context) {
    throw new Error('useRecipeDetailsContext must be used within a RecipeDetailsContext');
  }
  return context;
};

function RecipeDetailsContext({ children }: { children: React.ReactNode }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const url = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}');
        const data = await url.json();
        setPlanets(data.results);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <PlanetContext.Provider value={ { planets } }>
      {children}
    </PlanetContext.Provider>
  );
}

export default RecipeDetailsContext;
 */
