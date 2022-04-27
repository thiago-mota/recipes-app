import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import rockGlass from '../images/rockGlass.svg';

function Login() {
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState({
    email: '',
  });
  const [password, setPassword] = useState('');
  const history = useHistory();

  function handleOnChange({ target }) {
    const { type, value } = target;
    if (type === 'email') {
      setUser(({
        email: value,
      }));
    } else {
      setPassword(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`email: ${user.email}, password: ${password}`);
    setUser({
      email: '',
    });
    setPassword('');
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  }

  useEffect(() => {
    const validateButton = () => {
      // source: https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
      const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i;
      const minCharacters = 7;

      if (user.email.match(emailRegex) && password.length >= minCharacters) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    validateButton();
  }, [user, password]);
  return (

    <div>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <form
        onSubmit={ handleSubmit }
      >
        <h1>Login</h1>
        <label htmlFor="login-name-input">
          <input
            data-testid="email-input"
            placeholder="Email"
            id="email-name-input"
            type="email"
            value={ user.email }
            onChange={ handleOnChange }
          />
        </label>
        <label htmlFor="login-name-input">
          <input
            data-testid="password-input"
            placeholder="Password"
            id="password-login-input"
            type="password"
            value={ password }
            onChange={ handleOnChange }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ disabled }
        >
          Enter
        </button>
      </form>
    </div>

  );
}

export default Login;
