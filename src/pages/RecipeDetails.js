import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import RecomendationCard from '../components/RecommendationCard';
import './RecipeDetails.css';

function RecipeDetails() {
  const {
    getRecipeDetails,
    recipeDetails,
  } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    getRecipeDetails(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const filterIngredients = () => {
    // https://masteringjs.io/tutorials/fundamentals/filter-key#:~:text=JavaScript%20objects%20don't%20have,()%20function%20as%20shown%20below.
    const ingredients = Object.entries(recipeDetails)
      .filter(([key]) => key.includes('Ingredient'));
    return ingredients.map(([, value], index) => (
      <span
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { value }
        -
        { recipeDetails['strMeasure'.concat(index + 1)] }
      </span>
    ));
  };

  const renderFood = () => (
    <div>
      <img
        src={ recipeDetails.strMealThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <title data-testid="recipe-title">{ recipeDetails.strMeal }</title>
      <button type="button" data-testid="share-btn">compartilhar</button>
      <button type="button" data-testid="favorite-btn">favoritar</button>
      <span data-testid="recipe-category">{recipeDetails.strCategory}</span>
      { filterIngredients() }
      <span data-testid="instructions">{recipeDetails.strInstructions}</span>
      <iframe title="recipe_video" data-testid="video">{recipeDetails.strYoutube}</iframe>
      <div className="horizontalScroll"><RecomendationCard /></div>
      <button type="button" data-testid="start-recipe-btn">iniciar</button>
    </div>
  );

  const renderDrink = () => (
    <div>
      <img
        src={ recipeDetails.strDrinkThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <title data-testid="recipe-title">{ recipeDetails.strDrink }</title>
      <button type="button" data-testid="share-btn">compartilhar</button>
      <button type="button" data-testid="favorite-btn">favoritar</button>
      <span data-testid="recipe-category">{recipeDetails.strAlcoholic}</span>
      { filterIngredients() }
      <span data-testid="instructions">{recipeDetails.strInstructions}</span>
      <iframe title="recipe_video" data-testid="video">{recipeDetails.strYoutube}</iframe>
      <div className="horizontalScroll"><RecomendationCard /></div>
      <button type="button" data-testid="start-recipe-btn">iniciar</button>
    </div>
  );

  return (
    location.pathname.includes('foods') ? renderFood() : renderDrink()
  );
}

RecipeDetails.propTypes = {
  index: PropTypes.number.isRequired,
};

export default RecipeDetails;
