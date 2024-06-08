/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useRef, useState } from 'react';

export default function Login({
  mail,
  setMail,
  setToken,
  setLogged,
  setUserId,
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const mailRef = useRef(0);
  const PassRef = useRef(0);

  const handleChangeMail = (e) => {
    mailRef.current.setCustomValidity('');
    setMail(e.currentTarget.value);
    setError('');
  };

  const handleChangePassword = (e) => {
    PassRef.current.setCustomValidity('');
    setPassword(e.currentTarget.value);
    setError('');
  };

  const handleClickButton = (e) => {
    e.preventDefault();
    if (!mail) {
      mailRef.current.setCustomValidity(
        'Veuillez saisire votre adresse e-mail'
      );
      mailRef.current.reportValidity();
      return false;
    }
    if (!password) {
      PassRef.current.setCustomValidity('Veuillez saisire votre mot de passe');
      PassRef.current.reportValidity();
      return false;
    }
    const credential = {
      Mail: mail,
      Password: password,
    };
    fetch(`${import.meta.env.VITE_API_URL}api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credential),
    })
      .then(async (response) => {
        const msg = await response.json();
        return { ok: response.ok, message: msg };
      })
      .then((response) => {
        const { ok, message } = response;
        if (!ok) {
          throw message;
        }
        if (message === 'to validate') {
          navigate('/AccountConfirmation');
          return;
        }
        setToken(message.token);
        setUserId(message.id);
        setLogged(true);
        setMail('');
        document.cookie = `SNMToken = ${message.token}`;
        navigate('/');
      })
      .catch((message) => {
        setError(message);
      });
  };

  return (
    <div className="register">
      <form className="register_form">
        <h2>Connexion</h2>
        <label htmlFor="email_login">Email</label>
        <input
          type="text"
          id="email_login"
          placeholder="Email"
          value={mail}
          onChange={handleChangeMail}
          ref={mailRef}
        />
        <label htmlFor="password_login">Mot de passe</label>
        <input
          type="password"
          id="password_login"
          placeholder="Mot de passe"
          value={password}
          onChange={handleChangePassword}
          ref={PassRef}
        />
        {error && <div className="error"> {error} </div>}
        <button className="button" onClick={handleClickButton}>
          Connexion
        </button>
        <div className="to_register">
          <p>Pas encore inscrit ?</p>
          <Link to="/register">
            <p>Inscription</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
