import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-grow-1">
        <Topbar toggleSidebar={toggleSidebar} />
        <div className={styles.dashboard}>
          <h1 className={styles.header}>Admin Dashboard</h1>
          <p className={styles.text}>Welcome to the Admin Dashboard. Use the sidebar to navigate to different sections.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;