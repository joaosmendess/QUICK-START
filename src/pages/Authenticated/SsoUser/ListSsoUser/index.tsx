import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../../../services/userService';
import { User } from '../../../../types';
import ListItemWithMenu from '../../../../components/ListItemWithMenu';

const ListContainer = styled(Container, {
  marginTop: '20px',
});

const ListSsoUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        setError('Erro ao buscar usuários');
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  const handleEdit = (user: User) => {
    navigate(`/gerenciar-usuario-sso/${user.id}`);
  };

  const handleDelete = async (user: User) => {
    if (user.id !== undefined) {
      try {
        await deleteUser(user.id);
        setUsers(users.filter(u => u.id !== user.id));
      } catch (error) {
        setError('Erro ao excluir usuário');
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Toolbar />
      <ListContainer maxWidth="sm">
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        ) : (
          filteredUsers.map((user) => (
            <ListItemWithMenu
              key={user.id}
              item={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
              renderItemDetails={(usr) => (
                <>
                  <Typography variant="h6">{usr.name}</Typography>
                  <Typography variant="body2">{usr.username}</Typography>
                </>
              )}
            />
          ))
        )}
      </ListContainer>
    </div>
  );
};

export default ListSsoUser;
