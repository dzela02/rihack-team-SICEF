import { s3 } from "../../config";
import httpClient from "../httpClient";

const authPath = (routePath) => `/reports/${routePath}`;

function getAllReports() {
  return httpClient.get(authPath`back-office/reports`);
}

const reportsPath = (routePath) => `/reports/${routePath}`;

function addReport(description, long, lat, imageUrl) {
  return httpClient.post(reportsPath`create-report`, {
    description,
    location: { long, lat },
    imageUrl,
  });
}

async function uploadImage(image) {
  const uploadedImage = await s3.upload({
    ContentType: "multipart/form-data",
    Bucket: "ecorijeka",
    Key: `test`,
    Body: image.path,
  });

  return uploadedImage.Location;
}

export { addReport, uploadImage, getAllReports };
