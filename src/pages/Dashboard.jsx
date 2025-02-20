// import React from 'react';
import TaskList from '../components/task/TaskList';
import TaskForm from '../components/task/TaskForm';
import Sidebar from '../components/layout/Sidebar';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <Sidebar />
        </aside>
        
        <main className="dashboard-main">
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;