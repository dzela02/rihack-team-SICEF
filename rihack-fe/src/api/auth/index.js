import httpClient from '../httpClient';

const authPath = (routePath) => `/auth/${routePath}`;

function login(userData) {
  return httpClient.post(authPath`login`, userData);
}

function register(userData) {
  return httpClient.post(authPath`register`, userData);
}

function forgotPassword(email) {
  return httpClient.post(authPath`forgot-password`, {
    email,
  });
}

function resetPassword(token, password) {
  return httpClient.post(`/auth/reset-password/${token}`, { password });
}

function changePassword(oldPassword, password) {
  return httpClient.post(authPath`change-password`, {
    oldPassword,
    password,
  });
}

function changeEmail(email) {
  return httpClient.post(authPath`change-email`, {
    email,
  });
}

export {
  login,
  register,
  forgotPassword,
  resetPassword,
  changePassword,
  changeEmail,
};
