import { styled } from '../../stitches.config';
import { Box, Button } from '@mui/material';

export const FormContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

export const LoginButton = styled(Button, {
  marginTop: '1rem',
});
