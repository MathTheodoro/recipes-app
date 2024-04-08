import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import InProgress from './pages/InProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <InProgress /> } />
        <Route path="/drinks/:id/in-progress" element={ <InProgress /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/*" element={ <h1>Not Found</h1> } />
        <Route path="/login/:id" element={ <Login /> } />
      </Routes>
    </div>
  );
}

export default App;
