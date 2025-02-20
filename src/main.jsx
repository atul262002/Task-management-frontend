// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
