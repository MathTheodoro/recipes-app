import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);
  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

export default renderWithRouter;
