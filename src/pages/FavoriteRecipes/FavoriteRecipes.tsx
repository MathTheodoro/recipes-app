import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';

export default function FavoriteRecipes() {
  const location = useLocation();
  return (
    <>
      <Header currentPath={ location.pathname } />
      <div>
        FavoriteRecipes
      </div>
    </>
  );
}
