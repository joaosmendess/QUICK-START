import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import { User } from '../../types';
import UserRow from '../UserRow';

interface UserTableProps {
  users: User[];
  isMobile: boolean;
  loading: boolean;
  error: string | null;
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>, userName: string) => void;
  handleMenuClose: () => void;
  anchorEl: null | HTMLElement;
  selectedUser: null | string;
}

const UserTable: React.FC<UserTableProps> = ({ users, isMobile, loading, error, handleMenuClick, handleMenuClose, anchorEl, selectedUser }) => {
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
                    {!isMobile && <TableCell>id</TableCell>}
                    <TableCell>Status</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <UserRow
                      key={user.userName}
                      user={user}
                      isMobile={isMobile}
                      handleMenuClick={handleMenuClick}
                      handleMenuClose={handleMenuClose}
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
