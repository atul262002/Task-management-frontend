import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import taskService from "../services/taskService";
// import './TaskDetailUnique.css'; // Updated CSS import with unique class names

const TaskDetailUniquePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { setCurrent } = useTask();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await taskService.getTaskById(id);
        setTask(fetchedTask);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading)
    return <div className="task-detail-unique-loading">Loading...</div>;
  if (error)
    return <div className="task-detail-unique-error">Error: {error}</div>;
  if (!task)
    return <div className="task-detail-unique-error">Task not found</div>;

  const handleEdit = () => {
    setCurrent(task);
    navigate("/");
  };

  return (
    <div className="task-detail-unique">
      <h2 className="task-detail-unique-title">{task.title}</h2>

      <table className="task-detail-unique-table">
        <tbody>
          <tr>
            <td>
              <strong>Priority</strong>
            </td>
            <td>
              <span
                className={`task-detail-unique-priority priority-${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Status</strong>
            </td>
            <td>
              <span
                className={`task-detail-unique-status status-${task.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {task.status}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Description</strong>
            </td>
            <td>{task.description}</td>
          </tr>
          <tr>
            <td>
              <strong>Assigned To</strong>
            </td>
            <td>{task.assignedTo?.name}</td>
          </tr>
          <tr>
            <td>
              <strong>Created By</strong>
            </td>
            <td>{task.createdBy?.name}</td>
          </tr>
          <tr>
            <td>
              <strong>Created On</strong>
            </td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>

      {((!authLoading && user?.role === "admin") ||
        task?.assignedTo?._id === user?._id) && (
        <div className="task-detail-unique-actions">
          <button
            onClick={handleEdit}
            className="task-detail-unique-btn primary"
          >
            Edit Task
          </button>
          <button
            onClick={() => navigate("/")}
            className="task-detail-unique-btn light"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDetailUniquePage;
