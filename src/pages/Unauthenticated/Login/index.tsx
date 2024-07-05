import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Modal, CircularProgress } from '@mui/material';
import { Wrapper, LoginContainer, LoginForm, SSOButton } from './styles';
import logo from '../../../assets/logo-white.png';

const tokenThresholdLength = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg5ODkvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MjAxMTUzODgsImV4cCI6MTcyMDExODk4OCwibmJmIjoxNzIwMTE1Mzg4LCJqdGkiOiJFVndzUVVYM01QM3pRdUNRIiwic3ViIjoiMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJuYW1lIjoiSm9hbyBNZW5kZXMiLCJ1c2VyTmFtZSI6ImpvYW8ubWVuZGVzIiwiZW1wcmVzYSI6IlRlY2ggSW5ub3ZhdG9ycyBTQSIsInBlcm1pc3Npb25zIjpbXX0.7I4QoBvKJy5Aq2UJnzIS2obOzFVTG6G_-Kek-YHzyXw".length;

const Login = () => {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleSsoLogin = () => {
    setModalMessage('Estamos redirecionando você...');
    setOpen(true);
    setTimeout(() => {
      const redirectUrl = 'http://localhost:5173/callback'; // Certifique-se de que esta URL corresponda à rota do Callback
      window.location.href = `http://localhost:5175/login?redirect_to=${encodeURIComponent(redirectUrl)}`;
    }, 2000); // Redireciona após 2 segundos
  };

  return (
    <Wrapper>
      <LoginContainer>
        <Box display="flex" alignItems="center" mb={4}>
          <Typography variant="h5">Escolha uma conta</Typography>
        </Box>
        <LoginForm>
          <SSOButton
            variant="contained"
            onClick={handleSsoLogin}
            startIcon={<img src={logo} alt="SSO Logo" style={{ width: 60, height: 30 }} />}
          >
            Entrar com SSO da OFM
          </SSOButton>
        </LoginForm>
      </LoginContainer>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', margin: 'auto', marginTop: '20vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography id="modal-title" variant="h6" gutterBottom>
            Um momento...
          </Typography>
          <Typography id="modal-description" gutterBottom>
            {modalMessage}
          </Typography>
          <CircularProgress />
        </Paper>
      </Modal>
    </Wrapper>
  );
};

export default Login;
