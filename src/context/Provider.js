import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import {
  apiIngredient,
  apiName,
  apiFirstLetter,
  apiRecipeById,
} from '../services/apiFood';
import {
  apiDrinkIngredient,
  apiDrinkName,
  apiDrinkFirstL,
  apiDrinkRecipeById,
} from '../services/apiDrinks';

function Provider({ children }) {
  const [filterSearchInput, setFilterSearchInput] = useState({
    filterSearchInput: {
      searchFiltered: '',
    },
  });
  const [selectedRadio, setSelected] = useState();
  const [data, setData] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const handleSearchInput = ({ target }) => {
    setFilterSearchInput({ searchFiltered: target.value });
  };

  const history = useHistory();

  const searchFoodApi = async () => {
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
      if (searchFiltered.length === 1) {
        const returnApi = await apiFirstLetter(searchFiltered);
        setData(returnApi.meals);
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
      console.log(returnApi.drinks);
      setData(returnApi.drinks);
    }
    if (selectedRadio === 'name-search-radio') {
      const returnApi = await apiDrinkName(searchFiltered);
      setData(returnApi.drinks);
    }
    if (selectedRadio === 'first-letter-search-radio') {
      if (searchFiltered.length <= 1) {
        const returnApi = await apiDrinkFirstL(searchFiltered);
        setData(returnApi.drinks);
      } else {
        return global.alert('Your search must have only 1 (one) character');
      }
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
      const returnApi = await apiDrinkName('');
      const slicedArray = returnApi.drinks.slice(0, nOfRecipees);
      setData(slicedArray);
    }
  };

  const handleClickSearch = (searchType) => {
    if (searchType === '/foods') {
      searchFoodApi();
      if (data.length === 1 && data.meals !== null) {
        history.push(`/foods/${searchFiltered}`);
      }
      if (data === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
    if (searchType === '/drinks') {
      searchDrinkApi();
      if (!data) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (data.length === 1 && data.drinks !== null) {
        history.push(`/drinks/${searchFiltered}`);
      }
    }
  };

  const getRecipeDetails = async (path) => {
    const pathArray = path.split('/');
    const id = pathArray[pathArray.length - 1];
    if (path.includes('foods')) {
      const apiRecipeDetails = await apiRecipeById(id);
      setRecipeDetails(apiRecipeDetails.meals[0]);
    }
    if (path.includes('drinks')) {
      const apiDrinkDetails = await apiDrinkRecipeById(id);
      setRecipeDetails(apiDrinkDetails.drinks[0]);
    }
  };

  const getRecommendations = async (path) => {
    const numberOfRecommendation = 6;
    if (path.includes('foods')) {
      const apiDrinks = await apiDrinkName('');
      const slicedDrinks = apiDrinks.drinks.slice(0, numberOfRecommendation);
      setRecommendations(slicedDrinks);
    }
    if (path.includes('drinks')) {
      const apiFoods = await apiName('');
      const slicedFoods = apiFoods.meals.slice(0, numberOfRecommendation);
      setRecommendations(slicedFoods);
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
    getRecipeDetails,
    recipeDetails,
    getRecommendations,
    recommendations,
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
