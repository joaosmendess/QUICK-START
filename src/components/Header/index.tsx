import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Typography, Menu, MenuItem, Box, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
;
import logo from '../../assets/logo 1.png'

interface HeaderProps {
  pageTitle: string;
  toggleDrawer: () => void;
  drawerOpen: boolean; // Adicionando o estado do Drawer como uma prop
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
        width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%', // Ajusta a largura conforme o estado do Drawer
        ml: drawerOpen ? `${drawerWidth}px` : '0', // Adiciona margem esquerda apenas quando o Drawer estiver aberto
        transition: 'width 0.3s, margin-left 0.3s',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center',}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          

          
          <Typography variant="h6" sx={{  color: '#000000', fontWeight: 'bold' }}>
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <img src={logo} alt="logo OFM" style={{ height: '30px', display: 'block' }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
         
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
