import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import { apiIngredient, apiName, apiFirstLetter } from '../services/apiFood';
import { apiDrinkIngredient, apiDrinkName, apiDrinkFirstL } from '../services/apiDrinks';

function Provider({ children }) {
  const [filterSearchInput, setFilterSearchInput] = useState({
    filterSearchInput: {
      searchFiltered: '',
    },
  });
  const [selectedRadio, setSelected] = useState();
  const [data, setData] = useState([]);

  const handleSearchInput = ({ target }) => {
    setFilterSearchInput({ searchFiltered: target.value });
  };

  const history = useHistory();

  const searchFoodApi = async () => {
    const { searchFiltered } = filterSearchInput;
    if (selectedRadio === 'ingredient-search-radio') {
      const returnApi = await apiIngredient(searchFiltered);
      setData(returnApi);
    }
    if (selectedRadio === 'name-search-radio') {
      const returnApi = await apiName(searchFiltered);
      setData(returnApi);
    }
    if (selectedRadio === 'first-letter-search-radio') {
      if (searchFiltered.length === 1) {
        const returnApi = await apiFirstLetter(searchFiltered);
        setData(returnApi);
      } else {
        return global.alert('Your search must have only 1 (one) character');
      }
    }
    if (!selectedRadio || searchFiltered.length === 0) {
      return global.alert('Preencha corretamente os critérios da busca');
    }
  };

  const { searchFiltered } = filterSearchInput;
  const searchDrinkApi = async () => {
    if (selectedRadio === 'ingredient-search-radio') {
      const returnApi = await apiDrinkIngredient(searchFiltered);
      setData(returnApi);
    }
    if (selectedRadio === 'name-search-radio') {
      const returnApi = await apiDrinkName(searchFiltered);
      setData(returnApi);
    }
    if (selectedRadio === 'first-letter-search-radio') {
      if (searchFiltered.length <= 1) {
        const returnApi = await apiDrinkFirstL(searchFiltered);
        setData(returnApi);
      } else {
        return global.alert('Your search must have only 1 (one) character');
      }
    }
    if (!selectedRadio || searchFiltered.length === 0) {
      return global.alert('Preencha corretamente os critérios da busca');
    }
  };

  const handleClickSearch = async (searchType) => {
    if (searchType === 'food') {
      searchFoodApi();
      if (data.meals.length === 1 && data.meals !== null) {
        history.push(`/foods/${searchFiltered}`);
      }
      if (data.drinks === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
    if (searchType === 'drink') {
      searchDrinkApi();
      if (!data.drinks) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (data.drinks.length === 1 && data.drinks !== null) {
        history.push(`/drinks/${searchFiltered}`);
      }
    }
  };

  const contextValue = {
    handleSearchInput,
    filterSearchInput,
    handleClickSearch,
    selectedRadio,
    setSelected,
    data,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
