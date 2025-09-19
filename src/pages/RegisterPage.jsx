import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const { locale } = useLocale();

  const localizedText = {
    id: {
      title: 'Daftar Akun Baru',
      namePlaceholder: 'Nama',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      confirmPasswordPlaceholder: 'Konfirmasi Password',
      hasAccount: 'Sudah punya akun?',
      loginLink: 'Login di sini',
      passwordMismatch: 'Password dan konfirmasi password tidak cocok',
    },
    en: {
      title: 'Register New Account',
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      confirmPasswordPlaceholder: 'Confirm Password',
      hasAccount: 'Already have an account?',
      loginLink: 'Login here',
      passwordMismatch: 'Password and confirm password do not match',
    },
  };

  const onRegisterHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(localizedText[locale].passwordMismatch);
      return;
    }

    const { error } = await register({ name, email, password });

    if (!error) {
      navigate('/login');
    }
  };

  return (
    <div className="input-register">
      <h2>{localizedText[locale].title}</h2>
      <form onSubmit={onRegisterHandler}>
        <input
          type="text"
          placeholder={localizedText[locale].namePlaceholder}
          value={name}
          onChange={onNameChange}
        />
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
        <input
          type="password"
          placeholder={localizedText[locale].confirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        {localizedText[locale].hasAccount} <Link to="/login">{localizedText[locale].loginLink}</Link>
      </p>
    </div>
  );
};

export default RegisterPage;