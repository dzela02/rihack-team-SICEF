import Axios from 'axios';
import httpClient from '../httpClient';

const authPath = (routePath) => `/reports/${routePath}`;

function getAllReports() {
  return httpClient.get(authPath`back-office/reports`);
}

const reportsPath = (routePath) => `/reports/${routePath}`;

function addReport(description, longitude, latitude, imageUrl) {
  return httpClient.post(reportsPath`create-report`, {
    description,
    longitude,
    latitude,
    imageUrl,
  });
}

async function uploadImage(image) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'gglxyxfi');

  const res = await Axios.post(
    'http://api.cloudinary.com/v1_1/lagos/image/upload',
    formData
  );

  if (res?.data?.secure_url !== '') return res?.data?.secure_url;
}

export { addReport, uploadImage, getAllReports };
