import api from './api';

const authService = {
  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.user;
  },
  
  // Login user
  login: async (userData) => {
    const response = await api.post('/auth/login', userData);
    return response.user;
  },
  
  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.user;
  }
};

export default authService;
