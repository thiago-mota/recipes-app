import React, { useContext } from 'react';
import Context from '../context/Context';
import CheckboxIngredients from './CheckboxIngredients';
import './InProgress.css';

function InProgress() {
  const { data } = useContext(Context);

  const keysIngredients = Object.keys(data[2])
    .filter((keyObject) => keyObject.includes('strIngredient')
      && data[2][keyObject] !== '');
  // console.log(keysIngredients);
  const arrayOfKeysIngredients = keysIngredients
    .map((keyObject) => data[2][keyObject]);
  // console.log(arrayOfKeysIngredients);

  return (
    <div className="in-progress">
      <div className="midle">
        {
          arrayOfKeysIngredients.map((ingredient, index) => (
            <CheckboxIngredients
              ingredient={ ingredient }
              index={ index }
              key={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

export default InProgress;
