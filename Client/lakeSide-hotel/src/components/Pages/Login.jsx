import axios from 'axios';
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const credentials = {
      email,
      password,
    };

    try {
      const response = await axios.post('/login', credentials);
      const token = response.data.token;

      // Save the token in local storage or state management (e.g., Redux)
      localStorage.setItem('token', token);

      setMessage('Login successful!');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setMessage(`Error: ${error.response.data.message || 'Invalid credentials'}`);
      } else {
        setMessage('An error occurred while processing your request. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
