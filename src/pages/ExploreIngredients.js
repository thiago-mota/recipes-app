import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiMealIngredientList } from '../services/apiFood';
import { apiDrinkIngredientList } from '../services/apiDrinks';
import IngredientCard from '../components/IngredientCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [type, setType] = useState('');
  const location = useLocation();

  const fetchIngredients = async () => {
    if (location.pathname.includes('foods')) {
      setType('food');
      const ingrList = await apiMealIngredientList();
      setIngredients(ingrList);
    } else if (location.pathname.includes('drinks')) {
      setType('drink');
      const ingrList = await apiDrinkIngredientList();
      setIngredients(ingrList);
    }
  };

  useEffect(() => {
    if (!ingredients.length) {
      fetchIngredients();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />
      {!ingredients
        ? <p>Loading</p>
        : (
          <ul>
            {ingredients.map(
              (ingredient, index) => (<IngredientCard
                index={ index }
                key={ index }
                ing={ ingredient }
                type={ type }
              />),
            )}
          </ul>)}
      <Footer />
    </div>

  );
}

export default ExploreIngredients;
