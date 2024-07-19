import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItemText, ListItemIcon, ListItemButton, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import AppsIcon from '@mui/icons-material/Apps';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const DrawerMenu: React.FC<{ open: boolean; onClose: () => void; setPageTitle: (title: string) => void }> = ({ open, onClose, setPageTitle }) => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [groupMenuOpen, setGroupMenuOpen] = useState(false);
  const [empresaMenuOpen, setEmpresaMenuOpen] = useState(false);
  const [aplicacoesMenuOpen, setAplicacoesMenuOpen] = useState(false);
  const [modulosMenuOpen, setModulosMenuOpen] = useState(false);
  const [ssoUserMenuOpen, setSsoUserMenuOpen] = useState(false);

  const handleUserMenuClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleGroupMenuClick = () => {
    setGroupMenuOpen(!groupMenuOpen);
  };

  const handleEmpresaMenuClick = () => {
    setEmpresaMenuOpen(!empresaMenuOpen);
  };

  const handleAplicacoesMenuClick = () => {
    setAplicacoesMenuOpen(!aplicacoesMenuOpen);
  };

  const handleModulosMenuClick = () => {
    setModulosMenuOpen(!modulosMenuOpen);
  };

  const handleSsoUserMenuClick = () => {
    setSsoUserMenuOpen(!ssoUserMenuOpen);
  };

  const handleNavigation = (path: string, title: string) => {
    navigate(path);
    setPageTitle(title);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItemButton id="menu-dashboard" onClick={() => handleNavigation('/dashboard', 'Início')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Início" />
        </ListItemButton>
        
        <ListItemButton id="menu-user" onClick={handleUserMenuClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Usuário" />
          {userMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={userMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton id="menu-manage-user" onClick={() => handleNavigation('/gerenciar-usuario', 'Gerenciar usuário')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar usuário" />
            </ListItemButton>
            <ListItemButton id="menu-list-users" onClick={() => handleNavigation('/listar-usuarios', 'Lista de usuários')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Lista de usuários" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton id="menu-permission-groups" onClick={handleGroupMenuClick}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Grupo de permissão" />
          {groupMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={groupMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton id="menu-manage-permission" onClick={() => handleNavigation('/gerenciar-permissao', 'Gerenciar grupo de permissão')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar grupo de permissão" />
            </ListItemButton>
            <ListItemButton id="menu-list-permissions" onClick={() => handleNavigation('/listar-permissoes', 'Lista de grupos de permissões')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Lista de grupos de permissões" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton id="menu-company" onClick={handleEmpresaMenuClick}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Empresa" />
          {empresaMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={empresaMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton id="menu-manage-company" onClick={() => handleNavigation('/gerenciar-empresa', 'Gerenciar empresa')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar empresa" />
            </ListItemButton>
            <ListItemButton id="menu-list-companies" onClick={() => handleNavigation('/listar-empresas', 'Lista de empresas')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Lista de empresas" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton id="menu-applications" onClick={handleAplicacoesMenuClick}>
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Aplicações" />
          {aplicacoesMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={aplicacoesMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton id="menu-manage-application" onClick={() => handleNavigation('/gerenciar-aplicacao', 'Gerenciar aplicação')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar aplicação" />
            </ListItemButton>
            <ListItemButton id="menu-list-applications" onClick={() => handleNavigation('/listar-aplicacoes', 'Lista de aplicações')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Lista de aplicações" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton id="menu-modules" onClick={handleModulosMenuClick}>
          <ListItemIcon>
            <ViewModuleIcon />
          </ListItemIcon>
          <ListItemText primary="Módulos" />
          {modulosMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={modulosMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton id="menu-manage-module" onClick={() => handleNavigation('/gerenciar-modulo', 'Gerenciar Módulo')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar módulo" />
            </ListItemButton>
            <ListItemButton id="menu-list-modules" onClick={() => handleNavigation('/listar-modulos', 'Listar Módulos')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Listar de módulos" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton id="menu-sso-user" onClick={handleSsoUserMenuClick}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuário SSO" />
          {ssoUserMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={ssoUserMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton id="menu-manage-sso-user" onClick={() => handleNavigation('/gerenciar-usuario-sso', 'Gerenciar usuário do SSO')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar Usuário do SSO" />
            </ListItemButton>
            <ListItemButton id="menu-list-sso-users" onClick={() => handleNavigation('/listar-usuarios-sso', 'Lista de usuários do SSO')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Lista de usuários do SSO" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
