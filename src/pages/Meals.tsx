import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

function Meals() {
  const location = useLocation();
  return (
    <>
      <Header currentPath={ location.pathname } />
      <div>
        Meals
      </div>
    </>
  );
}

export default Meals;
