import  { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskDetailPage from './pages/TaskDetailPage';
import Header from './components/layout/Header';
import './App.css';
import setAuthToken from './utils/setAuthToken';

// Check if token in localStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const { loadUser, isAuthenticated } = useAuth();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
          <Route path="/tasks/:id" element={isAuthenticated ? <TaskDetailPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;