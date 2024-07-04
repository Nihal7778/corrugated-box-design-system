import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './side_nav.css';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

const SideNav = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleNavigation = (text) => {
    if (text === 'System Designed Compression Strength') {
      navigate('/customer_details');
    }
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 250,
        backgroundColor: 'black', // Background color of the sidebar
        color: 'white', // Text color inside the sidebar
        height: '100%', // Adjust height as needed
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          'Board Bursting strength',
          'Board ECT',
          'Box Compression Strength',
          'System Designed Compression Strength',
          'Reference Box with each ply detail.',
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} primaryTypographyProps={{ style: { color: 'white' } }} /> {/* Ensure text color is white */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment key="left">
        <MenuIcon
          className="menu-icon"
          onClick={toggleDrawer('left', true)}
        />
        <SwipeableDrawer
          anchor="left"
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {list('left')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default SideNav;
