import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function DrinksPage() {
  return (
    <main>
      <Header />
      <Recipes type="drinks" />
      <Footer />
    </main>
  );
}

export default DrinksPage;
