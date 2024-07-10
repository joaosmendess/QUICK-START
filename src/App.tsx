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
import ManageApplication from './pages/Authenticated/ApplicationPermission/ManageApplication';
import ListApplication from './pages/Authenticated/ApplicationPermission/ListApplication';
import ManageModule from './pages/Authenticated/Modules/ManageModule';
import ModuleList from './pages/Authenticated/Modules/ListModule';
import ManageCompany from './pages/Authenticated/Company/ManageCompany';
import ListCompany from './pages/Authenticated/Company/ListCompany';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('Início');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  globalStyles();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userName');

    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Ou qualquer componente de carregamento que preferir
  }

  return (
    <Router>
      {isAuthenticated && (
        <>
          <Header pageTitle={pageTitle} toggleDrawer={toggleDrawer} onLogout={handleLogout} />
          <DrawerMenu open={drawerOpen} onClose={toggleDrawer} setPageTitle={setPageTitle} />
        </>
      )}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/callback" element={<Callback />} />
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
          path="/listar-usuarios"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ListUsers />
            </RouteGuard>
          }
        />
        <Route
          path="/gerenciar-permissao"
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
           <Route
          path="/gerenciar-empresa"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ManageCompany/>
            </RouteGuard>
          }
        />
   <Route
          path="/listar-empresas"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ListCompany />
            </RouteGuard>
          }
        />

        <Route
          path="/gerenciar-aplicacao"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ManageApplication />
            </RouteGuard>
          }
        />   <Route
        path="/listar-aplicacoes"
        element={
          <RouteGuard isAuthenticated={isAuthenticated}>
            <ListApplication />
          </RouteGuard>
        }
      />
         <Route
          path="/gerenciar-modulo"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ManageModule />
            </RouteGuard>
          }
        />
           <Route
          path="/listar-modulos"
          element={
            <RouteGuard isAuthenticated={isAuthenticated}>
              <ModuleList />
            </RouteGuard>
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;
