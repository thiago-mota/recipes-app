import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Explore.css';
import foods from '../images/foods.png';

function Explore() {
  const history = useHistory();
  return (
    <div className="explore">
      <Header title="Explore" />
      <div className="botoes">
        <button
          type="button"
          className="foodsbtn"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          className="drinksbtn"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <img className="foods" src={ foods } alt="foods" />
      <Footer />
    </div>
  );
}

export default Explore;
