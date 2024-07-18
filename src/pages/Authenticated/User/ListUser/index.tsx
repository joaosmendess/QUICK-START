import React, { useState, useEffect } from 'react';
import {
  Box,
  Toolbar,
  SelectChangeEvent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem
} from '@mui/material';
import { getUsers, updateUsers } from '../../../../services/auth';
import { User } from '../../../../types';
import HeaderTable from '../../../../components/HeaderTable';
import UserTable from '../../../../components/Table/UserTable';
import Success from '../../../../components/Messages/SuccessMessage';

const ListUsers: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<null | string>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [editUser, setEditUser] = useState<null | User>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        setError('Erro ao buscar lista de usuários');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let sortedUsers = [...users];
    if (sortBy === 'newest') {
      sortedUsers = sortedUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'oldest') {
      sortedUsers = sortedUsers.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortBy === 'name') {
      sortedUsers = sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredUsers(
      sortedUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users, sortBy]);

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

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handleEditClick = (user: User) => {
    // Certifique-se de que companyId é definido
    const companyId = user.companyId || 0; // Defina um valor padrão se necessário
  
    setEditUser({
      ...user,
      invitationEmail: user.invitationEmail || '',
      companyId: companyId, // Certifique-se de que companyId é passado corretamente
      status: user.status || 'Ativo'
    });
  };
  const handleEditClose = () => {
    setEditUser(null);
  };

  const handleEditSave = async () => {
    if (editUser) {
      try {
        const updatedUser = await updateUsers(
          editUser.id,
          editUser.name,
          editUser.username,
          editUser.status,
          editUser.invitationEmail,
          editUser.companyId
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setSuccessMessage('Usuário atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar usuário', error);
      } finally {
        setEditUser(null); // Limpar o estado de editUser após salvar ou falhar
      }
    } else {
      console.error('Nenhum usuário selecionado para edição');
    }
  };
  

  return (
    <>
      <Toolbar />
      <Box
        sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '1rem' }}
      >
        {successMessage && <Success message={successMessage} />}
        <HeaderTable
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          sortBy={sortBy}
          handleSortChange={handleSortChange}
        />
        <UserTable
          users={filteredUsers}
          loading={loading}
          error={error}
          handleMenuClick={handleMenuClick}
          handleMenuClose={handleMenuClose}
          anchorEl={anchorEl}
          selectedUser={selectedUser}
          setUsers={setUsers}
          handleEditClick={handleEditClick}
        />
      </Box>

      {editUser && (
        <Dialog open={Boolean(editUser)} onClose={handleEditClose}>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Faça as alterações necessárias nos campos abaixo.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Nome"
              fullWidth
              value={editUser.name || ''}
              id="input-name"
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Usuário"
              fullWidth
              value={editUser.username || ''}
              id="input-username"
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Email de Convite"
              fullWidth
              value={editUser.invitationEmail || ''}
              id="input-email"
              onChange={(e) =>
                setEditUser({ ...editUser, invitationEmail: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="ID da Empresa"
              fullWidth
              value={editUser.companyId}
              id="input-company"
              onChange={(e) =>
                setEditUser({ ...editUser, companyId: parseInt(e.target.value) })
              }
            />
            <Select
              margin="dense"
              label="Status"
              fullWidth
              value={editUser.status || 'Ativo'}
              id="input-status"
              onChange={(e) =>
                setEditUser({ ...editUser, status: e.target.value })
              }
            >
              <MenuItem value="Ativo">Ativo</MenuItem>
              <MenuItem value="Inativo">Inativo</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} id="button-close-modal">
              Cancelar
            </Button>
            <Button onClick={handleEditSave} id="button-save-edit-user">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ListUsers;
