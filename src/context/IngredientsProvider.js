import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function IngredientsProvider({ children }) {
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const checkValue = (ingredient) => {
    const checkedIngredients = localStorage.getItem('checkedIngredients');
    if (checkedIngredients) {
      return checkedIngredients.split(',').includes(ingredient);
    }
    return false;
  };
  const [stateAllChecked, setStateAllChecked] = useState(false);
  const allChecked = () => {
    console.log('checking...');
    const checkedIngredients = localStorage.getItem('checkedIngredients');
    if (checkedIngredients) {
      const arrayCheckedIngredients = checkedIngredients.split(',');
      console.log('arrayCheckedIngredients...', arrayCheckedIngredients);
      console.log('ingredientsArray...', ingredientsArray);
      console.log('123', arrayCheckedIngredients
        .every((x) => ingredientsArray.includes(x)));
      setStateAllChecked(arrayCheckedIngredients
        .every((x) => ingredientsArray.includes(x)));
    } else {
      setStateAllChecked(false);
    }
  };
  const getItems = (recipeDetails) => {
    const keysIngredients = Object.keys(recipeDetails)
      .filter((keyObject) => keyObject.includes('strIngredient'));
    const arrayAllItems = keysIngredients
      .map((keyObject) => recipeDetails[keyObject]);
    const arrayOfKeysIngredients = arrayAllItems
      .filter((keyFiltered) => keyFiltered !== null && keyFiltered !== '');
    // .map((keyObject) => recipeDetails[keyObject]);
    // console.log(arrayOfKeysIngredients);
    setIngredientsArray(arrayOfKeysIngredients);
  };
  const addCheckedIngredient = (ingredient) => {
    const checkedIngredients = localStorage.getItem('checkedIngredients');
    if (checkedIngredients) {
      const arrayCheckedIngredients = checkedIngredients.split(',');
      if (!arrayCheckedIngredients.includes(ingredient)) {
        localStorage.setItem('checkedIngredients',
          [...arrayCheckedIngredients, ingredient]);
      }
    } else {
      localStorage.setItem('checkedIngredients', ingredient);
    }
  };
  const removeCheckedIngredient = (ingredient) => {
    const checkedIngredients = localStorage.getItem('checkedIngredients');
    if (checkedIngredients) {
      const arrayCheckedIngredients = checkedIngredients.split(',');
      if (arrayCheckedIngredients.includes(ingredient)) {
        localStorage.setItem('checkedIngredients',
          arrayCheckedIngredients.filter((x) => x !== ingredient));
      }
    }
  };

  const contextValue = {
    checkValue,
    addCheckedIngredient,
    removeCheckedIngredient,
    allChecked,
    ingredientsArray,
    setIngredientsArray,
    stateAllChecked,
    getItems,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

IngredientsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IngredientsProvider;
