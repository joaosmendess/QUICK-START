import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Typography, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@stitches/react';
import logo from '../../assets/logo-white.png';

const StyledAppBar = styled(AppBar, {
  backgroundColor: '#ffffff',
  color: '#000000',
});

const Header: React.FC<{ pageTitle: string; toggleDrawer: () => void }> = ({ pageTitle, toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Remover todas as chaves relacionadas ao usuário do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userName');
    // Redirecionar para a página inicial
    window.location.href = '/';
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="SSO" style={{ height: 40 }} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            {pageTitle}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar src="/path-to-avatar.jpg" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
