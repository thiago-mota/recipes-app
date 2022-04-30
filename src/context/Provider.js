import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Context from './Context';
import { apiIngredient, apiName, apiFirstLetter } from '../services/apiFood';
import { apiDrinkIngredient, apiDrinkName, apiDrinkFirstL } from '../services/apiDrinks';

function Provider({ children }) {
  const [filterSearchInput, setFilterSearchInput] = useState('');
  const [selectedRadio, setSelected] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idType, setIdType] = useState('idMeal');

  const handleSearchInput = ({ target }) => {
    setFilterSearchInput(target.value);
  };

  const history = useHistory();
  const location = useLocation();

  const initialRender = async (foodOrDrink) => {
    setLoading(true);
    const nOfRecipees = 12;
    if (foodOrDrink === '/foods') {
      const returnApi = await apiName('');
      const slicedArray = returnApi.meals.slice(0, nOfRecipees);
      setData(slicedArray);
      setLoading(false);
    } else if (foodOrDrink === '/drinks') {
      const returnApi = await apiDrinkName('');
      const slicedArray = returnApi.drinks.slice(0, nOfRecipees);
      setData(slicedArray);
      setLoading(false);
    }
  };



  const searchFoodApi = async () => {
    if (selectedRadio === 'ingredient-search-radio' && filterSearchInput) {
      const returnApi = await apiIngredient(filterSearchInput);
      const returnArray = await returnApi.meals;
      if (!returnArray) {
        setData([]);
      }
      setData(returnApi.meals);
    }

    if (selectedRadio === 'name-search-radio' && filterSearchInput) {
      const returnApi = await apiName(filterSearchInput);
      const returnArray = await returnApi.meals;
      if (!returnArray) {
        initialRender();
      }
      setData(returnApi.meals);
    }

    if (selectedRadio === 'first-letter-search-radio' && filterSearchInput) {
      if (filterSearchInput.length === 1) {
        const returnApi = await apiFirstLetter(filterSearchInput);
        const returnArray = await returnApi.meals;
        if (!returnArray) {
          initialRender();
        }
        setData(returnApi.meals);
      } else {
        return global.alert('Your search must have only 1 (one) character');
      }
    }

    if (!selectedRadio || !filterSearchInput) {
      return global.alert('Preencha corretamente os critérios da busca');
    }
  };

  const searchDrinkApi = async () => {
    if (selectedRadio === 'ingredient-search-radio' && filterSearchInput) {
      const returnApi = await apiDrinkIngredient(filterSearchInput);
      const returnArray = await returnApi.drinks;
      if (!returnArray) {
        initialRender();
      }
      setData(returnApi.drinks);
    }
    if (selectedRadio === 'name-search-radio' && filterSearchInput) {
      const returnApi = await apiDrinkName(filterSearchInput);
      const returnArray = await returnApi.drinks;
      if (!returnArray) {
        initialRender();
      }
      setData(returnApi.drinks);
    }
    if (selectedRadio === 'first-letter-search-radio' && filterSearchInput) {
      if (filterSearchInput.length >= 1) {
        const returnApi = await apiDrinkFirstL(filterSearchInput);
        const returnArray = await returnApi.drinks;
        if (!returnArray) {
          initialRender();
        }
        setData(returnApi.drinks);
      } else {
        return global.alert('Your search must have only 1 (one) character');
      }
    }
    if (!selectedRadio || !filterSearchInput) {
      return global.alert('Preencha corretamente os critérios da busca');
    }
  };

  const handleClickSearch = (searchType) => {
    if (searchType === '/foods') {
      searchFoodApi();
    }
    if (searchType === '/drinks') {
      searchDrinkApi();

    }
  };

  function typeCheck(pathname) {
    setLoading(true);
    if (pathname === '/foods') {
      setIdType('idMeal');
      setLoading(false);
    } else if (pathname === '/drinks') {
      setIdType('idDrink');
      setLoading(false);
    }
  }

  useEffect(() => {
    if (data) {
      if (location.pathname === '/foods' && data.length === 1) {
        history.push(`/foods/${data[0].idMeal}`);
      } else if (
        location.pathname === '/drinks' && data.length === 1) {
        history.push(`/drinks/${data[0].idDrink}`);
      }
    } else {
      initialRender('/foods');
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const contextValue = {
    handleSearchInput,
    filterSearchInput,
    handleClickSearch,
    selectedRadio,
    setSelected,
    data,
    initialRender,
    loading,
    idType,
    typeCheck,
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
