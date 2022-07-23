const cloudinary = require("cloudinary").v2;
const env = require("../bin/env");

const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", env.CLOUDINARY_UPLOAD_PRESET);

  fetch(env.CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.secure_url !== "") {
        const uploadedFileUrl = data.secure_url;
        return uploadedFileUrl;
      }
    })
    .catch((err) => console.error(err));
};

export default uploadImage;
