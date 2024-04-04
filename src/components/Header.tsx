import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

interface HeaderProps {
  currentPath: string;
}

export default function Header({ currentPath }: HeaderProps) {
  let pageTitle;
  let showSearchIcon = false;

  switch (currentPath) {
    case '/meals':
      pageTitle = 'Meals';
      showSearchIcon = true;
      break;
    case '/drinks':
      pageTitle = 'Drinks';
      showSearchIcon = true;
      break;
    case '/profile':
      pageTitle = 'Profile';
      break;
    case '/done-recipes':
      pageTitle = 'Done Recipes';
      break;
    case '/favorite-recipes':
      pageTitle = 'Favorite Recipes';
      break;
    default:
      break;
  }

  const [searchBar, setSearchBar] = useState(false);
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <button type="button" id="search-top-btn" onClick={ () => navigate('/profile') }>
          <img data-testid="profile-top-btn" src={ profileIcon } alt="buscar" />
        </button>
        {showSearchIcon && (
          <button onClick={ () => setSearchBar(!searchBar) }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="buscar" />
          </button>
        )}
        <h1 data-testid="page-title">{pageTitle}</h1>
      </div>
      <div>
        {searchBar && (
          <SearchBar />
        )}
      </div>
    </header>

  );
}
