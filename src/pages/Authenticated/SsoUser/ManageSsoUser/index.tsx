import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Toolbar } from '@mui/material';
import { register } from '../../../../services/registerService';
import { RegisterData } from '../../../../types';
import { containerStyles, buttonStyles } from './styles';

const ManageSsoUser: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invitationEmail, setInvitationEmail] = useState('');
  const [companyId, setCompanyId] = useState(2); // Definindo um valor padrão
  const [status, setStatus] = useState('active'); // Definindo status padrão

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
    <Box sx={containerStyles}>
      <Toolbar />
      <TextField
        label="Nome"
        id='input-name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nome de usuário"
        id='input-username' 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email de convite"
        id='input-email'

        value={invitationEmail}
        onChange={(e) => setInvitationEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
        id='select-status'

          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="active">Ativo</MenuItem>
          <MenuItem value="inactive">Inativo</MenuItem>
        </Select>
      </FormControl>
      <Button 
      variant="contained"
      id='button-send-email'
       color="primary"
        onClick={handleCreateUser}
         sx={buttonStyles}>
        Enviar email
      </Button>
    </Box>
  );
};

export default ManageSsoUser;
