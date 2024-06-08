/* eslint-disable object-shorthand */
import getCookieValue from './getCookie';

export default function logFromCookie({ setLogged, setUserId, setToken }) {
  const token = getCookieValue('SNMToken');
  fetch(`${import.meta.env.VITE_API_URL}api/checkactivetoken`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  })
    .then(async (response) => {
      const msg = await response.json();
      return { ok: response.ok, message: msg };
    })
    .then((response) => {
      const { ok, message } = response;
      if (!ok) {
        return;
      }
      setToken(token);
      setLogged(true);
      setUserId(message);
    });
}
