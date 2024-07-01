import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItemText, ListItemIcon, ListItemButton, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const DrawerMenu: React.FC<{ open: boolean; onClose: () => void; setPageTitle: (title: string) => void }> = ({ open, onClose, setPageTitle }) => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [groupMenuOpen, setGroupMenuOpen] = useState(false);

  const handleUserMenuClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleGroupMenuClick = () => {
    setGroupMenuOpen(!groupMenuOpen);
  };



  const handleNavigation = (path: string, title: string) => {
    navigate(path);
    setPageTitle(title);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItemButton onClick={() => handleNavigation('/dashboard', 'Início')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Início" />
        </ListItemButton>
        <ListItemButton onClick={handleUserMenuClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Usuário" />
          {userMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={userMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => handleNavigation('/gerenciar-usuario', 'Gerenciar Usuário')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar usuário" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigation('/listar-usuario', 'Listar Usuários')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Listar usuários" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleGroupMenuClick}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Grupo de permissão" />
          {groupMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={groupMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => handleNavigation('/gerenciar-permissoes', 'Gerenciar Permissões')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Gerenciar grupo de permissão" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigation('/listar-permissoes', 'Listar Permissões')} style={{ paddingLeft: 32 }}>
              <ListItemText primary="Listar grupos de permissões" />
            </ListItemButton>
          </List>
        </Collapse>
        
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
