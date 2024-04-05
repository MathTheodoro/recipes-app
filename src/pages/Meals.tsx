import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';

function Meals() {
  const location = useLocation();
  return (
    <>
      <Header currentPath={ location.pathname } />
      <div>
        Meals
      </div>
      <Footer />
    </>
  );
}

export default Meals;
