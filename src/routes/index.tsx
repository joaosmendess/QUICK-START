import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import RouteGuard from '../components/RouterGuard';
import NotFound from '../components/NotFound';

// Lazy imports
const Dashboard = lazy(() => import('../pages/Authenticated/Dashboard'));
const Login = lazy(() => import('../pages/Unauthenticated/Login'));
const ManageUser = lazy(() => import('../pages/Authenticated/User/ManageUser'));
const ListUsers = lazy(() => import('../pages/Authenticated/User/ListUser'));
const ManagePermissions = lazy(() => import('../pages/Authenticated/PermissionGroup/ManagePermisionGroups'));
const ListPermissions = lazy(() => import('../pages/Authenticated/PermissionGroup/ListPermisionGroups'));
const ManageApplication = lazy(() => import('../pages/Authenticated/ApplicationPermission/ManageApplication'));
const ListApplication = lazy(() => import('../pages/Authenticated/ApplicationPermission/ListApplication'));
const ManageModule = lazy(() => import('../pages/Authenticated/Modules/ManageModule'));
const ModuleList = lazy(() => import('../pages/Authenticated/Modules/ListModule'));
const ManageCompany = lazy(() => import('../pages/Authenticated/Company/ManageCompany'));
const ListCompany = lazy(() => import('../pages/Authenticated/Company/ListCompany'));
const ManageSsoUser = lazy(() => import('../pages/Authenticated/SsoUser/ManageSsoUser'));
const ListSsoUser = lazy(() => import('../pages/Authenticated/SsoUser/ListSsoUser'));
const Invitation = lazy(() => import('../pages/Authenticated/Invitation'));
const Callback = lazy(() => import('../pages/Callback'));

const AppRoutes: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/callback" element={<Callback />} />
      
      <Route path="/dashboard" element={<RouteGuard isAuthenticated={isAuthenticated}><Dashboard /></RouteGuard>} />
      <Route path="/gerenciar-usuario" element={<RouteGuard isAuthenticated={isAuthenticated}><ManageUser /></RouteGuard>} />
      <Route path="/gerenciar-usuario/:id" element={<RouteGuard isAuthenticated={isAuthenticated}><ManageUser /></RouteGuard>} />
      <Route path="/listar-usuarios" element={<RouteGuard isAuthenticated={isAuthenticated}><ListUsers /></RouteGuard>} />
      
      <Route path="/gerenciar-permissao" element={<RouteGuard isAuthenticated={isAuthenticated}><ManagePermissions /></RouteGuard>} />
      <Route path="/gerenciar-permissao/:id" element={<RouteGuard isAuthenticated={isAuthenticated}><ManagePermissions /></RouteGuard>} />
      <Route path="/listar-permissoes" element={<RouteGuard isAuthenticated={isAuthenticated}><ListPermissions /></RouteGuard>} />
      
      <Route path="/gerenciar-empresa" element={<RouteGuard isAuthenticated={isAuthenticated}><ManageCompany /></RouteGuard>} />
      <Route path="/gerenciar-empresa/:id" element={<RouteGuard isAuthenticated={isAuthenticated}><ManageCompany /></RouteGuard>} />
      <Route path="/listar-empresas" element={<RouteGuard isAuthenticated={isAuthenticated}><ListCompany /></RouteGuard>} />
      
      <Route path="/gerenciar-aplicacao" element={<RouteGuard isAuthenticated={isAuthenticated}><ManageApplication /></RouteGuard>} />
      <Route path="/gerenciar-aplicacao/:id" element={<RouteGuard isAuthenticated={isAuthenticated}><ManageApplication /></RouteGuard>} />
      <Route path="/listar-aplicacoes" element={<RouteGuard isAuthenticated={isAuthenticated}><ListApplication /></RouteGuard>} />
      
      <Route path="/gerenciar-modulo" element={<RouteGuard isAuthenticated={isAuthenticated}><ManageModule /></RouteGuard>} />
      <Route path="/gerenciar-modulo/:id" element={<RouteGuard isAuthenticated={isAuthenticated}><ManageModule /></RouteGuard>} />
      <Route path="/listar-modulos" element={<RouteGuard isAuthenticated={isAuthenticated}><ModuleList /></RouteGuard>} />
      
      <Route path="/gerenciar-usuario-sso" element={<RouteGuard isAuthenticated={isAuthenticated}><ManageSsoUser /></RouteGuard>} />
      <Route path="/gerenciar-usuario-sso/:id" element={<RouteGuard isAuthenticated={isAuthenticated}><ManageSsoUser /></RouteGuard>} />
      <Route path="/listar-usuarios-sso" element={<RouteGuard isAuthenticated={isAuthenticated}><ListSsoUser /></RouteGuard>} />
      
      <Route path="/convidar-usuario" element={<RouteGuard isAuthenticated={isAuthenticated}><Invitation /></RouteGuard>} />

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
