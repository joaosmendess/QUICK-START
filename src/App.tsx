import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Dashboard from './pages/Authenticated/Dashboard';
import Login from './pages/Unauthenticated/Login';
import ManageUser from './pages/Authenticated/User/ManageUser';
import ListUsers from './pages/Authenticated/User/ListUser';
import ManagePermissions from './pages/Authenticated/PermissionGroup/ManagePermisionGroups';
import ListPermissions from './pages/Authenticated/PermissionGroup/ListPermisionGroups';
import { globalStyles } from '../Styles/global';
import Header from './components/Header';
import DrawerMenu from './components/DrawerMenu';
import RouteGuard from './components/RouterGuard';
import Callback from './pages/Callback';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pageTitle, setPageTitle] = useState('Início');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  globalStyles();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      {isAuthenticated && (
        <>
          <Header pageTitle={pageTitle} toggleDrawer={toggleDrawer} />
          <DrawerMenu open={drawerOpen} onClose={toggleDrawer} setPageTitle={setPageTitle} />
        </>
      )}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path='/callback' element={<Callback/>} />
        
        <Route 
          path="/dashboard" 
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <Dashboard />
            </RouteGuard>
          } 
        />
        <Route 
          path="/gerenciar-usuario" 
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ManageUser />
            </RouteGuard>
          } 
        />
        <Route 
          path="/listar-usuario" 
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ListUsers />
            </RouteGuard>
          } 
        />
        <Route 
          path="/gerenciar-permissoes" 
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ManagePermissions />
            </RouteGuard>
          } 
        />
        <Route 
          path="/listar-permissoes" 
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ListPermissions />
            </RouteGuard>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
