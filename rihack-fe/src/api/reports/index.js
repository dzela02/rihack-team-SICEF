import httpClient from '../httpClient';

const authPath = (routePath) => `/reports/${routePath}`;

function getAllReports() {
  return httpClient.get(authPath`back-office/reports`);
}

function getUserReports(userId) {
  return httpClient.get(authPath`get-user-reports`, userId);
}

const reportsPath = (routePath) => `/reports/${routePath}`;

function addReport(description, long, lat, image) {
  return httpClient.post(reportsPath`create-report`, {
    description,
    location: { lat, long },
    image,
  });
}

function updateReportStatus(reportId, status, points) {
  return httpClient.patch(`/reports/back-office/changeStatus/${reportId}`, {
    status,
    points,
  });
}

export { addReport, getAllReports, getUserReports, updateReportStatus };
