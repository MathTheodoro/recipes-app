import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import Header from '../components/Header';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  // Estado inicial de login
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const { email, password } = login;

  // Função pra atualização dos campos
  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Salvar apenas o email na localStorage
    localStorage.setItem('user', JSON.stringify({ email }));
    // Navega pra meals depois do login
    navigate('/meals');
  };

  return (
    <>
      <Header currentPath={ location.pathname } />
      <div className="backgroundPurple">
        <img
          src="src\images\recipesIconLogin.svg"
          alt="recipesIconLogin"
          className="recipesIconLogin"
        />
        <img
          src="src\images\recipesTomatoIcon.svg"
          alt="recipesTomatoIcon"
          className="recipesTomatoIcon"
        />
      </div>
      {/* Formulario de login */}
      <form onSubmit={ handleSubmit } className="formLogin">
        <h2 className="tittleLogin">Login</h2>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ password.length <= 6 || !/^\S+@\S+\.\S+$/.test(email) }
        >
          Enter
        </button>
      </form>
    </>
  );
}

export default Login;
