import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Toolbar, SelectChangeEvent, Typography } from '@mui/material';
import { getUsers } from '../../../../services/auth';
import { User } from '../../../../types';
import HeaderTable from '../../../../components/HeaderTable';
import UserTable from '../../../../components/UserTable';

const ListUsers: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<null | string>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <>
      <Toolbar />
      <Box sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '1rem' }}>
      <Toolbar />
<Typography  ></Typography>
        <HeaderTable
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          sortBy={sortBy}
          handleSortChange={handleSortChange}
        />
        <UserTable
          users={filteredUsers}
          isMobile={isMobile}
          loading={loading}
          error={error}
          handleMenuClick={handleMenuClick}
          handleMenuClose={handleMenuClose}
          anchorEl={anchorEl}
          selectedUser={selectedUser}
        />
      </Box>
    </>
  );
};

export default ListUsers;
