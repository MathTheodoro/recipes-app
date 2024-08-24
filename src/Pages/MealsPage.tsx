import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function MealsPage() {
  return (
    <main>
      <Header />
      <Recipes type="meals" />
      <Footer />
    </main>
  );
}

export default MealsPage;
