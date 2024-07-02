import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Modal, CircularProgress } from '@mui/material';
import { Wrapper, LoginContainer, LoginForm, SSOButton } from './styles';
import logo from '../../../assets/logo-white.png';

const Login: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
   

    if (token) {
      localStorage.setItem('token', token);
      
      navigate('/dashboard');
    } else if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const { token } = event.data as { token?: string;};
      if (token) {
        localStorage.setItem('token', token);
     
        navigate('/dashboard');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  const handleSsoLogin = () => {
    setModalMessage('Estamos redirecionando você...');
    setOpen(true);
    setTimeout(() => {
      const redirectUrl = 'http://localhost:5173/callback'; // Define a URL do callback no projeto principal
      window.location.href = `http://localhost:8989/auth/redirect?redirect_to=${encodeURIComponent(redirectUrl)}`; // Redireciona para a URL do SSO com o parâmetro redirect_to
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
