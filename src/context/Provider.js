import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';
import {
  apiIngredient,
  apiName,
  apiFirstLetter,
  apiDrinks } from '../services/apiServices';

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

  const handleClickSearch = async () => {
    const { searchFiltered } = filterSearchInput;
    if (selectedRadio === 'ingredient-search-radio') {
      const returnApi = await apiIngredient(searchFiltered);
      setData(returnApi.meals);
    }
    if (selectedRadio === 'name-search-radio') {
      const returnApi = await apiName(searchFiltered);
      setData(returnApi.meals);
    }
    if (selectedRadio === 'first-letter-search-radio') {
      const returnApi = await apiFirstLetter(searchFiltered);
      setData(returnApi.meals);
    }
    if (!selectedRadio || searchFiltered.length === 0) {
      return global.alert('Preencha corretamente os critérios da busca');
    }
  };

  // Função que faz o fetch da página principal de receitas logo após o login
  const initialRender = async (foodOrDrink) => {
    const nOfRecipees = 12;
    if (foodOrDrink === '/foods') {
      const returnApi = await apiName('');
      const slicedArray = returnApi.meals.slice(0, nOfRecipees);
      setData(slicedArray);
    } else if (foodOrDrink === '/drinks') {
      const returnApi = await apiDrinks('');
      const slicedArray = returnApi.drinks.slice(0, nOfRecipees);
      setData(slicedArray);
    }
  };

  const contextValue = {
    handleSearchInput,
    filterSearchInput,
    handleClickSearch,
    selectedRadio,
    setSelected,
    data,
    initialRender,
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
