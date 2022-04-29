import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';
import './Foods.css';
import RecipeeCard from '../components/RecipeeCard';
import Footer from '../components/Footer';

function Foods() {
  const { data, initialRender } = useContext(Context);

  useEffect(() => {
    initialRender();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="foods">
      <Header />
      {data.length
        ? (
          <ul>
            {data.map(
              (meal, index) => (<RecipeeCard
                key={ meal.idMeal }
                meal={ meal }
                index={ index }
              />),
            )}
          </ul>
        )
        : <h1>Loading</h1>}
      <Footer />
    </div>
  );
}

export default Foods;
