import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './RecipeInProgress.css';
import './RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import CheckboxIngredients from '../components/CheckboxIngredients';
import Context from '../context/Context';

function RecipeInProgress() {
  const { allChecked, favoriteOnClick, favoriteIcon,
    inPro, getRecipeDetails } = useContext(Context);
  const [disable, setDisable] = useState(true);
  const location = useLocation();
  const copiedLink = location.pathname.replace('/in-progress', '');

  useEffect(() => {
    getRecipeDetails(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const shareRecipe = () => {
    const url = 'http://localhost:3000'.concat(copiedLink);
    navigator.clipboard.writeText(url);
    document.getElementById('link-copied').innerHTML = 'Link copied!';
  };

  // console.log(inPro);
  const keysIngredients = Object.keys(inPro)
    .filter((keyObject) => keyObject.includes('strIngredient'));
  const arrayAllItems = keysIngredients
    .map((keyObject) => inPro[keyObject]);
  const arrayOfKeysIngredients = arrayAllItems
    .filter((keyFiltered) => keyFiltered !== null && keyFiltered !== '');

  const verifyAllChecked = () => {
    const recipeType = Object.keys(inPro)
      .includes('idMeal') ? 'meals' : 'cocktails';
    const recipeId = inPro.idMeal ? inPro.idMeal : inPro.idDrink;
    setDisable(!allChecked(recipeType, recipeId, arrayOfKeysIngredients));
  };

  const renderFood = () => (
    <div>
      <img
        src={ inPro.strMealThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ inPro.strMeal }</h2>
      <p data-testid="recipe-category">{ inPro.strCategory }</p>
      <button
        type="button"
        onClick={ shareRecipe }
        data-testid="share-btn"
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
        <div className="in-progress">
          <div className="midle">
            {
              arrayOfKeysIngredients.map((ingredient, index) => (
                <CheckboxIngredients
                  ingredient={ ingredient }
                  index={ index }
                  key={ index }
                  recipeType="meals"
                  recipeId={ inPro.idMeal }
                  verifyAllChecked={ verifyAllChecked }
                />
              ))
            }
          </div>
        </div>
      </div>
      <span data-testid="instructions">
        <h3>Instructions</h3>
        {inPro.strInstructions}
      </span>
      <Link to="/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disable }
        >
          Finalizar Receita
        </button>
      </Link>

    </div>
  );

  const renderDrink = () => (
    <div>
      <img
        src={ inPro.strDrinkThumb }
        alt="recipe_photo"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ inPro.strDrink }</h2>
      <p data-testid="recipe-category">{ inPro.strAlcoholic }</p>
      <button
        type="button"
        onClick={ shareRecipe }
        data-testid="share-btn"
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
        <div className="in-progress">
          <div className="midle">
            {
              arrayOfKeysIngredients.map((ingredient, index) => (
                <CheckboxIngredients
                  ingredient={ ingredient }
                  index={ index }
                  key={ index }
                  recipeType="cocktails"
                  recipeId={ inPro.idDrink }
                  verifyAllChecked={ verifyAllChecked }
                />
              ))
            }
          </div>
        </div>
      </div>
      <span data-testid="instructions">
        <h3>Instructions</h3>
        {inPro.strInstructions}
      </span>
      <Link to="/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disable }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
  // console.log(inPro);

  return (
    location.pathname.includes('foods') ? renderFood() : renderDrink()
  );
}

export default RecipeInProgress;
