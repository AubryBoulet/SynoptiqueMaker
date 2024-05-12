import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/logo.svg';

import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import AccountConfirmation from '../Register/AccountConfirmation';
import Home from '../Home/Home';

function App() {
  const [mail, setMail] = useState('');
  const [token, setToken] = useState('');
  const [loged, setLoged] = useState(false);
  const [userId, setUserId] = useState(0);

  return (
    <Router>
      <div className="App">
        <Header loged={loged} setLoged={setLoged} />
        <div className="body_content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <Login
                  mail={mail}
                  setMail={setMail}
                  setToken={setToken}
                  setLoged={setLoged}
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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
