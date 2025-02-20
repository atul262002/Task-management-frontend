import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: 'user'
  });
  const [alert, setAlert] = useState(null);
  
  const { register, error, clearErrors } = useAuth();
  
  useEffect(() => {
    if (error) {
      setAlert(error);
      setTimeout(() => setAlert(null), 5000);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);
  
  const { name, email, password, password2, role } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please fill in all fields');
    } else if (password !== password2) {
      setAlert('Passwords do not match');
    } else {
      register({ name, email, password, role });
    }
  };
  
  return (
    <div className="auth-form">
      <h2>Account Registration</h2>
      {alert && <div className="alert alert-danger">{alert}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="role">Role</label>
          <select name="role" value={role} onChange={onChange}>
            <option value="user">Regular User</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;