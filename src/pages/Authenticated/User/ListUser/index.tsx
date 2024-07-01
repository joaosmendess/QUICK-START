import React, { useState, useEffect } from 'react';
import { styled } from '../../../../stitches.config';
import { TextField, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Menu, MenuItem, IconButton, CircularProgress, Toolbar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ErrorMessage from '../../../../components/Messages/ErrorMessage';

const UserListContainer = styled(Box, {
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '1rem',
});

const StatusDot = styled(Box, {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  marginLeft: 'auto',
  variants: {
    status: {
      ativo: { backgroundColor: 'green' },
      inativo: { backgroundColor: 'red' },
    },
  },
});

// Mock data for users
const mockUsers = [
  { name: 'Alice Silva', userName: 'alice.silva', status: 'ativo' },
  { name: 'Bruno Souza', userName: 'bruno.souza', status: 'inativo' },
  { name: 'Carla Pereira', userName: 'carla.pereira', status: 'ativo' },
  // Add more mock users as needed
];

const ListUsers: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<null | string>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [loading, ] = useState(false);
  const [error, ] = useState<string | null>(null);

  useEffect(() => {
    setFilteredUsers(
      mockUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, userName: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Toolbar /> 
      <UserListContainer>
        <TextField
          label="Pesquise por nome ou usuário"
          variant="outlined"
          type="search"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {error && <ErrorMessage message={error} />}
            {filteredUsers.length === 0 ? (
              <Typography variant="body1" align="center">
                Usuário não encontrado
              </Typography>
            ) : (
              <List>
                {filteredUsers.map((user) => (
                  <ListItem key={user.userName}>
                    <ListItemAvatar>
                      <Avatar>
                        {user.name.charAt(0)} 
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.userName} />
                    <StatusDot status={user.status && user.status.toLowerCase() === 'ativo' ? 'ativo' : 'inativo'} />
                    <IconButton onClick={(event) => handleMenuClick(event, user.userName)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedUser === user.userName}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>Editar</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Excluir</MenuItem>
                    </Menu>
                  </ListItem>
                ))}
              </List>
            )}
          </>
        )}
      </UserListContainer>
    </>
  );
};

export default ListUsers;
