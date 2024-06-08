/* eslint-disable object-shorthand */
/* eslint-disable one-var */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate, useParams } from 'react-router-dom';
import './Synoptique.scss';
import { useEffect, useRef, useState } from 'react';
import Point from './Points';
import LoadPoints from './LoadPoints';
import getImageSize from '../../utils/getImageSize';

export default function Synoptique({
  logged,
  offsetHeight,
  token,
  userId,
  synoptiqueList,
  editMode,
}) {
  const navigate = useNavigate();
  const backRef = useRef();
  const [points, setPoints] = useState();
  const params = useParams();
  const [synoptiqueId, setSynoptiqueId] = useState();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [imgSize, setImgSize] = useState();

  useEffect(() => {
    if (!logged) navigate('/');
    if (synoptiqueList?.length) {
      for (const i of synoptiqueList) {
        if (i.slug === params.name) {
          setSynoptiqueId(i.id);
          setImage(i.image);
          setTitle(i.title);
          getImageSize(i.image, setImgSize);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (synoptiqueId && imgSize)
      LoadPoints({ backRef, token, userId, synoptiqueId, setPoints, imgSize });
  }, [synoptiqueId, imgSize]);

  const handleResize = () => {
    if (points?.length) {
      points.forEach((elem) => {
        elem.update();
      });
    }
  };

  const handleClickPoint = (e) => {
    const { index } = e.currentTarget.dataset;
    if (editMode) {
      console.log(
        `you clicked the ${points[index].content.title} in edit mode`
      );
    } else {
      console.log(
        `you clicked the ${points[index].content.title} in visualisation mode`
      );
    }
  };

  const handleDragStopPoint = async (e) => {
    if (!editMode) return;
    const { index } = e.currentTarget.dataset;
    const { pageX } = e;
    let { pageY } = e;
    if (e.pageY - offsetHeight < 0) {
      pageY = 0;
    }
    points[index].movePoint(pageX, pageY - offsetHeight);
    points[index].update();
    const credential = {
      Id: points[index].content.id,
      x: points[index].position.x,
      y: points[index].position.y,
    };
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/movepoint`,
      {
        method: 'PUT',
        headers: {
          token: token,
          clientId: userId,
        },
        body: JSON.stringify(credential),
      }
    );
    const message = await response.json();
    console.log(message);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [points]);

  useEffect(() => {
    backRef.current.style.backgroundImage = `URL(${image})`;
  }, [image]);
  return (
    <div id="synoptique" ref={backRef}>
      <h2>{title}</h2>
      {points?.length &&
        points?.map((elem, index) => {
          return (
            <div
              draggable={editMode ? 'true' : 'false'}
              className="point"
              ref={elem.ref}
              onDragEnd={handleDragStopPoint}
              onClick={handleClickPoint}
              key={elem.content.id}
              data-index={index}
              style={{ background: elem.color }}
            >
              {!editMode && <p>{elem.content.title}</p>}
            </div>
          );
        })}
    </div>
  );
}
