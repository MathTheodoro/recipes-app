import { createContext } from 'react';
import { MealsContextType } from '../types/type';

const MealsContext = createContext({} as MealsContextType);

export default MealsContext;
