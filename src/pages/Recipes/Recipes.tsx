import Drinks from '../../components/Drinks';
import Header from '../../components/Header';
import Meals from '../../components/Meals';
import { TitleProps } from '../../types/types';

function Recipes({ title }: TitleProps) {
  return (
    <div>
      <Header currentPath={ title } />
      {title === 'Meals' && <Meals />}
      {title === 'Drinks' && <Drinks />}
    </div>
  );
}

export default Recipes;
