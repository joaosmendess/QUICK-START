import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Modal, CircularProgress } from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import SecurityIcon from '@mui/icons-material/Security';
import { Wrapper, LoginContainer, LoginForm, SSOButton, GoogleButton, FacebookButton, SAMLButton } from './styles';
import logo from '../../assets/logo-white.png';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleSSOLogin = () => {
    setModalMessage('Estamos redirecionando você...');
    setOpen(true);
    setTimeout(() => {
      window.location.href = 'http://localhost:5173';
    }, 2000); // Redireciona após 2 segundos
  };

  const handleGoogleLogin = () => {
    navigate('/google-login');
  };

  const handleFacebookLogin = () => {
    navigate('/facebook-login');
  };

  const handleSAMLLogin = () => {
    navigate('/saml-login');
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
            onClick={handleSSOLogin}
            startIcon={<img src={logo} alt="SSO Logo" style={{ width: 60, height: 30 }} />}
          >
            Entrar com SSO da OFM
          </SSOButton>
          <GoogleButton
            variant="contained"
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
          >
            Entrar com Google
          </GoogleButton>
          <FacebookButton
            variant="contained"
            onClick={handleFacebookLogin}
            startIcon={<FacebookIcon />}
          >
            Entrar com Facebook
          </FacebookButton>
          <SAMLButton
            variant="contained"
            onClick={handleSAMLLogin}
            startIcon={<SecurityIcon />}
          >
            Entrar com SSO da sua empresa
          </SAMLButton>
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
