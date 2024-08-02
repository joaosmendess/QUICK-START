import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Toolbar } from '@mui/material';
import { getModules,  } from '../../../services/moduleService';
import { Module } from '../../../types';
import ErrorMessage from '../../../components/Messages/ErrorMessage';
import SuccessMessage from '../../../components/Messages/SuccessMessage';
import GenericTable from '../../../components/Table/GenericTable';
import { useNavigate } from 'react-router-dom';

const ModuleListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '1rem',
  '@media (max-width: 600px)': {
    padding: '0.5rem',
  },
});

const ModuleList: React.FC = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const fetchedModules = await getModules();
        setModules(fetchedModules);
      } catch (error) {
        setError('Erro ao carregar módulos');
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const handleEdit = (module: Module) => {
    navigate(`/gerenciar-modulo/${module.id}`, { state: { module } });
  };

  const columns = ['name', 'description', 'edit']; // Adicione as colunas que deseja exibir

  return (
    <ModuleListContainer maxWidth='lg'>
      <Toolbar />
      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={success} />}
      {loading ? (
        <CircularProgress />
      ) : (
        <GenericTable
          columns={columns}
          data={modules}
          loading={loading}
          error={error}
          handleEdit={handleEdit}
          handleDelete={() => {}} // Pode ser implementado se necessário
        />
      )}
    </ModuleListContainer>
  );
};

export default ModuleList;
