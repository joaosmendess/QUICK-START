import React, { useState, useEffect } from 'react';
import { TextField, Box, MenuItem, Toolbar, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { getApplications, createModule, updateModule } from '../../../services/moduleService';
import SuccessMessage from '../../../components/Messages/SuccessMessage';
import DeleteMessage from '../../../components/Messages/ErrorMessage';
import { useLocation } from 'react-router-dom';
import FormContainer from '../../../components/FormContainer';
import FormButton from '../../../components/FormButton';

interface Application {
  id: number | undefined;
  name: string;
  description: string;
  developUrl: string;
  homologUrl: string;
  productionUrl: string;
  companyId: number;
}

const ManageModule: React.FC = () => {
  const location = useLocation();
  const moduleToEdit = location.state?.module;

  const [id, setId] = useState<string | null>(moduleToEdit?.id || null);
  const [name, setName] = useState(moduleToEdit?.name || '');
  const [applicationId, setApplicationsId] = useState<number | ''>(moduleToEdit?.applicationId || '');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error' | 'info'>('success');
  const [saving, setSaving] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        const formattedData = data.map(app => ({
          ...app,
          id: Number(app.id),
        }));
        setApplications(formattedData);
      } catch (error) {
        console.error('Error fetching applications', error);
        setMessage('Erro ao buscar dados das aplicações');
        setSeverity('error');
        setNotificationOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);
  
  const handleSave = async () => {
    if (!name || applicationId === '') {
      setMessage('Todos os campos são obrigatórios');
      setSeverity('error');
      setNotificationOpen(true);
      return;
    }

    setSaving(true);

    try {
      if (id) {
        await updateModule(id, name, Number(applicationId));
        setMessage('Módulo atualizado com sucesso');
      } else {
        await createModule(name, Number(applicationId));
        setMessage('Módulo salvo com sucesso');
      }
      setSeverity('success');
    } catch (error) {
      setMessage('Erro ao salvar o módulo');
      setSeverity('error');
    } finally {
      setSaving(false);
      setNotificationOpen(true);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Toolbar />
      <FormContainer title={id ? "Editar Módulo" : "Criar Módulo"}>
        {severity === 'success' && message && (
          <SuccessMessage message={message} />
        )}
        {severity === 'error' && message && (
          <DeleteMessage message={message} />
        )}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome"
                id='input-name'
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Aplicativo relacionado"
                id='select-application'
                variant="outlined"
                fullWidth
                margin="normal"
                select
                value={applicationId}
                onChange={(e) => setApplicationsId(Number(e.target.value))}
              >
                {applications.map((app) => (
                  <MenuItem key={app.id} value={app.id}>
                    {app.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormButton loading={saving} onClick={handleSave}>
                Salvar
              </FormButton>
            </Grid>
          </Grid>
        )}
      </FormContainer>
    </Box>
  );
};

export default ManageModule;
