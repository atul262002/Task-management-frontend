import { useState, useEffect } from 'react';
import { useTask } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';

const TaskForm = () => {
  const { addTask, updateTask, current, clearCurrent } = useTask();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To-Do',
    priority: 'Medium',
    assignedTo: ''
  });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://task-management-backend-k96a.onrender.com/api/auth/all-user');
        const data = await response.json();
        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    if (current !== null) {
      setTask(current);
    } else {
      setTask({
        title: '',
        description: '',
        status: 'To-Do',
        priority: 'Medium',
        assignedTo: user ? user._id : ''
      });
    }
  }, [current, user]);

  const { title, description, status, priority, assignedTo } = task;

  const onChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (current === null) {
        await addTask(task);
      } else {
        await updateTask(task);
      }
      clearAll();
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <>
      <form onSubmit={onSubmit} className="task-form">
        <h2>{current ? 'Edit Task' : 'Add Task'}</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select 
            name="status" 
            value={status} 
            onChange={onChange}
            disabled={isSubmitting}
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select 
            name="priority" 
            value={priority} 
            onChange={onChange}
            disabled={isSubmitting}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        {user && user.role === 'admin' && (
          <div className="form-group">
            <label htmlFor="assignedTo">Assign To</label>
            <select 
              name="assignedTo" 
              value={assignedTo} 
              onChange={onChange}
              required
              disabled={isSubmitting}
            >
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-button-group">
          <button 
            type="submit" 
            className="btn btn-primary submit-button"
            disabled={isSubmitting}
          >
            {current ? 'Update Task' : 'Add Task'}
            {isSubmitting && <span className="loading-spinner" />}
          </button>
          {current && (
            <button
              type="button"
              className="btn btn-light"
              onClick={clearAll}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default TaskForm;