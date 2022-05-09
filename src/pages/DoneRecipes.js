// O texto da categoria da receita deve ter o atributo data-testid="${index}-horizontal-top-text";
// O texto do nome da receita deve ter o atributo data-testid="${index}-horizontal-name";
// O texto da data que a receita foi feita deve ter o atributo data-testid="${index}-horizontal-done-date";
// O elemento de compartilhar a receita deve ter o atributo data-testid="${index}-horizontal-share-btn";
// As tags da receita devem possuir o atributo data-testid=${index}-${tagName}-horizontal-tag;
import React from 'react';
import Header from '../components/Header';
// import Context from '../context/Context';
// import { useParams } from 'react-router-dom';

function DoneRecipes() {
  // const { recipeDetails } = useContext(Context);
  // const { id } = useParams();
  // console.log(id);

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => getDrinkRecipe() }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => getDrinkRecipe() }
      >
        Drink
      </button>
    </div>
  );
}

export default DoneRecipes;
