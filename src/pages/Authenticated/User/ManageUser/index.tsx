import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Box, CircularProgress, Toolbar, Select, MenuItem, InputLabel, FormControl, Grid, Typography } from '@mui/material';
import { getUserById, updateUser, createUser } from '../../../../services/userService';
import { fetchPermissionGroups } from '../../../../services/permissionGroupService';
import { getCompany } from '../../../../services/companyService';
import Success from '../../../../components/Messages/SuccessMessage';
import Error from '../../../../components/Messages/ErrorMessage';
import FormContainer from '../../../../components/FormContainer';
import FormButton from '../../../../components/FormButton';
import { PermissionGroup, Company } from '../../../../types';

const ManageUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [invitationEmail, setInvitaionEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyId, setCompanyId] = useState<number | ''>('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [status, setStatus] = useState('');
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([]);
  const [selectedPermissionGroup, setSelectedPermissionGroup] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchPermissionGroupsData = async () => {
      try {
        const groups = await fetchPermissionGroups();
        setPermissionGroups(groups);
      } catch (error) {
        console.error('Erro ao buscar grupos de permissão', error);
        setError('Erro ao buscar grupos de permissão');
      }
    };

    const fetchCompaniesData = async () => {
      try {
        let page = 1;
        let allCompanies: Company[] = [];
        let response;

        do {
          response = await getCompany(page);
          allCompanies = [...allCompanies, ...response.data];
          page++;
        } while (page <= response.last_page);

        setCompanies(allCompanies);
      } catch (error) {
        console.error('Erro ao buscar empresas', error);
        setError('Erro ao buscar empresas');
      }
    };

    fetchPermissionGroupsData();
    fetchCompaniesData();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const user = await getUserById(parseInt(id));
          setName(user.name);
          setUsername(user.username);
          setInvitaionEmail(user.invitationEmail);
          setStatus(user.status);
          setCompanyId(user.companyId);
          setSelectedPermissionGroup(user.permissionGroupId || '');
        } catch (error) {
          console.error('Erro ao buscar usuário', error);
          setError('Erro ao buscar usuário');
        }
      };
      fetchUser();
    }
  }, [id]);

  useEffect(() => {
    if (name && username && invitationEmail && companyId) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, username, invitationEmail, companyId]);

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

    try {
      if (id) {
        await updateUser({
          id: parseInt(id),
          name,
          username,
          invitationEmail,
          companyId: companyId as number,
          status,
          permissionGroupId: selectedPermissionGroup,
        });
        setSuccessMessage('Dados de usuário atualizados com sucesso!');
      } else {
        await createUser(name, username, invitationEmail, companyId as number, password);
        setSuccessMessage('Usuário criado com sucesso!');
        setName('');
        setUsername('');
        setInvitaionEmail('');
        setStatus('Ativo');
        setPassword('');
        setCompanyId('');
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
      <FormContainer
        title={id ? "Editar Usuário" : "Criar Usuário"}
        description="Preencha os campos abaixo para gerenciar os dados do usuário."
        sideContent={
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1, textDecoration: name ? 'line-through' : 'none' }}
            >
              - Nome é obrigatório.
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1, textDecoration: username ? 'line-through' : 'none' }}
            >
              - Usuário é obrigatório.
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1, textDecoration: invitationEmail ? 'line-through' : 'none' }}
            >
              - Email é obrigatório.
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1, textDecoration: password ? 'line-through' : 'none', display: id ? 'none' : 'block' }}
            >
              - A senha deve ter pelo menos 8 caracteres.
            </Typography>
            <Typography
              variant="body2"
              sx={{ textDecoration: companyId ? 'line-through' : 'none' }}
            >
              - Selecione a empresa correta para o usuário.
            </Typography>
          </Box>
        }
      >
        {error && <Error message={error} />}
        {successMessage && <Success message={successMessage} />}
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Usuário"
                id="input-username"
                variant="outlined"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                margin="normal"
                error={!!usernameError}
                helperText={usernameError}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Email"
                id="input-email"
                variant="outlined"
                type="email"
                value={invitationEmail}
                onChange={(e) => setInvitaionEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>
            {!id && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Senha"
                  id="input-password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={4}>
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
                  <MenuItem value="Bloqueado">Bloqueado</MenuItem>
                  <MenuItem value="Inativo">Inativo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel id="select-company-id-label">Empresa</InputLabel>
                <Select
                  labelId="select-company-id-label"
                  id="select-company-id"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value as number)}
                  label="Empresa"
                >
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {id && (
              <Grid item xs={12} sm={6} md={4}>
                <FormControl variant="outlined" fullWidth margin="normal">
                  <InputLabel id="select-permission-group-label">Grupo de Permissão</InputLabel>
                  <Select
                    labelId="select-permission-group-label"
                    id="select-permission-group"
                    value={selectedPermissionGroup}
                    onChange={(e) => setSelectedPermissionGroup(e.target.value)}
                    label="Grupo de Permissão"
                  >
                    {permissionGroups.map((group) => (
                      <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          
          <Box display="flex" justifyContent="center" width="100%" mt={3}>
            <FormButton
              type="submit"
              id="button-manage-user"
              loading={loading}
              onClick={handleSave}
              disabled={loading || isButtonDisabled}
            >
              {loading ? <CircularProgress size={24} /> : id ? 'Editar' : 'Criar usuário'}
            </FormButton>
          </Box>
        </form>
      </FormContainer>
    </>
  );
};

export default ManageUser;
