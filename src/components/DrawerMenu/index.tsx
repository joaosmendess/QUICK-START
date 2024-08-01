import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItemText, ListItemIcon, ListItemButton, Collapse, useMediaQuery, useTheme } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { navigationItems } from './utils/navigationItems';
import { NavigationItem } from './types';

interface DrawerMenuProps {
  open: boolean;
  onClose: () => void;
  toggleDrawer: () => void;
  setPageTitle: (title: string) => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose, setPageTitle }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});

  const handleMenuClick = (label: string) => {
    setOpenMenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavigation = (path: string, title: string) => {
    navigate(path);
    setPageTitle(title);
    localStorage.setItem('pageTitle', title);
    if (isMobile) {
      onClose(); // Fecha o Drawer no mobile após a navegação
    }
  };

  const renderMenuItems = (items: NavigationItem[]) =>
    items.map((item) => (
      <React.Fragment key={item.label}>
        <ListItemButton id={item.id} onClick={() => item.path ? handleNavigation(item.path, item.label) : handleMenuClick(item.label)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
          {item.subItems ? openMenu[item.label] ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItemButton>
        {item.subItems && (
          <Collapse in={openMenu[item.label]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem) => (
                <ListItemButton key={subItem.label} id={subItem.id} sx={{ pl: 4 }} onClick={() => handleNavigation(subItem.path, subItem.label)}>
                  <ListItemText primary={subItem.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant={isMobile ? 'temporary' : 'persistent'}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#202020',
          color: '#ffffff',
        },
      }}
    >
      <List>
        {renderMenuItems(navigationItems)}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
