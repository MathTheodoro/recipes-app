import { createContext } from 'react';
import { DrinksContextType } from '../types/type';

const DrinksContext = createContext({} as DrinksContextType);

export default DrinksContext;
