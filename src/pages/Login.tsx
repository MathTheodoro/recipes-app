import { useState } from 'react';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const { email, password } = login;

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };
  return (
    <form>
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
  );
}

export default Login;
