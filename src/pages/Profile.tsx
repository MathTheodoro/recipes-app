import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';

export default function Profile() {
  const location = useLocation();
  return (
    <>
      <Header currentPath={ location.pathname } />
      <div>
        Profiles
      </div>
      <Footer />
    </>
  );
}
