import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import './Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [showSearch, setshowSearch] = useState(false);
  const history = useHistory();
  return (
    <header className="headerIcons">
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile icon"
        />
      </button>
      <h1 data-testid="page-title">{title}</h1>
      {title === 'Foods' || title === 'Drinks' || title === 'Explore Nationalities' ? (
        <button
          type="button"
          onClick={ () => setshowSearch(!showSearch) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>
      ) : ''}
      { showSearch ? <SearchBar /> : ''}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
