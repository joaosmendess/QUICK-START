import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import { User } from '../../../types';
import UserRow from '../UserRow';

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>, userName: string) => void;
  handleMenuClose: () => void;
  handleEditClick: (user: User) => void;
  anchorEl: null | HTMLElement;
  selectedUser: null | string;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading, error, handleMenuClick, handleMenuClose, handleEditClick, anchorEl, selectedUser }) => {
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Typography variant="body1" color="error">{error}</Typography>}
          {users.length === 0 ? (
            <Typography variant="body1" align="center">
              Usuário não encontrado
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <UserRow
                      key={user.userName}
                      user={user}
                      handleMenuClick={handleMenuClick}
                      handleMenuClose={handleMenuClose}
                      handleEditClick={() => handleEditClick(user)}
                      anchorEl={anchorEl}
                      selectedUser={selectedUser}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
};

export default UserTable;
