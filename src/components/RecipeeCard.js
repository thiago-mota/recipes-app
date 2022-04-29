import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function RecipeeCard(props) {
  const location = useLocation();
  const { index } = props;
  if (location.pathname === '/foods') {
    const { strMeal, strMealThumb } = props.meal;
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
    const { strDrink, strDrinkThumb } = props.meal;
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
export default RecipeeCard;
