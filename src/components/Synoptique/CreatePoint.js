/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
export default function createPoint( token, userId ) {
  const credential = {
    Name: 'point name',
    Type: 1,
    Link: 1,
    Description: 'description du nouveau point',
    File: '',
    Color: '#00FF00',
    Synoptique_Id: 1
  }
  fetch(`${import.meta.env.VITE_API_URL}api/createpoint`, {
    method: 'POST',
    headers: {
      'token': token,
      'clientId': userId,
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
    console.log(message);
  });
}