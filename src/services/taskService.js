import api from './api';

const taskService = {
  // Get all tasks with optional filtering
  getTasks: async (filters = {}) => {
    const { status, priority } = filters;
    let url = '/tasks';
    
    // Add query parameters if filters are set
    if (status || priority) {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (priority) params.append('priority', priority);
      url += `?${params.toString()}`;
    }
    
    const response = await api.get(url);
    return response.data;
  },
  
  // Get task by ID
  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
  
  // Create new task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },
  
  // Update task
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },
  
  // Delete task
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
    return id;
  }
};

export default taskService;
