import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';

const TaskList = () => {
  const { tasks, getTasks, loading, filters, deleteTask, setCurrent } = useTask();
  const { user } = useAuth();

  useEffect(() => {
    getTasks(filters);
    // eslint-disable-next-line
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Done':
        return 'status-done';
      case 'In Progress':
        return 'status-progress';
      case 'To-Do':
        return 'status-todo';
      default:
        return '';
    }
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <div className="task-card-header">
                <h3>{task.title}</h3>
                <span className={`badge ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              
              <p className="task-description">{task.description}</p>
              
              <div className="task-meta">
                <span className={`status-badge ${getStatusClass(task.status)}`}>
                  {task.status}
                </span>
                <span className="assigned-to">
                  Assigned to: {task.assignedTo?.name || 'Unknown'}
                </span>
              </div>

              <div className="task-actions">
                <Link to={`/tasks/${task._id}`} className="btn btn-info btn-sm">
                  View
                </Link>
                <button
                  onClick={() => setCurrent(task)}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </button>
                {(user.role === 'admin' || task.createdBy === user._id) && (
                  <button
                    onClick={() => onDelete(task._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;