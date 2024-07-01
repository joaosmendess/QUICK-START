import React from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '../../stitches.config';
import TabPanel from '../PermissionTab';
import LoadingDialog from '../LoadingDialog';
import { PermissionGroup, Module } from '../../types';

const SaveButton = styled(Button, {
  marginTop: '1rem',
});

interface Permission {
  id: number;
  name: string;
  get: number;
  post: number;
  put: number;
  delete: number;
  modules_id: number;
  permissions_groups_id: number;
  created_at: string;
  updated_at: string;
}

interface PermissionFormProps {
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  groupName: string;
  setGroupName: (name: string) => void;
  selectedGroup: number | null;
  setSelectedGroup: (id: number | null) => void;
  currentPermissions: Permission;
  setCurrentPermissions: React.Dispatch<React.SetStateAction<Permission>>;
  permissionGroups: PermissionGroup[];
  modules: Module[];
  initialLoading: boolean;
  loading: boolean;
  handleSaveGroupName: (event: React.FormEvent) => void;
  handleSavePermissions: (event: React.FormEvent) => void;
  handlePermissionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGroupChange: (event: SelectChangeEvent<number | string>) => void;
  handleModuleChange: (event: SelectChangeEvent<number | string>) => void;
  error: string | null;
  success: string | null;
  isEditMode: boolean;
}

const PermissionForm: React.FC<PermissionFormProps> = ({
  tabValue,
  handleTabChange,
  groupName,
  setGroupName,
  currentPermissions,
  modules,
  initialLoading,
  loading,
  handleSaveGroupName,
  handleSavePermissions,
  handlePermissionChange,
  handleModuleChange,
  isEditMode,
}) => {
  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto', mt: 4 }}>
      <LoadingDialog open={initialLoading} message="Carregando informações, por favor aguarde..." />
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Principais" />
        <Tab label="Módulos" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <form onSubmit={handleSaveGroupName}>
          <TextField
            label="Nome do grupo"
            variant="outlined"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            fullWidth
            margin="normal"
            disabled={isEditMode || loading}
          />
          <SaveButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isEditMode || loading}
          >
            {isEditMode ? 'Salvar' : '+ Salvar'}
          </SaveButton>
        </form>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <form onSubmit={handleSavePermissions}>
          <FormControl fullWidth margin="normal" disabled={loading}>
            <InputLabel>Módulo</InputLabel>
            <Select
              label="Módulo"
              value={currentPermissions.modules_id || ''}
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
          <Box display="flex" flexDirection="column" alignItems="start" width="100%">
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(currentPermissions.get)}
                  onChange={handlePermissionChange}
                  name="get"
                  disabled={true}
                />
              }
              label="Ler"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(currentPermissions.post)}
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
                  onChange={handlePermissionChange}
                  name="delete"
                  disabled={loading}
                />
              }
              label="Apagar"
            />
          </Box>
          <SaveButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {isEditMode ? 'Salvar' : '+ Salvar'}
          </SaveButton>
        </form>
      </TabPanel>
    </Box>
  );
};

export default PermissionForm;
