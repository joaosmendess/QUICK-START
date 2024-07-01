import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container,  Toolbar } from '@mui/material';
import dash from '../assets/thumbnail2.png';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <Toolbar /> {/* Adiciona espaço para o AppBar */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <img src={dash} alt="Dashboard" style={{ width: '100%' }} />
      </Container>
    </>
  );
};

export default Dashboard;
