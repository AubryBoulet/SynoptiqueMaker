/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import './AccountConfirmation.scss';
import { useEffect, useRef, useState } from 'react';

export default function AccountConfirmation({ mail }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [valided, setValided] = useState('');
  const [newMail, setNewMail] = useState('');
  const codeRef = useRef(0);

  const navigate = useNavigate();
  useEffect(() => {
    if (mail === '') {
      navigate('/');
    }
  }, [mail]);

  const handleChangeCode = (e) => {
    codeRef.current.setCustomValidity('');
    setCode(e.currentTarget.value);
    setError('');
    setValided('');
  };

  const handleClickValider = (e) => {
    e.preventDefault();
    if (!code) {
      codeRef.current.setCustomValidity(
        'Veuillez entrer le code de validation'
      );
      codeRef.current.reportValidity();
      return false;
    }
    const credential = {
      Mail: mail,
      Code: code,
    };
    fetch(`${import.meta.env.VITE_API_URL}api/registerconfirmation`, {
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
        setValided('Votre compte est bien activé, vous allez être redirigé.');
        setTimeout(() => {
          setValided('');
          navigate('/login');
        }, 3000);
      })
      .catch((message) => {
        setError(message);
      });
  };

  const handleClickNewMail = () => {
    const credential = {
      Mail: mail,
    };
    fetch(`${import.meta.env.VITE_API_URL}api/registernewmail`, {
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
        setNewMail(`Un e-mail vous a été envoyé à l'adresse ${mail}`);
        setTimeout(() => {
          setNewMail('');
        }, 10000);
      })
      .catch((message) => {
        if (message === 'redirect') {
          navigate('/login');
          return;
        }
        setError(message);
      });
  };

  return (
    <div className="register">
      <form className="register_form">
        <h2>Validation</h2>
        <label htmlFor="confirmationCode">
          Code de validation envoyé par mail
        </label>
        <input
          type="text"
          id="confirmationCode"
          placeholder="Code de validation"
          value={code}
          ref={codeRef}
          onChange={handleChangeCode}
        />
        {error && <div className="error"> {error} </div>}
        {valided && <div className="valided"> {valided}</div>}
        {newMail && <div className="newMail"> {newMail}</div>}
        <button className="button" onClick={handleClickValider}>
          Valider
        </button>
        <div className="validate_form">
          <p>Pas reçu le code ?</p>
          <Link onClick={handleClickNewMail}>
            <p>Cliquer ici</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
