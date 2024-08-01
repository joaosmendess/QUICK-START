import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Typography, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo 1.png';

interface HeaderProps {
  pageTitle: string;
  toggleDrawer: () => void;
  drawerOpen: boolean;
  onLogout: () => void;
}

const drawerWidth = 240;

const Header: React.FC<HeaderProps> = ({ pageTitle, toggleDrawer, drawerOpen, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#ffffff',
        color: '#000000',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
        width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
        ml: drawerOpen ? `${drawerWidth}px` : '0',
        transition: 'width 0.3s, margin-left 0.3s',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', position: 'relative', display: 'flex' }}>
        
        {/* Esquerda - Menu Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ color: '#000000', fontWeight: 'bold', ml: 2 }}>
            {pageTitle}
          </Typography>
        </Box>

        {/* Centro - Logo */}
        <Box sx={{ 
          position: { xs: 'relative', sm: 'absolute' }, 
          left: { sm: '50%' }, 
          transform: { sm: 'translateX(-50%)' },
          display: 'flex',
          justifyContent: 'center',
          flexGrow: 1,
          order: { xs: -1, sm:0 }  // Move logo para o topo no mobile
        }}>
          <img src={logo} alt="logo OFM" style={{ height: '30px', display: 'block' }} />
        </Box>

        {/* Direita - Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar src="/path-to-avatar.jpg" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
