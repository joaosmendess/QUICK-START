import React, { useState } from 'react';
import { styled } from '../../stitches.config';
import { TextField, Button, Typography } from '@mui/material';
import { FormContainer, LoginButton } from './styles';

const SSO = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Lógica de autenticação SSO
    }
  };

  return (
    <FormContainer>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Área de Autenticação
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Utilize usuário e senha para identificação
      </Typography>
      <form onSubmit={handleNext}>
        {step === 1 && (
          <TextField
            label="Usuário"
            variant="outlined"
            type="userName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        )}
        {step === 2 && (
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        )}
        <LoginButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={(step === 1 && !username) || (step === 2 && !password)}
        >
          {step === 1 ? '+ Próximo' : 'Login'}
        </LoginButton>
      </form>
    </FormContainer>
  );
};

export default SSO;
