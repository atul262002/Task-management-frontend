import { useState } from 'react';
import TaskList from '../components/task/TaskList';
import TaskForm from '../components/task/TaskForm';
import Sidebar from '../components/layout/Sidebar';

const Dashboard = () => {
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);

  const toggleTaskForm = () => {
    setIsTaskFormVisible((prev) => !prev);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <Sidebar onToggleTaskForm={toggleTaskForm} isTaskFormVisible={isTaskFormVisible} />
        </aside>

        <main className="dashboard-main">
          {isTaskFormVisible && <TaskForm />}
          <TaskList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
