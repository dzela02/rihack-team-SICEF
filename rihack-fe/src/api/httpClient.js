import Axios from 'axios';
import credentialsService from '../services/credentialsService';

const httpClient = Axios.create({
  baseURL: `http://172.20.10.7:3005/`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Headers': 'content-type',
  },
});

httpClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    //If the header does not contain the token and the url not public, redirect to login

    const { token } = credentialsService;
    if (token && config.method !== 'OPTIONS') {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(null, (error) => {
  if (error.response && [401, 403].includes(error.response.status)) {
    console.error(error.response?.data?.message);
    credentialsService.removeAuthBody();
    window.location.pathname = '';
  }
  return Promise.reject(error);
});

export default httpClient;
