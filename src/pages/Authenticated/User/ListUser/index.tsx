import React, { useState, useEffect } from 'react';
import {
  Box,
  Toolbar,
  CircularProgress,
  SelectChangeEvent,
  Container,
} from '@mui/material';
import { fetchUsers, deleteUser } from '../../../../services/userService';
import { User } from '../../../../types';
import HeaderTable from '../../../../components/HeaderTable';
import Success from '../../../../components/Messages/SuccessMessage';
import Error from '../../../../components/Messages/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import GenericTable from '../../../../components/Table/GenericTable';
import { styled } from '@stitches/react';
const ListContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '1rem',
  '@media (max-width: 600px)': {
    padding: '0.5rem',
  },
});

const ListUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
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
      sortedUsers = sortedUsers.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
    } else if (sortBy === 'oldest') {
      sortedUsers = sortedUsers.sort((a, b) => new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime());
    } else if (sortBy === 'name') {
      sortedUsers = sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredUsers(
      sortedUsers.filter((user) =>
        (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || user.username?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, users, sortBy]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handleEditClick = (user: User) => {
    navigate(`/gerenciar-usuario/${user.id}`);
  };

  const handleDeleteUser = async (user: User) => {
    setLoading(true);
    try {
      await deleteUser(user.id);
      setUsers(users.filter(u => u.id !== user.id));
      setSuccessMessage('Usuário excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir usuário', error);
      setError('Erro ao excluir usuário');
    } finally {
      setLoading(false);
    }
  };

  const columns = ['name', 'username', 'status'];

  return (
    <>
      <Toolbar />
      <ListContainer maxWidth="lg">


  
        {successMessage && <Success message={successMessage} />}
        {error && <Error message={error} />}
        <HeaderTable
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          sortBy={sortBy}
          handleSortChange={handleSortChange}
          />
        {loading ? (
          <CircularProgress />
        ) : (
          
          <GenericTable
          columns={columns}
          data={filteredUsers}
          loading={loading}
          error={error}
          handleEdit={handleEditClick}
          handleDelete={handleDeleteUser}
          />
        )}
      
        </ListContainer>
    </>
  );
};

export default ListUsers;
