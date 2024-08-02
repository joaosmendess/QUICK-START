import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import TabPanel from '../../../../components/PermissionTab';
import LoadingDialog from '../../../../components/LoadingDialog';
import { Module, PermissionGroupHasModule } from '../../../../types';
import { getModules, createPermissionGroupHasModule, updatePermissionGroupHasModule } from '../../../../services/moduleService';
import Error from '../../../../components/Messages/ErrorMessage';
import Success from '../../../../components/Messages/SuccessMessage';
import FormContainer from '../../../../components/FormContainer';
import FormButton from '../../../../components/FormButton';

const ManagePermissionGroup: React.FC = () => {
  const { state } = useLocation(); // Recebe os dados via state para edição

  const [tabValue, setTabValue] = useState(0);
  const [groupName, setGroupName] = useState(state?.permissionGroup?.name || '');
  const [currentPermissions, setCurrentPermissions] = useState<PermissionGroupHasModule>({
    id: state?.permissionGroup?.id || 0,
    name: state?.permissionGroup?.name || '',
    get: state?.permissionGroup?.get || 1,
    post: state?.permissionGroup?.post || 0,
    put: state?.permissionGroup?.put || 0,
    delete: state?.permissionGroup?.delete || 0,
    modulesId: state?.permissionGroup?.modulesId || 1,
    permissionsGroupsId: state?.permissionGroup?.permissionsGroupsId || 0,
    created_at: state?.permissionGroup?.created_at || '',
    updated_at: state?.permissionGroup?.updated_at || '',
  });
  const [modules, setModules] = useState<Module[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const fetchedModules = await getModules();
        setModules(fetchedModules);
      } catch (error) {
        setError('Erro ao carregar dados');
        console.error('Erro ao carregar dados', error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchModules();
  }, []);

  const handleTabChange = useCallback((_event: React.ChangeEvent<object>, newValue: number) => {
    setTabValue(newValue);
  }, []);

  const handleSaveGroupName = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName) {
      setError('O nome do grupo é obrigatório');
      return;
    }
    setError(null);
    setSuccess('Nome do grupo salvo com sucesso!');
    setTabValue(1);
  }, [groupName]);

  const handleSavePermissions = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName) {
      setError('O nome do grupo é obrigatório');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const permissionData: PermissionGroupHasModule = {
        ...currentPermissions,
        name: groupName,
        modulesId: currentPermissions.modulesId,
        get: currentPermissions.get ? 1 : 0,
        post: currentPermissions.post ? 1 : 0,
        put: currentPermissions.put ? 1 : 0,
        delete: currentPermissions.delete ? 1 : 0,
      };

      if (currentPermissions.id) {
        await updatePermissionGroupHasModule(permissionData);
        setSuccess('Permissões atualizadas com sucesso!');
      } else {
        await createPermissionGroupHasModule(permissionData);
        setSuccess('Permissões criadas com sucesso!');
      }

      resetForm();
    } catch (error) {
      console.error('Erro ao salvar permissões', error);
      setError('Erro ao salvar permissões');
    } finally {
      setLoading(false);
    }
  }, [groupName, currentPermissions]);

  const handlePermissionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPermissions((prevPermissions) => ({
      ...prevPermissions,
      [event.target.name]: event.target.checked ? 1 : 0,
    }));
  }, []);

  const handleModuleChange = useCallback((event: SelectChangeEvent<number>) => {
    const moduleId = event.target.value as number;
    setCurrentPermissions({
      ...currentPermissions,
      modulesId: moduleId,
    });
  }, [currentPermissions]);

  const resetForm = useCallback(() => {
    setGroupName('');
    setCurrentPermissions({
      id: 0,
      name: '',
      get: 1,
      post: 0,
      put: 0,
      delete: 0,
      modulesId: 1,
      permissionsGroupsId: 0,
      created_at: '',
      updated_at: '',
    });
    setTabValue(0);
  }, []);

  return (
    <>
      <Toolbar />
      <FormContainer
        description="Configure as permissões para cada módulo do sistema."
        sideContent={
          <Box>
            <Typography variant="body2">
              - Nome do grupo é obrigatório.
            </Typography>
            <Typography variant="body2">
              - Certifique-se de selecionar os módulos apropriados para este grupo.
            </Typography>
            <Typography variant="body2">
              - As permissões podem ser configuradas para cada módulo.
            </Typography>
            <Typography variant="body2">
              - Clique em Salvar após configurar as permissões.
            </Typography>
          </Box>
        }
      >
        <LoadingDialog open={initialLoading} message="Carregando informações, por favor aguarde..." />
        {error && <Error message={error} />}
        {success && <Success message={success} />}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Principais" />
          <Tab label="Módulos" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handleSaveGroupName}>
            <Box
              display="flex"
              flexDirection="column"
              width={{ xs: '100%', sm: '35rem' }}
              maxWidth="100%"
            >
              <TextField
                label="Nome do grupo"
                id="input-group-name"
                variant="outlined"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                fullWidth
                margin="normal"
                disabled={loading}
              />
            </Box>
            <Box display="flex" justifyContent="center" width="100%">
              <FormButton
                type="submit"
                id="button-manage-permission-group"
                loading={loading}
                onClick={handleSaveGroupName}
                disabled={loading || !groupName}
              >
                Salvar
              </FormButton>
            </Box>
          </form>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleSavePermissions}>
            <Box
              display="flex"
              flexDirection="column"
              width={{ xs: '100%', sm: '35rem' }}
              maxWidth="100%"
            >
              <FormControl fullWidth margin="normal" disabled={loading}>
                <InputLabel>Módulo</InputLabel>
                <Select
                  label="Módulo"
                  id="select-module"
                  value={currentPermissions.modulesId || ''}
                  onChange={handleModuleChange}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {modules.map((module) => (
                    <MenuItem key={module.id} value={module.id}>
                      {module.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(currentPermissions.get)}
                    id="checkbox-get"
                    onChange={handlePermissionChange}
                    name="get"
                    disabled={loading}
                  />
                }
                label="Ler"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(currentPermissions.post)}
                    id="checkbox-post"
                    onChange={handlePermissionChange}
                    name="post"
                    disabled={loading}
                  />
                }
                label="Criar"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(currentPermissions.put)}
                    id="checkbox-put"
                    onChange={handlePermissionChange}
                    name="put"
                    disabled={loading}
                  />
                }
                label="Editar"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(currentPermissions.delete)}
                    id="checkbox-delete"
                    onChange={handlePermissionChange}
                    name="delete"
                    disabled={loading}
                  />
                }
                label="Apagar"
              />
            </Box>
            <Box display="flex" justifyContent="center" width="100%">
              <FormButton
                type="submit"
                id="button-manage-permission-group"
                loading={loading}
                onClick={handleSavePermissions}
                disabled={loading || !groupName || !currentPermissions.modulesId}
              >
                Salvar
              </FormButton>
            </Box>
          </form>
        </TabPanel>
      </FormContainer>
    </>
  );
};

export default ManagePermissionGroup;
