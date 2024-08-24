import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import UniqueRecipeProvider from './Provider/UniqueRecipeProvider';
import DrinksProvider from './Provider/DrinksProvider';
import MealsProvider from './Provider/MealsProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>
    </BrowserRouter>,
  );
