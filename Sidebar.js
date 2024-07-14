import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import BoxIcon from '@mui/icons-material/Inbox';
import MachineIcon from '@mui/icons-material/Build';
import CostIcon from '@mui/icons-material/AttachMoney';
import PrintIcon from '@mui/icons-material/Print';
import { TextField } from '@mui/material';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #343a40;
  color: white;
  min-height: 100vh;
  padding: 20px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
`;

const NavLink = styled(Link)`
  display: block;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  text-decoration: none;
  color: white;

  &:hover {
    background-color: #495057;
  }
`;

const menuItems = [
  // { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Manage Customers', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Customer Details', icon: <PeopleIcon />, path: '/customerdetails' }, // Added Customer Details link
  { text: 'Manage Employees', icon: <BusinessIcon />, path: '/employees' },
  { text: 'Box Design', icon: <BoxIcon />, path: '/boxdesign' },
  { text: 'Corrugated Machines', icon: <MachineIcon />, path: '/corrugatedmachines' },
  { text: 'Conversion Cost', icon: <CostIcon />, path: '/conversioncost' },
  { text: 'Printing Cost', icon: <PrintIcon />, path: '/printingcost' }
];

function Sidebar({ isOpen }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenuItems = menuItems.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarContainer isOpen={isOpen}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredMenuItems.map((item) => (
        <NavLink to={item.path} key={item.text}>
          {item.icon}
          {item.text}
        </NavLink>
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;
