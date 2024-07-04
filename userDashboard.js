import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from './side_nav';
import './user_dashboard.css'; // Import the CSS file for styling

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
        <nav>
            <SideNav />
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
        <div className="dashboard-container">
            <h2 className="dashboard-title">User Dashboard</h2>
        </div>
    </div>
  );
};

export default UserDashboard;
