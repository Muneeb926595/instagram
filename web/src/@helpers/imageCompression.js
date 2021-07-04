import imageCompression from "browser-image-compression";

export const lighterImage = (file) => {
  return new Promise(function (resolve, reject) {
    var options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    imageCompression(file, options)
      .then(function (compressedFile) {
        resolve(compressedFile);
        // resolve compresed file
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
