import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import RecomendationCard from '../components/RecommendationCard';
import './RecipeDetails.css';
import InProgress from '../components/InProgress';

function RecipeInProgress() {
  const [inPro, setInPro] = useState([]);

  const { id } = useParams();
  const location = useLocation();
  // console.log(location.pathname);

  useEffect(() => {
    async function apiRecipeByIdFood() {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      const preResult = result.meals;
      return preResult[0];
    }

    async function apiRecipeByIdDrink() {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      const preResult = result.drinks;
      return preResult[0];
    }

    // console.log(id);
    const getRecipeDetails = async () => {
      if (location.pathname.includes('food')) {
        const apiRecipeDetails = await apiRecipeByIdFood();
        setInPro(apiRecipeDetails);
      }
      if (location.pathname.includes('drink')) {
        const apiRecipeDetails = await apiRecipeByIdDrink();
        setInPro(apiRecipeDetails);
      }
    };
    getRecipeDetails();
  }, [location, id]);

  // const data = apiRecipeById(id);
  // console.log(inPro);
  // }
  // const getTheRecipe = async (idKey) => {
  //   if (location.includes('foods')) {
  // const apiRecipeDetails = await apiRecipeById(idKey);
  // console.log(apiRecipeDetails);
  // setInPro(apiRecipeDetails);
  //   continueRecipeState(apiRecipeDetails.meals[0], idKey);
  // }
  // if (location.includes('drinks')) {
  //   const apiDrinkDetails = await apiDrinkRecipeById(idKey);
  //   setInPro(apiDrinkDetails.drinks[0]);
  //   continueRecipeState(apiDrinkDetails.drinks[0], idKey);
  // }
  // };

  // console.log(inPro);

  const renderFood = () => (
    <div>
      <img
        src={ inPro.strMealThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <title data-testid="recipe-h2">{ inPro.strMeal }</title>
      <p data-testid="recipe-category">{ inPro.strCategory }</p>
      <button type="button" data-testid="share-btn">compartilhar</button>
      <button type="button" data-testid="favorite-btn">favoritar</button>
      <div>
        <h3>Ingredients</h3>
        <InProgress recipeDetails={ inPro } />
      </div>
      <span data-testid="instructions">
        <h3>Instructions</h3>
        {inPro.strInstructions}
      </span>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar Receita
      </button>
    </div>
  );

  const renderDrink = () => (
    <div>
      <img
        src={ inPro.strDrinkThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <title data-testid="recipe-title">{ inPro.strDrink }</title>
      <p data-testid="recipe-category">{ inPro.strAlcoholic }</p>
      <button type="button" data-testid="share-btn">compartilhar</button>
      <button type="button" data-testid="favorite-btn">favoritar</button>
      <div>
        <h3>Ingredients</h3>
        <InProgress recipeDetails={ inPro } />
      </div>
      <span data-testid="instructions">
        <h3>Instructions</h3>
        {inPro.strInstructions}
      </span>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar Receita
      </button>
    </div>
  );
  // console.log(inPro);

  return (
    location.pathname.includes('foods') ? renderFood() : renderDrink()
  );
}

export default RecipeInProgress;
