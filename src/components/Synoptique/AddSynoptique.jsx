/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
import { useNavigate } from 'react-router-dom';
import './AddSynoptique.scss';
import { useEffect, useRef, useState } from 'react';
import slugifyStr from '../../utils/slugify';

export default function AddSynoptique({ mainSynoptique, token, userId, logged }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState();
  const titleRef = useRef(0);
  const fileRef = useRef(0);

  useEffect(() => {
    if (!logged) navigate('/');
  },[logged])
  const handleClickCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };
  const handleClickValid = async (e) => {
    e.preventDefault();
    if (!title) {
      titleRef.current.setCustomValidity('Veuillez saisire un titre');
      titleRef.current.reportValidity();
      return false;
    }
    if (!file) {
      fileRef.current.setCustomValidity('Veuillez choisire une image');
      fileRef.current.reportValidity();
      return false;
    }
    console.log(file);
    const data = new FormData();
    data.append('image',file);
    let response = await fetch(
      `${import.meta.env.VITE_API_URL}api/sendimage`,
      {
        method: 'POST',
        headers: {
          token: token,
          clientId: userId,
          'Content-Name': file.name,
        },
        body: data,
      }
    );
    const message = await response.json();
    const credential = {
      User_Id: userId,
      Main_Synoptique_Id: mainSynoptique,
      Image: message,
      Title: title,
      Slug: slugifyStr(title),
    }
    response = await fetch(
      `${import.meta.env.VITE_API_URL}api/createsynoptique`,
      {
        method: 'POST',
        headers: {
          token: token,
          clientId: userId,
        },
        body: JSON.stringify(credential),
      }
    )
    const result = await response.json()
    navigate('/');
  };
  const handleChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
    e.currentTarget.setCustomValidity('');
  };
  const handleChangeFile = (e) => {
    setFile(e.currentTarget.files[0]);
    e.currentTarget.setCustomValidity('');
  };

  return (
    <div className="synoptique_add">
      <form className="synoptique_add_form">
        <h2>Nouveau synoptique</h2>
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          placeholder="Titre"
          id="title"
          value={title}
          onChange={handleChangeTitle}
          ref={titleRef}
        />
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          onChange={handleChangeFile}
          ref={fileRef}
        />
        <div className="button_section">
          <button onClick={handleClickCancel}>Annuler</button>
          <button onClick={handleClickValid}>Valider</button>
        </div>
      </form>
    </div>
  );
}
