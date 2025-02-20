import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a response interceptor to handle errors
api.interceptors.response.use(
  response => response.data,
  error => {
    const message = 
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      'Something went wrong';
    
    return Promise.reject(new Error(message));
  }
);

export default api;