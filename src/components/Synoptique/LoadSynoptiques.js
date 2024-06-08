/* eslint-disable prettier/prettier */
export default function loadSynoptiques({ token, userId, setSynoptiqueList }) {
  fetch(`${import.meta.env.VITE_API_URL}api/listsynoptiques`, {
    method: 'GET',
    headers: {
      'token': token,
      'clientId': userId
    },
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
    setSynoptiqueList(message);
  });
}
