import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [showSearch, setshowSearch] = useState(false);
  const history = useHistory();
  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          alt="profile icon"
        />
        Perfil
      </button>
      <h1 data-testid="page-title">Recipes App</h1>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setshowSearch(!showSearch) }
      >
        <img
          src={ searchIcon }
          alt="search icon"
        />
        Buscar
      </button>
    </header>
  );
}

export default Header;
