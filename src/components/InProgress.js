import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckboxIngredients from './CheckboxIngredients';
import './InProgress.css';
import Context from '../context/Context';

function InProgress(props) {
  const { recipeDetails } = props;
  const { ingredientsArray, getItems } = useContext(Context);
  useEffect(() => {
    getItems(recipeDetails);
  }, [recipeDetails]);

  return (
    <div className="in-progress">
      <div className="midle">
        {
          ingredientsArray.map((ingredient, index) => (
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
