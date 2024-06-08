/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';

import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import AccountConfirmation from '../Register/AccountConfirmation';
import Home from '../Home/Home';
import getCookieValue from '../../utils/getCookie';
import logFromCookie from '../../utils/logFromCookie';
import Synoptique from '../Synoptique/Synoptique';
import loadSynoptiques from '../Synoptique/LoadSynoptiques';

function App() {
  const [mail, setMail] = useState('');
  const [token, setToken] = useState('');
  const [logged, setLogged] = useState(false);
  const [userId, setUserId] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [synoptiqueList, setSynoptiqueList] = useState();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (getCookieValue('SNMToken')) {
      logFromCookie({ setLogged, setUserId, setToken });
    }
  }, []);

  useEffect(() => {
    if (logged) loadSynoptiques({ token, userId, setSynoptiqueList });
  }, [logged]);

  return (
    <Router>
      <div className="App">
        <Header
          logged={logged}
          setLogged={setLogged}
          setOffsetHeight={setOffsetHeight}
          editMode={editMode}
          setEditMode={setEditMode}
        />
        <div className="body_content">
          <Routes>
            <Route
              path="/"
              element={<Home logged={logged} synoptiqueList={synoptiqueList} />}
            />
            <Route
              path="/login"
              element={
                <Login
                  mail={mail}
                  setMail={setMail}
                  setToken={setToken}
                  setLogged={setLogged}
                  setUserId={setUserId}
                />
              }
            />
            <Route
              path="/register"
              element={<Register mail={mail} setMail={setMail} />}
            />
            <Route
              path="/accountconfirmation"
              element={<AccountConfirmation mail={mail} />}
            />
            <Route
              path="/synoptique/:name"
              element={
                <Synoptique
                  logged={logged}
                  offsetHeight={offsetHeight}
                  token={token}
                  userId={userId}
                  synoptiqueList={synoptiqueList}
                  editMode={editMode}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
