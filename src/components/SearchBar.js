import React from 'react';
// import { apiIngredient } from '../services/apiServices';

function SearchBar() {
  return (
    <div>
      {/* {
        apiIngredient('tomato');
        apiName('potato');
        apiFirstLetter('a');
      } */}
      <label htmlFor="search-input">
        <input
          type="text"
          id="search-input"
          data-testid="search-input"
          name="search-input"
          placeholder="Search Recipe"
          // value={ searchInput }
          // onChange={ ({ target }) => setSearch(target.value) }
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          name="search-radio"
          value="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
          name="search-radio"
          value="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          name="search-radio"
          value="first-letter-search-radio"
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
