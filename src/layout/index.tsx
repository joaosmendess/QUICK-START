import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from '../components/Header';
import DrawerMenu from '../components/DrawerMenu';

interface LayoutProps {
  isAuthenticated: boolean;
  toggleDrawer: () => void;
  handleLogout: () => void;
  drawerOpen: boolean;
  setPageTitle: (title: string) => void;
  pageTitle: string; // Recebe o título da página
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isAuthenticated, toggleDrawer, handleLogout, drawerOpen, setPageTitle, pageTitle, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isAuthenticated && (
        <>
          <Header toggleDrawer={toggleDrawer} onLogout={handleLogout} drawerOpen={drawerOpen} pageTitle={pageTitle} />
          <DrawerMenu open={drawerOpen} onClose={toggleDrawer} toggleDrawer={toggleDrawer} setPageTitle={setPageTitle} />
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: isAuthenticated && !isMobile && drawerOpen ? '240px' : '0',
          transition: 'margin 0.3s',
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
