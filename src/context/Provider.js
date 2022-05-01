import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Context from './Context';
import {
  apiIngredient,
  apiName,
  apiFirstLetter,
  apiMealCategories,
  apiMealsByCategory } from '../services/apiFood';
import { apiDrinkIngredient,
  apiDrinkName,
  apiDrinkFirstL, apiDrinkCategories, apiDrinksByCategory } from '../services/apiDrinks';

function Provider({ children }) {
  const [filterSearchInput, setFilterSearchInput] = useState('');
  const [selectedRadio, setSelected] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idType, setIdType] = useState('idMeal');
  const [categories, setCategories] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const history = useHistory();
  const location = useLocation();
  const alert = 'Sorry, we haven\'t found any recipes for these filters.';

  const handleSearchInput = ({ target }) => {
    setFilterSearchInput(target.value);
  };

  const trimArray = (array) => {
    const maxRecipes = 12;
    if (array.length > maxRecipes) {
      const slicedArray = array.slice(0, maxRecipes);
      return slicedArray;
    }
    return array;
  };

  function typeCheck(pathname) {
    setLoading(true);
    if (pathname === '/foods') {
      setIdType('idMeal');
    } else if (pathname === '/drinks') {
      setIdType('idDrink');
    }
    setLoading(false);
  }

  const fetchCategories = async () => {
    setLoading(true);
    if (location.pathname === '/foods') {
      const mealCategories = await apiMealCategories();
      setCategories(mealCategories);
    } if (location.pathname === '/drinks') {
      const drinkCategories = await apiDrinkCategories();
      setCategories(drinkCategories);
    }
    typeCheck();
    // setLoading(false);
  };

  const initialRender = async (foodOrDrink) => {
    const nOfRecipees = 12;
    if (foodOrDrink === '/foods') {
      const returnApi = await apiName('');
      setData(trimArray(returnApi));
    } else if (foodOrDrink === '/drinks') {
      const returnApi = await apiDrinkName('');
      const slicedArray = returnApi.drinks.slice(0, nOfRecipees);
      setData(slicedArray);
    }
    setSearchByCategory(false);
    typeCheck(location.pathname);
  };

  const handleSearchByCategory = async ({ target }) => {
    if (target.innerText !== selectedCategory) {
      setSelectedCategory(target.innerText);
      setSearchByCategory(true);
      if (location.pathname === '/foods') {
        const meals = await apiMealsByCategory(target.innerText);
        setData(trimArray(meals));
      } else if (location.pathname === '/drinks') {
        const drinks = await apiDrinksByCategory(target.innerText);
        setData(trimArray(drinks));
      }
    } if (target.innerText === selectedCategory) {
      setSelectedCategory('');
      initialRender(location.pathname);
    }
  };

  async function searchHelper(input, api) {
    const returnApi = await api(input);
    const returnArray = await returnApi;
    if (!returnArray) {
      return global.alert(alert);
    }
    setData(trimArray(returnArray));
  }

  const searchFoodApi = async () => {
    if (selectedRadio === 'ingredient-search-radio' && filterSearchInput) {
      const returnApi = await apiIngredient(filterSearchInput);
      if (!returnApi) {
        initialRender('/foods');
        return global.alert(alert);
      }
      setData(trimArray(returnApi));
    }

    if (selectedRadio === 'name-search-radio' && filterSearchInput) {
      const returnApi = await apiName(filterSearchInput);
      if (!returnApi) {
        initialRender('/foods');
        return global.alert(alert);
      }
      setData(trimArray(returnApi));
    }

    if (selectedRadio === 'first-letter-search-radio' && filterSearchInput) {
      if (filterSearchInput.length === 1) {
        searchHelper(filterSearchInput, apiFirstLetter);
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
        return global.alert(alert);
      }
      setData(returnApi.drinks);
    }
    if (selectedRadio === 'name-search-radio' && filterSearchInput) {
      const returnApi = await apiDrinkName(filterSearchInput);
      const returnArray = await returnApi.drinks;
      if (!returnArray) {
        return global.alert(alert);
      }
      const drinks = trimArray(returnArray);
      setData(drinks);
    }
    if (selectedRadio === 'first-letter-search-radio' && filterSearchInput) {
      if (filterSearchInput.length === 1) {
        searchHelper(filterSearchInput, apiDrinkFirstL);
      } else {
        return global.alert('Your search must have only 1 (one) character');
      }
    }
    if (!selectedRadio || !filterSearchInput) {
      return global.alert('Preencha corretamente os critérios da busca');
    }
  };

  const handleClickSearch = (searchType) => {
    setSearchByCategory(false);
    if (searchType === '/foods') {
      searchFoodApi();
    }
    if (searchType === '/drinks') {
      searchDrinkApi();
    }
  };

  useEffect(() => {
    if (data) {
      if (location.pathname === '/foods' && data.length === 1 && !searchByCategory) {
        history.push(`/foods/${data[0].idMeal}`);
      } else if (
        location.pathname === '/drinks' && data.length === 1 && !searchByCategory) {
        history.push(`/drinks/${data[0].idDrink}`);
      }
    } else if (!data) {
      if (location.pathname === '/foods') {
        initialRender('/foods');
      }
      if (location.pathname === '/drinks') {
        initialRender('/drinks');
      }
    }
    setFilterSearchInput('');
    fetchCategories();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, location.pathname]);

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
    categories,
    handleSearchByCategory,
    setSearchByCategory,
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
