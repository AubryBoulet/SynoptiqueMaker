/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable object-shorthand */
export default async function getImageSize(url, setImgSize) {
  const ImageSize = (url, callback) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const { width, height } = img;
      callback(null, { width: width, height: height });
    };
  };

  ImageSize(url, (err, size) => {
    setImgSize({ width: size.width, height: size.height });
  });
}
