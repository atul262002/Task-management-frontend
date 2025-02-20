// import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../components/auth/Register';

const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join us to start managing your tasks effectively</p>
        </div>
        
        <Register />
        
        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
      
      <div className="auth-info">
        <h2>Why Join Us?</h2>
        <ul>
          <li>Easy task organization and management</li>
          <li>Priority-based task scheduling</li>
          <li>Team collaboration features</li>
          <li>Progress tracking and reporting</li>
        </ul>
      </div>
    </div>
  );
};

export default RegisterPage;