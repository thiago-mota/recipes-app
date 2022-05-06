import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Context from '../context/Context';
import RecomendationCard from '../components/RecommendationCard';
import './RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails() {
  const {
    getRecipeDetails,
    recipeDetails,
    startRecipe,
    buttonName,
    favoriteIcon,
    favoriteOnClick,
  } = useContext(Context);
  const location = useLocation();

  console.log(getRecipeDetails);
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

  const shareRecipe = () => {
    const url = 'http://localhost:3000'.concat(location.pathname);
    navigator.clipboard.writeText(url);
    document.getElementById('link-copied').innerHTML = 'Link copied!';
  };

  const renderFood = () => (
    <div>
      <img
        src={ recipeDetails.strMealThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <title data-testid="recipe-title">{ recipeDetails.strMeal }</title>
      <p data-testid="recipe-category">{recipeDetails.strCategory}</p>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareRecipe }
      >
        <img src={ shareIcon } alt="share_icon" />
      </button>
      <p id="link-copied" />
      <input
        type="image"
        src={ favoriteIcon }
        alt="favorite_icon"
        onClick={ favoriteOnClick }
        data-testid="favorite-btn"
      />
      <div>
        <h3>Ingredients</h3>
        { filterIngredients() }
      </div>
      <span data-testid="instructions">
        <h3>Instructions</h3>
        {recipeDetails.strInstructions}
      </span>
      <h3>Video</h3>
      <iframe
        title="recipe_video"
        data-testid="video"
        width="100%"
        height="280"
      >
        {recipeDetails.strYoutube}
      </iframe>
      <div className="horizontalScroll">
        <h3>Recommended</h3>
        <RecomendationCard />
      </div>
      { startRecipe
        && (
          <div>
            <Link to={ `/foods/${recipeDetails.idMeal}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btnStartRecipe"
              >
                { buttonName }
              </button>
            </Link>
          </div>)}
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
      <p data-testid="recipe-category">{recipeDetails.strAlcoholic}</p>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareRecipe }
      >
        <img src={ shareIcon } alt="share_icon" />
      </button>
      <p id="link-copied" />
      <input
        type="image"
        src={ favoriteIcon }
        alt="favorite_icon"
        onClick={ favoriteOnClick }
        data-testid="favorite-btn"
      />
      <div>
        <h3>Ingredients</h3>
        { filterIngredients() }
      </div>
      <span data-testid="instructions">
        <h3>Instructions</h3>
        {recipeDetails.strInstructions}
      </span>
      <h3>Video</h3>
      <iframe title="recipe_video" data-testid="video">{recipeDetails.strYoutube}</iframe>
      <div className="horizontalScroll">
        <h3>Recommended</h3>
        <RecomendationCard />
      </div>
      { startRecipe
        && (
          <div>
            <Link to={ `/drinks/${recipeDetails.idDrink}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btnStartRecipe"
              >
                { buttonName }
              </button>
            </Link>
          </div>)}
    </div>
  );

  return (
    location.pathname.includes('foods') ? renderFood() : renderDrink()
  );
}

export default RecipeDetails;
