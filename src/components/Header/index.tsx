import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../images/Group 4.png';
import LogoRecipe from '../../images/logo Recipes app.png';
import ProfileImage from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/index';
import './index.css';

interface RouteConfig {
  profile: boolean;
  search: boolean;
}

function Header() {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);

  const iconConfig: Record<string, RouteConfig> = {
    '/meals': { profile: true, search: true },
    '/drinks': { profile: true, search: true },
    '/profile': { profile: true, search: false },
    '/done-recipes': { profile: true, search: false },
    '/favorite-recipes': { profile: true, search: false },
  };

  const getTitle = () => {
    switch (location.pathname) {
      case '/meals':
        return 'Meals';
      case '/drinks':
        return 'Drinks';
      case '/profile':
        return 'Profile';
      case '/done-recipes':
        return 'Done Recipes';
      default:
        return 'Favorite Recipes';
    }
  };

  const getIconsToShow = () => {
    const routeConfig = iconConfig[location.pathname];
    if (routeConfig) {
      return routeConfig;
    }
    return { profile: false, search: false };
  };

  const { profile, search } = getIconsToShow();

  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className="header">
      <header className="header-box">
        <div className="imgs">
          <img
            src={ Logo }
            alt=""
            className=""
          />
          <img
            src={ LogoRecipe }
            alt=""
            className="me-5"
          />
        </div>
        <div className="icones">
          {search && (
            <div>
              <button
                onClick={ toggleSearchVisibility }
                className="bg-transparent border-0"
              >
                <img
                  data-testid="search-top-btn"
                  src={ SearchIcon }
                  alt="Search"
                />
              </button>
            </div>
          )}
          {profile && (
            <Link to="/profile">
              <img
                src={ ProfileImage }
                alt="Profile"
                data-testid="profile-top-btn"
              />
            </Link>
          )}
        </div>
      </header>
      {getTitle() && <h1 data-testid="page-title">{getTitle()}</h1>}
      {searchVisible && <SearchBar />}
    </div>
  );
}

export default Header;
