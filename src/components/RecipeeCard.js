import React from 'react';
import PropTypes from 'prop-types';

function RecipeeCard(props) {
  const { strMeal, strMealThumb } = props.meal;
  const { index } = props;
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
}
export default RecipeeCard;
