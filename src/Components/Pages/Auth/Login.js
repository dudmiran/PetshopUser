import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {  // Accept the onLogin prop
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const url = 'http://localhost:5000'; // Base URL for your API
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/login`, formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userid',response.data.userId)
        alert("login success")
        console.log("userId", response.data)
        navigate("/")

      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Please register</Link>
      </p>
    </div>
  );
};

export default Login;
