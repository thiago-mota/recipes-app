import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { apiIngredient, apiName, apiFirstLetter } from '../services/apiServices';

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
      setData(returnApi);
      // console.log(returnApi);
    }
    if (selectedRadio === 'name-search-radio') {
      const returnApi = await apiName(searchFiltered);
      setData(returnApi);
    }
    if (selectedRadio === 'first-letter-search-radio') {
      const returnApi = await apiFirstLetter(searchFiltered);
      setData(returnApi);
    }
    if (!selectedRadio || searchFiltered.length === 0) {
      return global.alert('Preencha corretamente os critérios da busca');
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

  useEffect(() => {
    console.log(data);
  }, [data]);

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
