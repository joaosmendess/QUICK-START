import { useState } from 'react';
import { styled } from '../../stitches.config';
import { TextField, Box, List } from '@mui/material';

import { usePermissions } from '../../hooks/usePermission';
import ErrorMessage from '../Messages/ErrorMessage';
import SuccessMessage from '../Messages/SuccessMessage';
import PermissionItem from '../PermissionItem';
import DeleteDialog from '../DeleteDialog';
import LoadingDialog from '../LoadingDialog';
import { useNavigate } from 'react-router-dom';
import { PermissionGroup } from '../../types';

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
  const {
    permissionGroups,
    loading,
    initialLoading,
    error,
    success,
    deleteLoading,
    deletePermission,
    setCurrentPermissions,
    setSelectedGroup,
    setTabValue,
  } = usePermissions();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState<null | string>(null);
  const navigate = useNavigate();

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
      await deletePermission(Number(permissionToDelete));
      handleDialogClose();
    }
  };

  const handleEdit = (permissionGroup: PermissionGroup) => {
    setCurrentPermissions({
      id: permissionGroup.id,
      name: permissionGroup.name,
      get: 1, // Default value, assuming "Ler" is always enabled
      post: 0, // Default values, adjust if necessary
      put: 0, // Default values, adjust if necessary
      delete: 0, // Default values, adjust if necessary
      modules_id: 0, // Default values, adjust if necessary
      permissions_groups_id: permissionGroup.id,
      created_at: permissionGroup.created_at,
      updated_at: permissionGroup.updated_at,
    });
    setSelectedGroup(permissionGroup.id);
    setTabValue(1);
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
