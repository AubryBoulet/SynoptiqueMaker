/* eslint-disable react/prop-types */
/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import { useRef, useState } from 'react';

export default function Register({ mail, setMail }) {
  const [password, setPassword] = useState('');
  const [confirme, setConfirme] = useState('');
  const [error, setError] = useState('');
  const mailRef = useRef(0);
  const passwordRef = useRef(0);
  const confirmeRef = useRef(0);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleChangeMail = (e) => {
    mailRef.current.setCustomValidity('');
    const newValue = e.currentTarget.value;
    setMail(newValue);
    if (newValue) {
      if (validateEmail(newValue)) {
        mailRef.current.style.color = 'green';
      } else {
        mailRef.current.style.color = 'red';
      }
    } else {
      mailRef.current.style.color = 'black';
    }
  };

  const handleChangePassword = (e) => {
    passwordRef.current.setCustomValidity('');
    setPassword(e.currentTarget.value);
  };

  const handleChangeConfirme = (e) => {
    const newValue = e.currentTarget.value;
    setConfirme(newValue);
    if (newValue) {
      if (newValue === password) {
        confirmeRef.current.style.color = 'black';
      } else {
        confirmeRef.current.style.color = 'red';
      }
    } else {
      confirmeRef.current.style.color = 'black';
    }
    confirmeRef.current.setCustomValidity('');
  };

  const handleClickValider = (e) => {
    e.preventDefault();
    if (password !== confirme) {
      confirmeRef.current.setCustomValidity(
        'Veuillez confirmer le mot de passe'
      );
      confirmeRef.current.reportValidity();
      return false;
    }
    if (!validateEmail(mail)) {
      mailRef.current.setCustomValidity(
        'Veuillez entrer une adresse e-mail valide'
      );
      mailRef.current.reportValidity();
      return false;
    }
    if (!password) {
      passwordRef.current.setCustomValidity('Veuillez entrer un mot de passe');
      passwordRef.current.reportValidity();
      return false;
    }
    const credential = {
      Mail: mail,
      Password: password,
    };
    fetch(`${import.meta.env.VITE_API_URL}api/register`, {
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
        navigate('/accountconfirmation');
      })
      .catch((message) => {
        setError(message);
      });
  };

  return (
    <div className="register">
      <form className="register_form">
        <h2>Inscription</h2>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Email"
          onChange={handleChangeMail}
          value={mail}
          ref={mailRef}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          onChange={handleChangePassword}
          value={password}
          ref={passwordRef}
        />
        <label htmlFor="validation_password">Confirmer le mot de passe</label>
        <input
          type="password"
          id="validation_password"
          placeholder="Confirmer le mot de passe"
          onChange={handleChangeConfirme}
          value={confirme}
          ref={confirmeRef}
        />
        <button className="button" onClick={handleClickValider}>
          Valider
        </button>
        {error && <div className="error"> {error} </div>}
        <div className="login">
          <p>Déjà inscrit ?</p>
          <Link to="/login">
            <p>Connexion</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
