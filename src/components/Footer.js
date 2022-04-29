import React from 'react';
import { useHistory } from 'react-router-dom';
import './Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  // const history = useHistory();
  return (
    <footer data-testid="footer" className="footerIcons">
      <button
        type="button"
        // onClick={ history.push('/drinks') }
        src={ drinkIcon }
        alt="drink-icon"
        data-testid="drinks-bottom-btn"
      />
      <button
        type="button"
        // onClick={ history.push('/explore') }
        src={ exploreIcon }
        alt="drink-icon"
        data-testid="explore-bottom-btn"
      />
      <button
        type="button"
        // onClick={ history.push('/foods') }
        src={ mealIcon }
        alt="drink-icon"
        data-testid="food-bottom-btn"
      />
    </footer>
  );
}

export default Footer;
