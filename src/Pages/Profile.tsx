import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [userEmail, setUserEmail] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('user');

    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  return (

    <>
      <Header />
      <div>

        <p>
          <span id="profile-email" data-testid="profile-email">{userEmail}</span>
        </p>

        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => navigate('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => navigate('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();

            navigate('/');
          } }
        >

          Logout
        </button>

        <Footer />

      </div>

    </>
  );
}

export default Profile;
