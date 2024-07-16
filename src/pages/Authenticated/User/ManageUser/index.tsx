import React, { useState } from 'react';
import { styled } from '../../../../stitches.config';
import { TextField, Button, Box, CircularProgress, Toolbar } from '@mui/material';
import { createUser } from '../../../../services/auth';
import Success from '../../../../components/Messages/SuccessMessage';
import Error from '../../../../components/Messages/ErrorMessage';

const FormContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  borderRadius: '8px',
  maxWidth: '400px',
  margin: '0 auto',
});

const SaveButton = styled(Button, {
  marginTop: '1rem',
});

const ManageUser: React.FC = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [empresa_id] = useState(1); // Fixo como 1
  const [password] = useState('0fm53nh4@2024'); // Senha temporária fixa

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await createUser(name, userName, email, empresa_id, password);
      setSuccessMessage('Usuário criado com sucesso!');
      // Limpar o formulário após a criação do usuário
      setName('');
      setUserName('');
      setEmail('');
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      setError('Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toolbar /> 
      <FormContainer>
        {error && <Error message={error} />}
        {successMessage && <Success message={successMessage} />}
        <form onSubmit={handleSave}>
          <TextField
            label="Nome"
            id="input-name"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Usuário"
            id="input-username"
            variant="outlined"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            id="input-email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <SaveButton 
          type="submit" 
          id='button-manage-user'
          variant="contained" color="primary" fullWidth disabled={loading} >
            {loading ? <CircularProgress size={24} /> : 'Salvar'}
          </SaveButton>
        </form>
      </FormContainer>
    </>
  );
};

export default ManageUser;
