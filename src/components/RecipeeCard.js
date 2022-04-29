import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function RecipeeCard(props) {
  const location = useLocation();
  const { index } = props;
  if (location.pathname === '/foods') {
    const { meal: { strMeal, strMealThumb } } = props;
    return (
      <li
        className="recipee-card"
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
    );
  } if (location.pathname === '/drinks') {
    const { meal: { strDrink, strDrinkThumb } } = props;
    return (
      <li
        className="recipee-card"
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
    );
  }
}

RecipeeCard.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RecipeeCard;
