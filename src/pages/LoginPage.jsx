import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import useInput from '../hooks/useInput';
import { login } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

const LoginPage = ({ loginSuccess }) => {
  const navigate = useNavigate();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const { locale } = useLocale();

  const localizedText = {
    id: {
      title: 'Halaman Login',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      button: 'Login',
      noAccount: 'Belum punya akun?',
      registerLink: 'Daftar di sini',
    },
    en: {
      title: 'Login Page',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      button: 'Login',
      noAccount: 'Don\'t have an account?',
      registerLink: 'Register here',
    },
  };

  const onLoginHandler = async (event) => {
    event.preventDefault();
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
      navigate('/');
    }
  };

  return (
    <div className="input-login">
      <h2>{localizedText[locale].title}</h2>
      <form onSubmit={onLoginHandler}>
        <input
          type="email"
          placeholder={localizedText[locale].emailPlaceholder}
          value={email}
          onChange={onEmailChange}
        />
        <input
          type="password"
          placeholder={localizedText[locale].passwordPlaceholder}
          value={password}
          onChange={onPasswordChange}
        />
        <button type="submit">{localizedText[locale].button}</button>
      </form>
      <p>
        {localizedText[locale].noAccount} <Link to="/register">{localizedText[locale].registerLink}</Link>
      </p>
    </div>
  );
};
 
LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;