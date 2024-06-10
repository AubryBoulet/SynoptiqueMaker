/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
export default function createSynoptique( token, userId ) {
  const credential = {
    User_Id: userId,
    Main_Synoptique_Id: 0,
    Image: 'test image',
    Title: 'test title',
    slug: 'test_slug'
  }
  fetch(`${import.meta.env.VITE_API_URL}api/createsynoptique`, {
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