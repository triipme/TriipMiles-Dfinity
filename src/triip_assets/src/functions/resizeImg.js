import Resizer from "react-image-file-resizer";
export const resizeImg = ({ blob, asprX, asprY }) => {
  return new Promise(resolve => {
    Resizer.imageFileResizer(
      blob,
      asprX * 100,
      asprY * 100,
      "JPEG",
      100,
      0,
      uri => resolve(uri),
      "base64",
      asprX * 100 * 0.05,
      asprY * 100 * 0.05
    );
  });
};
