import React from 'react';
import { TableRow, TableCell, Box, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { User } from '../../types';

interface UserRowProps {
  user: User;
  isMobile: boolean;
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>, userName: string) => void;
  handleMenuClose: () => void;
  anchorEl: null | HTMLElement;
  selectedUser: null | string;
}

const UserRow: React.FC<UserRowProps> = ({ user, isMobile, handleMenuClick, handleMenuClose, anchorEl, selectedUser }) => {
  return (
    <TableRow key={user.userName}>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 1 }}>{user.name.charAt(0)}</Avatar>
          {user.name}
        </Box>
      </TableCell>
      <TableCell>{user.userName}</TableCell>
      {!isMobile && <TableCell>{user.id}</TableCell>}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            marginRight: '8px',
            backgroundColor: user.status && user.status.toLowerCase() === 'ativo' ? 'green' : 'red',
          }} />
          {user.status}
        </Box>
      </TableCell>
      <TableCell>
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
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
