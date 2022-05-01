import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';

function CategoriesFilter() {
  const {
    categories, loading, handleSearchByCategory, initialRender } = useContext(Context);
  const location = useLocation();

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => { initialRender(location.pathname); } }
      >
        All

      </button>
      {loading
        ? <p>Loading...</p>
        : categories.map((mealCategory) => (
          <button
            type="button"
            data-testid={ `${mealCategory.strCategory}-category-filter` }
            key={ mealCategory.strCategory }
            onClick={ handleSearchByCategory }
          >
            {mealCategory.strCategory}
          </button>))}
    </div>
  );
}

export default CategoriesFilter;
