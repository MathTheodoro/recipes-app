import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Logo from '../images/logo Recipes App.png';
import './Login.css';

export default function Login() {
  const form = { email: '', password: '' };
  const [formData, setFormData] = useState(form);
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    navigate('/meals', { state: { title: 'Meals', isSearch: true } });
  };

  const isDisable = isEmail(formData.email) && formData.password.length > 6;
  return (
    <form className="login-box hero">
      <img src={ Logo } alt="" className="recipe-logo" />
      <h1>Login</h1>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          Email
        </InputGroup.Text>
        <Form.Control
          id="basic-url"
          aria-describedby="basic-addon3"
          data-testid="email-input"
          type="text"
          value={ formData.email }
          onChange={ ({ target }) => setFormData({ ...formData, email: target.value }) }
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          Password
        </InputGroup.Text>
        <Form.Control
          data-testid="password-input"
          type="text"
          value={ formData.password }
          onChange={ ({ target }) => setFormData(
            { ...formData, password: target.value },
          ) }
        />
      </InputGroup>
      <Button
        variant="warning"
        className="btnLogin"
        size="lg"
        type="button"
        disabled={ !isDisable }
        data-testid="login-submit-btn"
        onClick={ handleFormSubmit }
      >
        Enter
      </Button>
    </form>
  );
}
