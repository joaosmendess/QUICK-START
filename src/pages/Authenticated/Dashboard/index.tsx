import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Toolbar, Typography } from '@mui/material';
import dash from '../../../assets/thumbnail2.png';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      setName(localStorage.getItem('name'));
      setUserName(localStorage.getItem('userName'));
    }
  }, [navigate]);

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
