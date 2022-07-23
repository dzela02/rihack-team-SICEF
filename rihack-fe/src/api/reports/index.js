import httpClient from '../httpClient';

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

export { addReport, getAllReports };
