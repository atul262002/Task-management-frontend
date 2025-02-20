// import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Log in to manage your tasks</p>
        </div>
        
        <Login />
        
        <div className="auth-footer">
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/register" className="auth-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
      
      <div className="auth-info">
        <h2>Task Management System</h2>
        <ul>
          <li>Create and manage tasks</li>
          <li>Track progress and priorities</li>
          <li>Collaborate with team members</li>
          <li>Stay organized and productive</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;