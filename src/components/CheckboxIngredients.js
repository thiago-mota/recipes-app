import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './InProgress.css';
import Context from '../context/Context';

function CheckboxIngredients(props) {
  const {
    checkValue,
    allChecked,
    addCheckedIngredient,
    removeCheckedIngredient,
  } = useContext(Context);
  const { ingredient, index } = props;
  const [checkboxState, setCheckboxState] = useState(checkValue(ingredient));
  const [className, setClassName] = useState('noChecked');

  const handleChecked = () => {
    if (checkboxState === false) {
      setCheckboxState(true);
      setClassName('check');
      addCheckedIngredient(ingredient);
    }
    if (checkboxState === true) {
      setCheckboxState(false);
      setClassName('noChecked');
      removeCheckedIngredient(ingredient);
    }
    allChecked();
  };

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
