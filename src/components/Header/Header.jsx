/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { useEffect, useRef } from 'react';

export default function Header({ logged, setLogged, setOffsetHeight }) {
  const navigate = useNavigate();
  const headerRef = useRef();
  const handleClickLogout = () => {
    setLogged(false);
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleClickTitle = () => {
    navigate('/');
  };

  useEffect(() => {
    setOffsetHeight(headerRef.current.clientHeight);
  }, []);

  return (
    <header ref={headerRef}>
      <h1 onClick={handleClickTitle}>Synoptique Maker</h1>
      {logged ? (
        <button className="button_slide" onClick={handleClickLogout}>
          Déconnexion
        </button>
      ) : (
        <button className="button_slide" onClick={handleClickLogin}>
          Connexion
        </button>
      )}
    </header>
  );
}
