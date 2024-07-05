import React, { useEffect, useState } from 'react';
import { Box, Container, Toolbar, Typography } from '@mui/material';
import dash from '../../../assets/thumbnail2.png';

const Dashboard: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setName(localStorage.getItem('name'));
    setUserName(localStorage.getItem('userName'));
  }, []);

  return (
    <>
      <Toolbar /> {/* Adiciona espaço para o AppBar */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {name && userName && (
          <Box>
            <Typography variant="h6">Nome: {name}</Typography>
            <Typography variant="h6">Usuário: {userName}</Typography>
          </Box>
        )}
        <img src={dash} alt="Dashboard" style={{ width: '100%', marginTop: '20px' }} />
      </Container>
    </>
  );
};

export default Dashboard;
