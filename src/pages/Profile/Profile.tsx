import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleDoneRecipesClick = () => {
    navigate('/done-recipes'); // Redireciona pra tela de receitas feitas
  };

  const handleFavoriteRecipesClick = () => {
    navigate('/favorite-recipes');// Redireciona pra tela de receitas favoritas
  };

  const handleLogoutClick = () => {
    console.log('Logout button clicked');
    localStorage.clear();
    console.log('localStorage cleared:', localStorage);
    navigate('/');// Limpeza do localStorage e redireciona pra tela de login
  };

  return (
    <>
      <div>
        <Header currentPath={ location.pathname } />
        {/* Email do usuário */}
        <p data-testid="profile-email">{localStorage.getItem('user')}</p>

        {/* Botões */}
        <button data-testid="profile-done-btn" onClick={ handleDoneRecipesClick }>
          Done Recipes
        </button>
        <button data-testid="profile-favorite-btn" onClick={ handleFavoriteRecipesClick }>
          Favorite Recipes
        </button>
        <button data-testid="profile-logout-btn" onClick={ handleLogoutClick }>
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}
export default Profile;
