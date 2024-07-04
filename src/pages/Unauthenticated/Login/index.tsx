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

  // Função para decodificar o token JWT
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  };

  // Efeito para capturar o token da URL e armazená-lo no localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log('Captured token:', token); // Log para depuração

    if (token) {
      // Armazena o token no localStorage
      localStorage.setItem('token', token);
      console.log('Token stored in localStorage:', localStorage.getItem('token')); // Log para verificar se o token foi armazenado

      // Verificar o tamanho do token
      if (token.length > tokenThresholdLength) {
        // Validar o token e obter customerData
        fetch('http://localhost:8989/api/auth/validate-jwt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        })
        .then(response => response.json())
        .then(data => {
          if (data.customerData) {
            const { name, userName } = data.customerData;
            localStorage.setItem('name', name);
            localStorage.setItem('userName', userName);
            console.log('Name and UserName stored in localStorage:', name, userName);
            navigate('/dashboard'); // Redireciona para o dashboard
          } else {
            console.error('Erro ao validar o token:', data.message);
          }
        })
        .catch(error => {
          console.error('Erro ao validar o token:', error);
        });
      } else {
        // Decodificar o token para obter name e userName
        const decodedToken = parseJwt(token);
        if (decodedToken) {
          const { name, userName } = decodedToken;
          if (name && userName) {
            localStorage.setItem('name', name);
            localStorage.setItem('userName', userName);
            console.log('Name and UserName stored in localStorage:', name, userName);
          }
        }

        navigate('/dashboard'); // Redireciona para o dashboard
      }
    } else if (localStorage.getItem('token')) {
      navigate('/dashboard'); // Redireciona para o dashboard se o token já estiver armazenado
    }
  }, [navigate]); // Execute o efeito novamente se navigate mudar

  // Função para lidar com o login via SSO
  const handleSsoLogin = () => {
    setModalMessage('Estamos redirecionando você...');
    setOpen(true);
    setTimeout(() => {
      const redirectUrl = 'http://localhost:5173/'; // URL do projeto principal
      window.location.href = `http://localhost:5175/login?redirect_to=${encodeURIComponent(redirectUrl)}`; // Redireciona para o login do SSO com o parâmetro redirect_to
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
