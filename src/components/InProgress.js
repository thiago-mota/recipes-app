import React from 'react';
import PropTypes from 'prop-types';
import CheckboxIngredients from './CheckboxIngredients';
import './InProgress.css';

function InProgress(props) {
  const { recipeDetails } = props;

  const keysIngredients = Object.keys(recipeDetails)
    .filter((keyObject) => keyObject.includes('strIngredient'));
  const arrayAllItems = keysIngredients
    .map((keyObject) => recipeDetails[keyObject]);
  const arrayOfKeysIngredients = arrayAllItems
    .filter((keyFiltered) => keyFiltered !== null && keyFiltered !== '');
    // .map((keyObject) => recipeDetails[keyObject]);
  // console.log(arrayOfKeysIngredients);

  return (
    <div className="in-progress">
      <div className="midle">
        {
          arrayOfKeysIngredients.map((ingredient, index) => (
            <CheckboxIngredients
              ingredient={ ingredient }
              index={ index }
              key={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

InProgress.propTypes = {
  recipeDetails: PropTypes.node.isRequired,
};

export default InProgress;
