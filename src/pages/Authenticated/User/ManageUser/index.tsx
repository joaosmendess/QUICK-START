import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Box, CircularProgress, Toolbar, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { createUser, getUserById, updateUser } from '../../../../services/userService';
import Success from '../../../../components/Messages/SuccessMessage';
import Error from '../../../../components/Messages/ErrorMessage';
import FormContainer from '../../../../components/FormContainer';
import FormButton from '../../../../components/FormButton';

const ManageUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // Valor inicial do status
  const [empresaId, setEmpresaId] = useState<number>(1); // Fixo como 1
  const [password] = useState('0fm53nh4@2024'); // Senha temporária fixa

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const user = await getUserById(parseInt(id));
          setName(user.name);
          setUserName(user.username);
          setEmail(user.invitationEmail);
          setStatus(user.status);
          setEmpresaId(user.companyId);
        } catch (error) {
          console.error('Erro ao buscar usuário', error);
          setError('Erro ao buscar usuário');
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    let hasError = false;

    if (!name) {
      setNameError('Nome é obrigatório');
      hasError = true;
    } else {
      setNameError(null);
    }

    if (!userName) {
      setUserNameError('Usuário é obrigatório');
      hasError = true;
    } else {
      setUserNameError(null);
    }

    if (!email) {
      setEmailError('Email é obrigatório');
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      if (id) {
        await updateUser({
          id: parseInt(id),
          name,
          username: userName,
          invitationEmail: email,
          companyId: empresaId,
          status,
          password,
          created_at: new Date().toISOString(),
          user: { name: '', username: '', status: '' },
        });
        setSuccessMessage('Usuário atualizado com sucesso!');
      } else {
        await createUser(name, userName, email, empresaId, password, {
          name,
          username: userName,
          invitationEmail: email,
          companyId: empresaId,
          status,
          password,
        });
        setSuccessMessage('Usuário criado com sucesso!');
        setName('');
        setUserName('');
        setEmail('');
        setStatus('active');
      }
    } catch (error) {
      console.error('Erro ao salvar usuário', error);
      setError('Erro ao salvar usuário');
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
            error={!!nameError}
            helperText={nameError}
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
            error={!!userNameError}
            helperText={userNameError}
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
            error={!!emailError}
            helperText={emailError}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="select-status-label">Status</InputLabel>
            <Select
              labelId="select-status-label"
              id="select-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Ativo">Ativo</MenuItem>
              <MenuItem value="blocked">Bloqueado</MenuItem>
              <MenuItem value="Inativo">Inativo</MenuItem>
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="center" width="100%">
            <FormButton
              type="submit"
              id="button-manage-user"
              loading={loading}
              onClick={handleSave}
              disabled={loading}
            >
               {loading ? <CircularProgress size={24} /> : id ? 'Editar' : 'Salvar'}
            </FormButton>
          </Box>
        </form>
      </FormContainer>
    </>
  );
};

export default ManageUser;
