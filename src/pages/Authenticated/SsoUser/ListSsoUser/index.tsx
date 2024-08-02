import React, { useState, useEffect } from 'react';
import {
  Container,
  CircularProgress,
  Toolbar,
} from '@mui/material';
import { styled } from '@stitches/react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../../../services/userService';
import { User } from '../../../../types';
import Success from '../../../../components/Messages/SuccessMessage';
import Error from '../../../../components/Messages/ErrorMessage';
import GenericTable from '../../../../components/Table/GenericTable';

const ListContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',

});

const ListSsoUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        setError('Erro ao buscar usuários');
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);




  const handleEditClick = (user: User) => {
    navigate(`/gerenciar-usuario-sso/${user.id}`);
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

  const columns = ['name', 'username', 'invitationEmail', 'status',];

  return (
    <>
      <ListContainer maxWidth="lg" >
<br />
          {successMessage && <Success message={successMessage} />}
          {error && <Error message={error} />}
   
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
   <Toolbar />
   <Toolbar />
   <Toolbar />
  


      



    </>
  );
};

export default ListSsoUser;
