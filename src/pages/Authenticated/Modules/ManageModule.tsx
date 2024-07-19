import React, { useState, useEffect } from 'react';
import { TextField, Box, CircularProgress, MenuItem, Toolbar } from '@mui/material';
import { getApplications, createModule, updateModule } from '../../../services/auth';
import SuccessMessage from '../../../components/Messages/SuccessMessage';
import DeleteMessage from '../../../components/Messages/ErrorMessage';
import { useLocation } from 'react-router-dom';
import FormContainer from '../../../components/FormContainer'; // Certifique-se de importar o FormContainer
import FormButton from '../../../components/FormButton'; // Certifique-se de importar o FormButton

interface Application {
  id: string;
  name: string;
  description: string;
  developUrl: string;
  homologUrl: string;
  productionUrl: string;
  empresa_id: number;
}

const ManageModule: React.FC = () => {
  const location = useLocation();
  const moduleToEdit = location.state?.module;

  const [id, setId] = useState<string | null>(moduleToEdit?.id || null);
  const [name, setName] = useState(moduleToEdit?.name || '');
  const [applications_id, setApplicationsId] = useState<number | ''>(moduleToEdit?.applications_id || '');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error' | 'info'>('success');
  const [saving, setSaving] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data: Application[] = await getApplications();
        setApplications(data);
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
    if (!name || applications_id === '') {
      setMessage('Todos os campos são obrigatórios');
      setSeverity('error');
      setNotificationOpen(true);
      return;
    }

    setSaving(true);

    try {
      if (id) {
        await updateModule(id, name, Number(applications_id));
        setMessage('Módulo atualizado com sucesso');
      } else {
        await createModule(name, Number(applications_id));
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
    <div>
      <Toolbar />
      <FormContainer>
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
          <>
            <TextField
              label="Nome"
              id='input-name'
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Aplicativo relacionado"
              id='select-application'
              variant="outlined"
              fullWidth
              margin="normal"
              select
              value={applications_id}
              onChange={(e) => setApplicationsId(Number(e.target.value))}
            >
              {applications.map((app) => (
                <MenuItem key={app.id} value={app.id}>
                  {app.name}
                </MenuItem>
              ))}
            </TextField>
            <FormButton loading={saving} onClick={handleSave}>
              Salvar
            </FormButton>
          </>
        )}
      </FormContainer>
    </div>
  );
};

export default ManageModule;
