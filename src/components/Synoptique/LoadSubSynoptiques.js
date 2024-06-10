/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
export default function loadSubSynoptique( token, userId, setSubSynoptique, synoptiqueId ) {
  fetch(`${import.meta.env.VITE_API_URL}api/loadsubsynoptique`, {
    method: 'GET',
    headers: {
      'token': token,
      'clientId': userId,
      'synoptiqueId': synoptiqueId
    }
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
    setSubSynoptique(message);
  });
}