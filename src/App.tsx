import { Routes, Route } from 'react-router-dom';
import ProfilePage from './Pages/Profile';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import LocalStoreProvider from './Provider/LocalStoreProvider';
import Login from './Pages/Login';
import RecipeInProgress from './Pages/RecipeInProgress';
import MealsPage from './Pages/MealsPage';
import DrinksPage from './Pages/DrinksPage';
import RecipeDetails from './Pages/RecipeDetails';
import DoneRecipes from './Pages/DoneRecipes';

function App() {
  return (

    <LocalStoreProvider>

      <Routes>

        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <MealsPage /> } />
        <Route path="/drinks" element={ <DrinksPage /> } />
        <Route path="/meals/:id" element={ <RecipeDetails type="meals" /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails type="drinks" /> } />
        <Route
          path="/meals/:id/in-progress"
          element={ <RecipeInProgress type="meals" /> }
        />

        <Route
          path="/drinks/:id/in-progress"
          element={ <RecipeInProgress type="drinks" /> }
        />

        <Route path="/profile" element={ <ProfilePage /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Routes>
    </LocalStoreProvider>

  );
}

export default App;
