import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
import Context from './Context';
import {
  apiName,
  apiRecipeById,
} from '../services/apiFood';
import {
  apiDrinkName,
  apiDrinkRecipeById,
} from '../services/apiDrinks';

function RecipeDetailsProvider({ children }) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [startRecipe, setStartRecipe] = useState(true);
  const [buttonName, setButtonName] = useState('Start Recipe');

  // const location = useLocation();

  const startRecipeState = (recipeDetail) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const foundDoneRecipe = doneRecipes.find((doneRecipe) => (
        doneRecipe.id === recipeDetail.idMeal || doneRecipe.id === recipeDetail.idDrink
      ));
      if (foundDoneRecipe) {
        setStartRecipe(false);
      } if (!foundDoneRecipe) {
        setStartRecipe(true);
      }
    }
  };

  const continueRecipeState = (recipeDetail, path) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      let foundInProgressRecipe;
      if (path.includes('foods')) {
        foundInProgressRecipe = inProgressRecipes.meals[recipeDetail.idMeal];
      } if (path.includes('drinks')) {
        foundInProgressRecipe = inProgressRecipes.cocktails[recipeDetail.idDrink];
      }
      if (foundInProgressRecipe) {
        setButtonName('Continue Recipe');
      } if (!foundInProgressRecipe) {
        setButtonName('Start Recipe');
      }
    }
  };

  const getRecipeDetails = async (path) => {
    const pathArray = path.split('/');
    const id = pathArray[pathArray.length - 1];
    if (path.includes('foods')) {
      const apiRecipeDetails = await apiRecipeById(id);
      setRecipeDetails(apiRecipeDetails.meals[0]);
      startRecipeState(apiRecipeDetails.meals[0]);
      continueRecipeState(apiRecipeDetails.meals[0], path);
    }
    if (path.includes('drinks')) {
      const apiDrinkDetails = await apiDrinkRecipeById(id);
      setRecipeDetails(apiDrinkDetails.drinks[0]);
      startRecipeState(apiDrinkDetails.drinks[0]);
      continueRecipeState(apiDrinkDetails.drinks[0], path);
    }
  };

  const getRecommendations = async (path) => {
    const numberOfRecommendation = 6;
    if (path.includes('foods')) {
      const apiDrinks = await apiDrinkName('');
      const slicedDrinks = apiDrinks.slice(0, numberOfRecommendation);
      setRecommendations(slicedDrinks);
    }
    if (path.includes('drinks')) {
      const apiFoods = await apiName('');
      const slicedFoods = apiFoods.slice(0, numberOfRecommendation);
      setRecommendations(slicedFoods);
    }
  };

  const contextValue = {
    getRecipeDetails,
    recipeDetails,
    getRecommendations,
    recommendations,
    startRecipe,
    buttonName,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

RecipeDetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RecipeDetailsProvider;
