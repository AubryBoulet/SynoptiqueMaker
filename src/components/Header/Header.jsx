/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { useNavigate } from 'react-router-dom';
import './Header.scss';

export default function Header({ loged, setLoged }) {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    setLoged('');
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleClickTitle = () => {
    navigate('/');
  };

  return (
    <header>
      <h1 onClick={handleClickTitle}>Synoptique Maker</h1>
      {loged ? (
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
