import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div>
      <footer data-testid="footer" className="footerIcons">
        <link rel="stylesheet" type="text/css" href="App.css" media="screen" />
        <a href="/drinks">
          <input
            type="button"
            src="src/images/drinkIcon.svg"
            alt="drink-icon"
            data-testid="drinks-bottom-btn"
          />
        </a>
        <a href="/explore">
          <input
            type="button"
            src="src/images/exploreIcon.svg"
            alt="explore-icon"
            data-testid="explore-bottom-btn"
          />
        </a>
        <a href="/foods">
          <input
            type="button"
            src="src/images/mealIcon.svg"
            alt="meal-icon"
            data-testid="food-bottom-btn"
          />
        </a>
      </footer>
    </div>
  );
}

export default Footer;
