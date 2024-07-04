import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import styles from './Sidebar.module.css';

function Sidebar({ isOpen }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <List component="nav">
        <ListItem button component={NavLink} to="/boxdesign" className={styles.navLink}>
          <ListItemText primary="Box Design" />
        </ListItem>
        <ListItem button component={NavLink} to="/corrugatedmachines" className={styles.navLink}>
          <ListItemText primary="Corrugated Machines" />
        </ListItem>
        <ListItem button component={NavLink} to="/conversioncost" className={styles.navLink}>
          <ListItemText primary="Conversion Cost" />
        </ListItem>
        <ListItem button component={NavLink} to="/printingcost" className={styles.navLink}>
          <ListItemText primary="Printing Cost" />
        </ListItem>
        <ListItem button component={NavLink} to="/employees" className={styles.navLink}>
          <ListItemText primary="Manage Employee" />
        </ListItem>
        <ListItem button component={NavLink} to="/customers" className={styles.navLink}>
          <ListItemText primary="Manage Customer" />
        </ListItem>
        <ListItem button component={NavLink} to="/customerdetails" className={styles.navLink}>
          <ListItemText primary="Customer Details" />
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
