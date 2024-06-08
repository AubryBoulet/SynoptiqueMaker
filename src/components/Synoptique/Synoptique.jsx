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
    console.log(`you clicked the ${points[index].content.title}`);
  };

  const handleDragPoint = (e) => {
    if (e.pageY - offsetHeight > 0) {
      const { index } = e.currentTarget.dataset;
      points[index].movePoint(e.pageX, e.pageY - offsetHeight);
      points[index].update();
    }
  };

  const handleDragStopPoint = (e) => {
    console.log('STOP Là faut envoyer la requête API pour modifier en BDD');
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
              className="point"
              ref={elem.ref}
              onClick={handleClickPoint}
              onDrag={handleDragPoint}
              onDragEnd={handleDragStopPoint}
              key={elem.content.id}
              data-index={index}
            />
          );
        })}
    </div>
  );
}
