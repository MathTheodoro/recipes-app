import { Link } from 'react-router-dom';

import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <div className="links">
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="drink"
            data-testid="drinks-bottom-btn"
            className="img"
          />
        </Link>
        <Link to="/meals">
          <img
            src={ mealIcon }
            alt="meal"
            data-testid="meals-bottom-btn"
            className="img"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
