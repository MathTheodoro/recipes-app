import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function Drinks() {
  const location = useLocation();
  return (
    <>
      <Header currentPath={ location.pathname } />
      <div>
        <h3>Drinks</h3>
      </div>
    </>
  );
}
