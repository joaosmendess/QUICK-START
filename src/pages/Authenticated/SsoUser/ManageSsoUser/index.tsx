import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Toolbar, CircularProgress, Grid, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { register } from '../../../../services/registerService';
import { updateUser, getUserById } from '../../../../services/userService';
import { getCompany } from '../../../../services/companyService';
import { RegisterData, Company, User } from '../../../../types';
import Success from '../../../../components/Messages/SuccessMessage';
import Error from '../../../../components/Messages/ErrorMessage';
import FormContainer from '../../../../components/FormContainer';
import ButtonForm from '../../../../components/FormButton';

const ManageSsoUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password] = useState('ofm@2024');
  const [invitationEmail, setInvitationEmail] = useState('');
  const [companyId, setCompanyId] = useState<number | ''>('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [status, setStatus] = useState('Inativo');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [nameError, setNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompanies();
    if (id) {
      fetchUser(id);
      setIsEditMode(true);
    }
  }, [id]);

  const fetchUser = async (userId: string) => {
    setLoading(true);
    try {
      const user = await getUserById(Number(userId));
      setName(user.name);
      setUsername(user.username);
      setInvitationEmail(user.invitationEmail);
      setCompanyId(user.companyId);
      setStatus(user.status);
    } catch (error) {
      setError('Erro ao buscar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    const newUser: RegisterData = { name, username, password, invitationEmail, companyId: Number(companyId), status };
    setLoading(true);

    try {
      await register(newUser);
      setSuccessMessage('Email de confirmação de registro enviado com sucesso!');
      setName('');
      setUsername('');
      setInvitationEmail('');
      setStatus('Inativo');
      setCompanyId('');
    } catch (error) {
      setError('Erro ao registrar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    const updatedUser: User = { id: Number(id), name, username, invitationEmail, companyId: Number(companyId), status };
    setLoading(true);

    try {
      await updateUser(updatedUser);
      setSuccessMessage('Usuário atualizado com sucesso!');
    } catch (error) {
      setError('Erro ao atualizar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (!username) {
      setUsernameError('Usuário é obrigatório');
      hasError = true;
    } else {
      setUsernameError(null);
    }

    if (!invitationEmail) {
      setEmailError('Email é obrigatório');
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    if (isEditMode) {
      await handleUpdateUser();
    } else {
      await handleCreateUser();
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await getCompany(1);
      setCompanies(response.data);
    } catch (error) {
      setError('Erro ao buscar empresas');
    }
  };

  // Verifica se todos os campos obrigatórios foram preenchidos
  const isFieldFilled = (field: string) => field && field.length > 0;

  return (
    <>
      <Toolbar />
      {loading && <CircularProgress />}
      <FormContainer
        title={isEditMode ? "Editar Usuário SSO" : "Criar Usuário SSO"}
        description="Preencha os campos abaixo para gerenciar os dados do usuário."
        sideContent={
          <Box
            sx={{
              
              padding: '16px',
            
              marginBottom: '16px', // Espaçamento inferior para separação visual
            }}
          >
           
            <Typography
              variant="body2"
              sx={{
                textDecoration: isFieldFilled(name) ? 'line-through' : 'none'
              }}
            >
              - Nome é obrigatório.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textDecoration: isFieldFilled(username) ? 'line-through' : 'none'
              }}
            >
              - Usuário é obrigatório.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textDecoration: isFieldFilled(invitationEmail) ? 'line-through' : 'none'
              }}
            >
              - Email é obrigatório.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textDecoration: isFieldFilled(companyId.toString()) ? 'line-through' : 'none'
              }}
            >
              - Selecione a empresa correta para o usuário.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textDecoration: isFieldFilled(status) ? 'line-through' : 'none'
              }}
            >
              - Defina o status do usuário.
            </Typography>
          </Box>
        }
      >
        {error && <Error message={error} />}
        {successMessage && <Success message={successMessage} />}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome"
                id="input-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
                error={!!nameError}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome de usuário"
                id="input-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
                error={!!usernameError}
                helperText={usernameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email de convite"
                id="input-email"
                value={invitationEmail}
                onChange={(e) => setInvitationEmail(e.target.value)}
                fullWidth
                required
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Senha"
                id="input-password"
                value={password}
                fullWidth
                required
                type="password"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="company-select-label">Empresa</InputLabel>
                <Select
                  labelId="company-select-label"
                  label="Empresa"
                  id="company-select"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value as number)}
                >
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  id="select-status"
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem id='menu-ativo' value="Ativo">Ativo</MenuItem>
                  <MenuItem value="Inativo">Inativo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="center">
            <ButtonForm
              loading={loading}
              id='button-manager-sso-user'
              type="submit"
              disabled={loading || !name || !username || !invitationEmail || !companyId}
            >
              {isEditMode ? 'Editar usuário' : 'Convidar'}
            </ButtonForm>
          </Box>
        </form>
      </FormContainer>
    </>
  );
};

export default ManageSsoUser;
