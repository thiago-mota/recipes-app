import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InProgress.css';

function CheckboxIngredients(props) {
  const [checkboxState, setCheckboxState] = useState(false);
  const [className, setClassName] = useState('noChecked');

  const handleChecked = () => {
    if (checkboxState === false) {
      setCheckboxState(true);
      setClassName('check');
    }
    if (checkboxState === true) {
      setCheckboxState(false);
      setClassName('noChecked');
    }
  };

  const { ingredient, index } = props;

  return (
    <div
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        id={ index }
        type="checkbox"
        checked={ checkboxState }
        onChange={ handleChecked }
        name={ ingredient }
      />
      <label
        htmlFor={ index }
        key={ index }
        className={ className }
      >
        { ingredient }
      </label>
    </div>
  );
}

CheckboxIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
};

export default CheckboxIngredients;
