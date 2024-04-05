import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer data-testid="footer">
      <div>
        <button
          type="button"
          onClick={ () => navigate('/drinks') }
        >
          <img
            src={ drinkIcon }
            alt="drink icon"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={ () => navigate('/meals') }
        >
          <img
            src={ mealIcon }
            alt="meal icon"
            data-testid="meals-bottom-btn"
          />
        </button>
      </div>
    </footer>
  );
}
