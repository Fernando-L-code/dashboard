import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = ({ onLogout }) => {

  const handleLogout = () => {
    onLogout();
  };

  return (
    <AppBar position="static">
      <Toolbar style={{  display: 'flex',
    justifyContent: 'flex-end',}}>
        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;