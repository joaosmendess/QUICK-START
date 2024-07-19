import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { fetchApplications, DeleteApplication } from '../../../services/applicationService';
import { Application } from '../../../types';
import ListItemWithMenu from '../../../components/ListItemWithMenu';

const ListContainer = styled(Container, {
  marginTop: '20px',
});

const ListApplication: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
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
    try {
      await DeleteApplication(application.id);
      setApplications(applications.filter(app => app.id !== application.id));
    } catch (error) {
      setError('Erro ao excluir aplicação');
    }
  };

  const filteredApplications = applications.filter(application =>
    application.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Toolbar />
      <ListContainer maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        ) : (
          filteredApplications.map((application) => (
            <ListItemWithMenu
              key={application.id}
              item={application}
              onEdit={handleEdit}
              onDelete={handleDelete}
              renderItemDetails={(app) => (
                <>
                  <Typography variant="h6">{app.name}</Typography>
                  <Typography variant="body2">{app.description}</Typography>
                  <Typography variant="body2">URL de Desenvolvimento: {app.developUrl}</Typography>
                  <Typography variant="body2">URL de Homologação: {app.homologUrl}</Typography>
                  <Typography variant="body2">URL de Produção: {app.productionUrl}</Typography>
                  <Typography variant="body2">Logo: {app.logo}</Typography>
                </>
              )}
            />
          ))
        )}
      </ListContainer>
    </div>
  );
};

export default ListApplication;
