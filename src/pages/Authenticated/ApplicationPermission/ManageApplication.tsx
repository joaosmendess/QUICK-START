import React, { useState, useRef, useEffect } from 'react';
import { Container, TextField, Typography, Box,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Toolbar } from '@mui/material';

import { styled } from '@stitches/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


const FormContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const MAX_DESCRIPTION_LENGTH = 255;

const ManageApplication: React.FC = () => {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [developUrl, setDevelopUrl] = useState('');
  const [homologUrl, setHomologUrl] = useState('');
  const [productionUrl, setProductionUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error'>('success');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const quillRef = useRef<ReactQuill | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.application) {
      const app = location.state.application;
      setId(app.id);
      setName(app.name);
      setDescription(app.description);
      setDevelopUrl(app.developUrl);
      setHomologUrl(app.homologUrl);
      setProductionUrl(app.productionUrl);
    }
  }, [location.state]);

  const checkNameExists = async (name: string) => {
    try {
      const response = await axios.get('http://localhost:8989/api/applications');
      return response.data.some((application: any) => application.name === name && application.id !== id);
    } catch (error) {
      console.error('Error checking name:', error);
      return false;
    }
  };

  const handleSave = async () => {
    if (!name || !description || !developUrl || !homologUrl || !productionUrl) {
      setMessage('Todos os campos obrigatórios devem ser preenchidos.');
      setSeverity('error');
      setNotificationOpen(true);
      return;
    }

    const nameExists = await checkNameExists(name);
    if (nameExists) {
      setMessage(`O nome ${name} já está em uso`);
      setSeverity('error');
      setNotificationOpen(true);
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = {
      name,
      description,
      developUrl,
      homologUrl,
      productionUrl,
    };

    const request = id
      ? axios.put(`http://localhost:8989/api/applications/${id}`, formData)
      : axios.post('http://localhost:8989/api/applications', formData);

    request
      .then((response) => {
        setLoading(false);
        setDialogOpen(true);
        setMessage('Operação concluída com sucesso');
        setSeverity('success');
        setNotificationOpen(true);
      })
      .catch((error) => {
        setLoading(false);
        handleError(error);
      });
  };

  const handleError = (error: any) => {
    if (error.response) {
      setMessage(`Erro: ${error.response.data.message || error.message}`);
    } else {
      setMessage(`Erro: ${error.message}`);
    }
    setSeverity('error');
    setNotificationOpen(true);
  };

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleDescriptionChange = (value: string) => {
    const textContent = stripHtmlTags(value);
    if (textContent.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(value);
    } else if (textContent.length > MAX_DESCRIPTION_LENGTH) {
      setDescription((prevDescription) => {
        const strippedPrevDescription = stripHtmlTags(prevDescription);
        if (strippedPrevDescription.length >= MAX_DESCRIPTION_LENGTH) {
          return prevDescription;
        }
        return value;
      });
    }
  };

  const descriptionLength = stripHtmlTags(description).length;

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <div>
<Toolbar/>

      <FormContainer maxWidth="md">
   
        <TextField
          label="Nome"
          placeholder="Ex.: SGC"
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ marginBottom: 2 }}>
          <ReactQuill
            ref={quillRef}
            placeholder="Descrição (máximo de 255 caracteres)"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Typography
            variant="caption"
            sx={{ color: descriptionLength > MAX_DESCRIPTION_LENGTH ? 'red' : 'inherit' }}
          >
            {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
          </Typography>
        </Box>
        <TextField
          label="URL de desenvolvimento"
          variant="outlined"
          fullWidth
          required
          value={developUrl}
          onChange={(e) => setDevelopUrl(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="URL de homologação"
          variant="outlined"
          fullWidth
          required
          value={homologUrl}
          onChange={(e) => setHomologUrl(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="URL de produção"
          variant="outlined"
          fullWidth
          required
          value={productionUrl}
          onChange={(e) => setProductionUrl(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary">
          salvar
        </Button>
      </FormContainer>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle color="primary">Operação concluída</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A aplicação foi {id ? 'editada' : 'salva'} com sucesso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/aplicacao-permissao/lista')}>Ver na listagem</Button>
          <Button onClick={() => setDialogOpen(false)}>Continuar na página</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default ManageApplication;
