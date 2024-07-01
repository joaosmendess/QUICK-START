import React, { useState, useEffect } from 'react';
import { styled } from '../../../../stitches.config';
import { Box, Toolbar } from '@mui/material';

import PermissionForm from '../../../../components/PermissionForm';
import Error from '../../../../components/Messages/ErrorMessage';
import Success from '../../../../components/Messages/SuccessMessage';
import LoadingDialog from '../../../../components/LoadingDialog';
import { usePermissions } from '../../../../hooks/usePermission';

const FormContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  maxWidth: '800px',
  margin: '0 auto',
});

const ManagePermissions: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false); // Definindo o estado isEditMode
  const {
    tabValue,
    groupName,
    setGroupName,
    selectedGroup,
    setSelectedGroup,
    currentPermissions: permissions,
    setCurrentPermissions: setPermissions,
    permissionGroups,
    modules,
    loading,
    initialLoading,
    error,
    success,
    handleTabChange,
    handleSaveGroupName,
    handleSavePermissions,
    handlePermissionChange,
    handleGroupChange,
    handleModuleChange,
  } = usePermissions({ isEditMode, setIsEditMode });

  useEffect(() => {
    // Verifique se o grupo está selecionado para definir o modo de edição
    setIsEditMode(!!selectedGroup);
  }, [selectedGroup]);

  return (
    <>
     
      <Toolbar /> 
      {initialLoading ? (
        <LoadingDialog open={initialLoading} message="Carregando informações, por favor aguarde..." />
      ) : (
        <FormContainer>
        
          {error && <Error message={error} />}
          {success && <Success message={success} />}
          <PermissionForm
            tabValue={tabValue}
            handleTabChange={handleTabChange}
            groupName={groupName}
            setGroupName={setGroupName}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            currentPermissions={permissions}
            setCurrentPermissions={setPermissions}
            permissionGroups={permissionGroups}
            modules={modules}
            loading={loading}
            handleSaveGroupName={handleSaveGroupName}
            handleSavePermissions={handleSavePermissions}
            handlePermissionChange={handlePermissionChange}
            handleGroupChange={handleGroupChange}
            handleModuleChange={handleModuleChange}
            error={error}
            success={success}
            isEditMode={isEditMode} // Passando isEditMode para PermissionForm
            initialLoading={initialLoading}
          />
        </FormContainer>
      )}
    </>
  );
};

export default ManagePermissions;
