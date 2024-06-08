/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Header.scss';
import { useEffect, useRef, useState } from 'react';

export default function Header({
  logged,
  setLogged,
  setOffsetHeight,
  editMode,
  setEditMode,
}) {
  const navigate = useNavigate();
  const headerRef = useRef();
  const { pathname } = useLocation();
  const [displayeToolBox, setDisplayToolBox] = useState(false);
  const handleClickLogout = () => {
    setLogged(false);
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleClickTitle = () => {
    navigate('/');
  };

  const handleClickEdit = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    setOffsetHeight(headerRef.current.clientHeight);
  }, []);

  useEffect(() => {
    if (pathname.search(/synoptique/) === -1) {
      setDisplayToolBox(false);
    } else {
      setDisplayToolBox(true);
    }
  }, [pathname]);

  return (
    <header ref={headerRef}>
      <h1 onClick={handleClickTitle}>Synoptique Maker</h1>
      <div className="header_toolbox">
        {displayeToolBox && (
          <>
            {editMode && <i className="bx bxs-location-plus" />}
            {editMode && <i className="bx bxs-file-plus" />}
            <i
              onClick={handleClickEdit}
              className={editMode ? 'bx bxs-pointer' : 'bx bxs-edit'}
            />
          </>
        )}
        {logged ? (
          <button className="button_slide" onClick={handleClickLogout}>
            Déconnexion
          </button>
        ) : (
          <button className="button_slide" onClick={handleClickLogin}>
            Connexion
          </button>
        )}
      </div>
    </header>
  );
}
