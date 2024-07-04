import React, { useState, useEffect } from 'react';
import { styled } from '../../stitches.config';
import { TextField, Box, List } from '@mui/material';
import { getPermissionGroupsHasModules, deletePermissionGroupHasModule } from '../../services/auth';
import ErrorMessage from '../Messages/ErrorMessage';
import SuccessMessage from '../Messages/SuccessMessage';
import PermissionItem from '../PermissionItem';
import DeleteDialog from '../DeleteDialog';
import LoadingDialog from '../LoadingDialog';
import { useNavigate } from 'react-router-dom';
import { PermissionGroupHasModule } from '../../types';

const PermissionListContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '1rem',
  '@media (max-width: 600px)': {
    padding: '0.5rem',
  },
});

const PermissionList = () => {
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroupHasModule[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState<null | string>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const fetchedPermissions = await getPermissionGroupsHasModules();
        setPermissionGroups(fetchedPermissions);
      } catch (error) {
        setError('Erro ao carregar grupos de permissões');
      } finally {
        setInitialLoading(false);
      }
    };
    fetchPermissions();
  }, []);

  const handleDelete = (permissionId: string) => {
    setPermissionToDelete(permissionId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPermissionToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (permissionToDelete) {
      setDeleteLoading(true);
      try {
        await deletePermissionGroupHasModule(Number(permissionToDelete));
        setPermissionGroups(permissionGroups.filter(pg => pg.id !== Number(permissionToDelete)));
        setSuccess('Permissão excluída com sucesso');
      } catch (error) {
        setError('Erro ao excluir permissão');
      } finally {
        setDeleteLoading(false);
        handleDialogClose();
      }
    }
  };

  const handleEdit = (permissionGroup: PermissionGroupHasModule) => {
    navigate(`/gerenciar-permissoes/${permissionGroup.id}`);
  };

  return (
    <PermissionListContainer>
      <TextField
        label="Pesquise por nome"
        variant="outlined"
        type="search"
        fullWidth
        margin="normal"
      />
      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={success} />}
      {initialLoading ? (
        <LoadingDialog open={initialLoading} message="Carregando informações, por favor aguarde..." />
      ) : (
        <List style={{ width: '100%' }}>
          {permissionGroups.map((permissionGroup) => (
            <PermissionItem
              key={permissionGroup.id}
           
              permissionGroup={permissionGroup}
              onDelete={() => handleDelete(permissionGroup.id.toString())}
              onEdit={() => handleEdit(permissionGroup)}
            />
          ))}
        </List>
      )}
      <DeleteDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />
      <LoadingDialog open={loading || deleteLoading} message="Por favor, aguarde..." />
    </PermissionListContainer>
  );
};

export default PermissionList;
