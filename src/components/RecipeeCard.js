import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

function RecipeeCard(props) {
  const location = useLocation();

  const { index } = props;

  if (location.pathname === '/foods') {
    const { meal: { strMeal, strMealThumb, idMeal } } = props;
    return (
      <Link to={ `/foods/${idMeal}` } className="recipe-card">
        <li
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ strMealThumb }
            alt="meal"
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            {strMeal}
          </p>
        </li>
      </Link>

    );
  } if (location.pathname === '/drinks') {
    const { meal: { strDrink, strDrinkThumb, idDrink } } = props;
    return (
      <Link to={ `/drinks/${idDrink}` } className="recipe-card">
        <li
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ strDrinkThumb }
            alt="drink"
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            {strDrink}
          </p>
        </li>
      </Link>
    );
  }
}

RecipeeCard.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RecipeeCard;
