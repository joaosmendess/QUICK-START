import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Modal, CircularProgress } from '@mui/material';
import { Wrapper, LoginContainer, LoginForm, SSOButton } from './styles';
import logo from '../../../assets/logo-white.png'



const Login = () => {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  // Efeito para capturar o token da URL e armazená-lo no localStorage
   useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log('Captured token:', token); // Log para depuração
    
    if (token) {
      localStorage.setItem('token', token); // Armazena o token no localStorage
      console.log('Token stored in localStorage:', localStorage.getItem('token')); // Log para verificar se o token foi armazenado
      navigate('/dashboard'); // Redireciona para o dashboard
    } else if (localStorage.getItem('token')) {
      navigate('/dashboard'); // Redireciona para o dashboard se o token já estiver armazenado
    }
  }, []); // Executa o efeito apenas uma vez ao montar o componente

  // Função para lidar com o login via SSO
  const handleSsoLogin = () => {
    setModalMessage('Estamos redirecionando você...');
    setOpen(true);
    setTimeout(() => {
      const redirectUrl = 'http://localhost:5173/'; // Define a URL do dashboard no projeto principal
      window.location.href = `http://localhost:5175?redirect_to=${encodeURIComponent(redirectUrl)}`; // Redireciona para a URL do SSO com o parâmetro redirect_to
    }, 2000); // Redireciona após 2 segundos
  };

  // Funções para lidar com os logins via Google, Facebook e SAML
 /* const handleGoogleLogin = () => {
    navigate('/google-login'); // Redireciona para a página de login do Google
  };

  const handleFacebookLogin = () => {
    navigate('/facebook-login'); // Redireciona para a página de login do Facebook
  }; */

 /* const handleExternalSsoLogin = () => {
    setModalMessage('Estamos redirecionando você...');
    setOpen(true);
    setTimeout(() => {
      const redirectUrl = 'http://localhost:5173/'; // Define a URL do dashboard no projeto principal
      window.location.href = `http://localhost:5175?redirect_to=${encodeURIComponent(redirectUrl)}&external_login=true`; // Redireciona para a URL do SSO com o parâmetro redirect_to
    }, 2000); // Redireciona após 2
  };*/

  return (
    <Wrapper>
      <LoginContainer>
        <Box display="flex" alignItems="center" mb={4}>
          <Typography variant="h5">Escolha uma conta</Typography> {/* Título da seção */}
        </Box>
        <LoginForm>
          <SSOButton
            variant="contained"
            onClick={handleSsoLogin}
            startIcon={<img src={logo} alt="SSO Logo" style={{ width: 60, height: 30 }} />} // Ícone de logo no botão
          >
            Entrar com SSO da OFM
          </SSOButton>
        
        
        </LoginForm>
      </LoginContainer>
      <Modal
        open={open}
        onClose={() => setOpen(false)} // Fecha o modal quando clicado fora dele
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', margin: 'auto', marginTop: '20vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography id="modal-title" variant="h6" gutterBottom>
            Um momento...
          </Typography>
          <Typography id="modal-description" gutterBottom>
            {modalMessage} {/* Exibe a mensagem do modal */}
          </Typography>
          <CircularProgress /> {/* Exibe um indicador de carregamento */}
        </Paper>
      </Modal>
    </Wrapper>
  );
};

export default Login;
