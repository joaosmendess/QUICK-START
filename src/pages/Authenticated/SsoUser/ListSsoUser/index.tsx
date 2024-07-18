import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchUsers } from '../../../../services/userService';
import { containerStyles, listItemStyles, listTextStyles } from './styles';

const ListSsoUser: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<null | any>(null);

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    getUsers();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEdit = () => {
    // Adicionar lógica para editar usuário
    handleMenuClose();
  };

  const handleDelete = () => {
    // Adicionar lógica para deletar usuário
    handleMenuClose();
  };

  return (
    <Box sx={containerStyles}>
      <Toolbar />
      
      <List sx={{ width: '100%' }}>
        {users.map((user) => (
          <ListItem key={user.id} sx={listItemStyles}>
            <ListItemText primary={user.name} secondary={user.username} sx={listTextStyles} />
            <IconButton edge="end" onClick={(e) => handleMenuOpen(e, user)}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEdit}>Editar</MenuItem>
              <MenuItem onClick={handleDelete}>Deletar</MenuItem>
            </Menu>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListSsoUser;
