import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { globalStyles } from './Styles/global';
import AppRoutes from './routes';
import Layout from './layout/index';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated, isLoading, handleLogout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const storedTitle = localStorage.getItem('pageTitle');
    if (storedTitle) {
      setPageTitle(storedTitle);
    }
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  globalStyles(); // Aplica os estilos globais

  if (isLoading) {
    return <div>Loading...</div>; // Componente de carregamento
  }

  return (
    <Router>
      <Layout 
        isAuthenticated={isAuthenticated} 
        toggleDrawer={toggleDrawer} 
        handleLogout={handleLogout} 
        drawerOpen={drawerOpen}
        setPageTitle={setPageTitle}
        pageTitle={pageTitle} // Passa o título da página para o Layout
      >
        <AppRoutes isAuthenticated={isAuthenticated} />
      </Layout>
    </Router>
  );
};

export default App;
