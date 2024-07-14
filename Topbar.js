import React from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';

const AppBar = styled.div`
  background-color: #1976d2;
  box-shadow: 0 4px 2px -2px gray;
  padding: 16px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Typography = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;

function Topbar({ toggleSidebar }) {
  const handleLogout = () => {
    // Placeholder for actual logout functionality
    alert('Logged out');
  };

  return (
    <AppBar>
      <Toolbar>
        <IconButton aria-label="menu" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography>ADMIN DASHBOARD</Typography>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
