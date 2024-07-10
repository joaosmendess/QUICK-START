import { useState } from 'react';
import { Box, Typography, Paper, Modal, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import background from '../../../assets/richard-horvath-cPccYbPrF-A-unsplash.jpg'; // Adicione seu fundo aqui

import logo from '../../../assets/logo-white.png';
import animationData from '../../../assets/olShi6AW2pQj75e9EX (1).mp4';
import { 
  FormContainer, 
  LeftContainer, 
  RightContainer, 
  ImageContainer, 
  HeaderContainer, 
  ButtonContainer, 
  SSOButton as StyledSSOButton, 
  DividerStyled 
} from './styles';

const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${background}) no-repeat center center;
  background-size: cover;
`;

const StyledPaper = styled(Paper)`
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  margin: auto;
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
`;

const Login = () => {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSsoLogin = () => {
    setModalMessage('Estamos redirecionando você...');
    setOpen(true);
    setTimeout(() => {
      const redirectUrl = 'http://localhost:8080/callback';
      window.location.href = `http://localhost:5175/login?redirect_to=${encodeURIComponent(redirectUrl)}`;
    }, 2000);
  };


 

  return (
    <Wrapper>
      <FormContainer>
        <LeftContainer>
          <ImageContainer>
          <video width="100%" height="auto" autoPlay loop muted>
              <source src={animationData} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </ImageContainer>
        </LeftContainer>
        <DividerStyled />
        <RightContainer>
          <HeaderContainer>
            <Typography variant="h4" gutterBottom>
              Bem-vindo!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Faça login para acessar sua conta.
            </Typography>
          </HeaderContainer>
          <ButtonContainer>
            <StyledSSOButton
              variant="contained"
              onClick={handleSsoLogin}
              startIcon={<img src={logo} alt="SSO Logo" style={{ height: 30 }} />}
            >
              Entrar com SSO da OFM
            </StyledSSOButton>
            <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '1rem' }}>
              Agora você pode entrar com o SSO da OFM, trazendo mais inovação e segurança para nossos clientes.
              <br />
             
             
            </Typography>
          </ButtonContainer>
        </RightContainer>
      </FormContainer>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <StyledPaper elevation={3}>
          <Typography id="modal-title" variant="h6" gutterBottom>
            Um momento...
          </Typography>
          <Typography id="modal-description" gutterBottom>
            {modalMessage}
          </Typography>
          <CircularProgress />
        </StyledPaper>
      </Modal>
    </Wrapper>
  );
};

export default Login;
