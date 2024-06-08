/* eslint-disable one-var */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
import Point from './Points';

export default async function LoadPoints({ backRef, token, userId, synoptiqueId, setPoints, imgSize }) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}api/listpoints`, {
    method: 'GET',
    headers: {
      token: token,
      clientId: userId,
      synoptiqueid: synoptiqueId,
    },
  })
  const message = await response.json();
  const points = [];
  for (const p of message) {
    points.push(
      new Point({
        position: {
          x: p.x,
          y: p.y,
        },
        color: p.color,
        type: p.type,
        content: {
          link: p.link,
          description: p.description,
          file: p.file,
          id: p.id,
          title: p.name,
        },
        parent: {
          ref: backRef,
          width: imgSize.width,
          height: imgSize.height,
        },
      })
    );
    }
    setPoints(points)

  }