import { useState } from 'react';

function useLocalStorage<Type>(key: string, intialState: Type) {
  const [store, setStore] = useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) as string)
      : intialState,
  );

  const setStorage = (value: Type) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStore(value);
  };

  const clear = () => {
    localStorage.removeItem(key);
    setStore(intialState);
  };

  return { store, clear, setStorage };
}

export default useLocalStorage;
