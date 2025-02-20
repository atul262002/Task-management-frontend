import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState(null);
  
  const { login, error, clearErrors } = useAuth();
  
  useEffect(() => {
    if (error) {
      setAlert(error);
      setTimeout(() => setAlert(null), 5000);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);
  
  const { email, password } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields');
    } else {
      login({ email, password });
    }
  };
  
  return (
    <div className="auth-form">
      <h2>Account Login</h2>
      {alert && <div className="alert alert-danger">{alert}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;