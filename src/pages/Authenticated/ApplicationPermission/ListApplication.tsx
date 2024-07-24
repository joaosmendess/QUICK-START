import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  CircularProgress,
  Toolbar,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@stitches/react';
import { useNavigate } from 'react-router-dom';
import { fetchApplications, deleteApplication } from '../../../services/applicationService';
import { Application } from '../../../types';
import HeaderTable from '../../../components/HeaderTable';
import Success from '../../../components/Messages/SuccessMessage';
import Error from '../../../components/Messages/ErrorMessage';
import GenericTable from '../../../components/Table/GenericTable';

const ListContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh'
});

const ListApplication: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicationsData = async () => {
      setLoading(true);
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (error) {
        setError('Erro ao buscar aplicações');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationsData();
  }, []);

  const handleEdit = (application: Application) => {
    navigate(`/gerenciar-aplicacao/${application.id}`);
  };

  const handleDelete = async (application: Application) => {
    setLoading(true);
    try {
      await deleteApplication(application.id);
      setApplications(applications.filter(app => app.id !== application.id));
      setSuccessMessage('Aplicação excluída com sucesso!');
    } catch (error) {
      setError('Erro ao excluir aplicação');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const filteredApplications = applications.filter(application =>
    application.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = ['name', 'description'];

  return (
    <div>
      <Toolbar />
      <ListContainer maxWidth="lg">
        {successMessage && <Success message={successMessage} />}
        {error && <Error message={error} />}
        <HeaderTable
          searchTerm={search}
          handleSearchChange={handleSearchChange}
          sortBy={sortBy}
          handleSortChange={handleSortChange}
        />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <CircularProgress />
          </Box>
        ) : (
          <GenericTable
            columns={columns}
            data={filteredApplications}
            loading={loading}
            error={error}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </ListContainer>
    </div>
  );
};

export default ListApplication;
