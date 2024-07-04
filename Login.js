import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import "./signup.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [f_name, setf_name] = useState('');
  const [l_name, setl_name] = useState('');
  const [address, setaddress] = useState('');
  const [retypePassword, setretypePassword] = useState('');
  const [adminKey, setadminKey] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8087/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); // Store the role
      if (response.data.role === 'admin') {
        navigate('/n_dashboard');
      } else {
        navigate('/userDashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid credentials');
      } else if (error.response && error.response.status === 404) {
        alert('Invalid Username');
      } else {
        alert('An error occurred, please try later');
        console.error('Error during login:', error);
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      alert("Passwords don't match");
      return;
    } else {
      try {
        await axios.post('http://localhost:8087/signup', { username, password, f_name, l_name, address, adminKey });
        alert('Signup successful! Please login.');
        setIsSignup(false);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert('User already exists');
        } else if (error.response && error.response.status === 401) {
          alert('Invalid Admin Key');
        } else if (error.response && error.response.status === 500) {
          alert('Error registering the user');
        } else {
          console.error('Error during signup:', error);
        }
      }
    }
  };

  return (
    <div className={isSignup ? 'signup-container' : 'login-container'}>
      {isSignup ? (
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <div className="input-container">
            <input type="text" name="firstName" value={f_name} onChange={(e) => setf_name(e.target.value)} required />
            <label>First Name</label>
          </div>
          <div className="input-container">
            <input type="text" name="lastName" value={l_name} onChange={(e) => setl_name(e.target.value)} required />
            <label>Last Name</label>
          </div>
          <div className="input-container">
            <input type="text" name="address" value={address} onChange={(e) => setaddress(e.target.value)} required />
            <label>Address</label>
          </div>
          <div className="input-container">
            <input type="email" name="email" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <label>Email</label>
          </div>
          <div className="input-container">
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label>Password</label>
          </div>
          <div className="input-container">
            <input type="password" name="retypePassword" value={retypePassword} onChange={(e) => setretypePassword(e.target.value)} required />
            <label>Retype Password</label>
          </div>
          <div className="input-container">
            <input type="password" name="adminKey" value={adminKey} onChange={(e) => setadminKey(e.target.value)} />
            <label>Admin Key (For Admins Only)</label>
          </div>
          <button type="submit">SIGN UP</button>
          <p>Already have an account? <button type="button" onClick={() => setIsSignup(false)}>Log In</button></p>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit">Login</button>
          <p>Don't have an account? <button type="button" onClick={() => setIsSignup(true)}>Signup</button></p>
        </form>
      )}
    </div>
  );
};

export default Login;
