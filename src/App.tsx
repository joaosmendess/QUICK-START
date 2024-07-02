import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
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
import CallbackPage from './pages/Callback';
import { AuthProvider, useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const [pageTitle, setPageTitle] = useState('Início');
  const [drawerOpen, setDrawerOpen] = useState(false);

  globalStyles();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <AppContent pageTitle={pageTitle} setPageTitle={setPageTitle} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </Router>
  );
};

interface AppContentProps {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

const AppContent: React.FC<AppContentProps> = ({ pageTitle, setPageTitle, drawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route 
          path="/dashboard" 
          element={
            <RouteGuard>
              <Dashboard />
            </RouteGuard>
          } 
        />
        <Route 
          path="/gerenciar-usuario" 
          element={
            <RouteGuard>
              <ManageUser />
            </RouteGuard>
          } 
        />
        <Route 
          path="/listar-usuario" 
          element={
            <RouteGuard>
              <ListUsers />
            </RouteGuard>
          } 
        />
        <Route 
          path="/gerenciar-permissoes" 
          element={
            <RouteGuard>
              <ManagePermissions />
            </RouteGuard>
          } 
        />
        <Route 
          path="/listar-permissoes" 
          element={
            <RouteGuard>
              <ListPermissions />
            </RouteGuard>
          } 
        />
      </Routes>
      <AuthConsumer>
        {({ isAuthenticated }) => (
          isAuthenticated && (
            <>
              <Header pageTitle={pageTitle} toggleDrawer={toggleDrawer} />
              <DrawerMenu open={drawerOpen} onClose={toggleDrawer} setPageTitle={setPageTitle} />
            </>
          )
        )}
      </AuthConsumer>
    </AuthProvider>
  );
};

const AuthConsumer: React.FC<{ children: (auth: { isAuthenticated: boolean }) => React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  return <>{children(auth)}</>;
};

export default App;
