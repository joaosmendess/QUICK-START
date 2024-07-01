import React, { useState, useEffect } from 'react';
import { styled } from '../../../../stitches.config';
import { TextField, Button, Typography, Box, Select, MenuItem, InputLabel, FormControl, CircularProgress, Toolbar } from '@mui/material';
import { fetchPermissionGroups, createUser } from '../../../../services/auth';
import { PermissionGroup } from '../../../../types';

const FormContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  backgroundColor: 'white',
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
  const [permissionGroup, setPermissionGroup] = useState('');
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPermissionGroups();
        setPermissionGroups(data);
      } catch (error) {
        console.error('Erro ao buscar grupos de permissões', error);
        setError('Erro ao buscar grupos de permissões');
      }
    };
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createUser(name, userName, permissionGroup);
      alert('Usuário criado com sucesso!');
      // Limpar o formulário após a criação do usuário
      setName('');
      setUserName('');
      setPermissionGroup('');
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
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSave}>
          <TextField
            label="Nome"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
            disabled={true}
          />
          <TextField
            label="Usuário"
            variant="outlined"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            fullWidth
            margin="normal"
            disabled={true}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Grupo de permissão</InputLabel>
            <Select
              value={permissionGroup}
              onChange={(e) => setPermissionGroup(e.target.value as string)}
              required
              label='Grupo de permissão'
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {permissionGroups.map((group) => (
                <MenuItem key={group.id} value={group.name}>{group.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <SaveButton type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : '+ Salvar'}
          </SaveButton>
        </form>
      </FormContainer>
    </>
  );
};

export default ManageUser;
