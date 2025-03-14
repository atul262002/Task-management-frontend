import api from '../services/api';

// Set JWT token in axios headers
const setAuthToken = (token) => {
  return new Promise((resolve) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
    resolve(); // Resolve once the token is set
  });
};

export default setAuthToken;