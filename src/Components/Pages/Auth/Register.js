import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

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
      const response = await axios.post('http://localhost:5000/api/user/register', formData);
      console.log("response", response)
      alert('Registration successful!');
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      navigate("/login")
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
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
        <button type="submit">Register</button>
      </form>
      <p>
       Already have an account? <Link to="/login">Please Login</Link>
      </p>
    </div>
  );
};

export default Register;
