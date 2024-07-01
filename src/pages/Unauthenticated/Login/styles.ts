import { styled } from '@mui/system';
import { Box, Button, Paper } from '@mui/material';

export const Wrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f2f2f2',
  padding: '1rem',

  '@media (max-width: 768px)': {
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export const LoginContainer = styled(Paper)({
  padding: '2rem',
  borderRadius: '8px',
  maxWidth: '500px',
  width: '100%',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',

  '@media (max-width: 768px)': {
    padding: '1rem',
    maxWidth: '90%',
  },
});

export const LoginForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',

  '@media (max-width: 768px)': {
    gap: '0.5rem',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center'
  },
});

export const SSOButton = styled(Button)({
  width: '100%',
  textTransform: 'none',
  backgroundColor: '#4285f4',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#357ae8',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
});

export const GoogleButton = styled(Button)({
  width: '100%',
  textTransform: 'none',
  backgroundColor: '#db4437',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#c33c29',
  },
});

export const FacebookButton = styled(Button)({
  width: '100%',
  textTransform: 'none',
  backgroundColor: '#3b5998',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#334f8d',
  },
});

export const SAMLButton = styled(Button)({
  width: '100%',
  textTransform: 'none',
  backgroundColor: '#0073b1',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#005f91',
  },
});
