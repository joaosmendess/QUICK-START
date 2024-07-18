import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { fetchUsers} from  '../../../../services/userService'

const ListSsoUser: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    getUsers();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Listar Usuários do SSO
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={user.username} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListSsoUser;
