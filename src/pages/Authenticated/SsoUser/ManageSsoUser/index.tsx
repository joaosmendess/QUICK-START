import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { register } from '../../../../services/registerService';
import { RegisterData } from '../../../../types';

const ManageSsoUser: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invitationEmail, setInvitationEmail] = useState('');
  const [companyId, setCompanyId] = useState(2); // Definindo um valor padrão

  const handleCreateUser = async () => {
    const newUser: RegisterData = { name, username, password, invitationEmail, companyId };
    try {
      await register(newUser);
      // Adicionar lógica adicional, como mostrar uma mensagem de sucesso ou redirecionar
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gerenciar Usuário do SSO
      </Typography>
      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nome de Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email de Convite"
        value={invitationEmail}
        onChange={(e) => setInvitationEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreateUser}>
        Criar Usuário
      </Button>
    </Box>
  );
};

export default ManageSsoUser;
