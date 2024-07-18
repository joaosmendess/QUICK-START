import React, { useRef, useState } from 'react';
import { Container, TextField, Typography, Box, Button, Toolbar, LinearProgress } from '@mui/material';
import { styled } from '@stitches/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createApplication } from '../../../services/auth';
import Success from '../../../components/Messages/SuccessMessage';
import Error from '../../../components/Messages/ErrorMessage';

const FormContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const stripHtmlTags = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const ManageApplication: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [developUrl, setDevelopUrl] = useState('');
  const [homologUrl, setHomologUrl] = useState('');
  const [productionUrl, setProductionUrl] = useState('');
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const quillRef = useRef(null);

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      const formattedDescription = stripHtmlTags(description);
      const newApplication = {
        name,
        description: formattedDescription,
        developUrl,
        homologUrl,
        productionUrl,
        companyId: 1, // Ajuste conforme necessário
        logo,
      };

      await createApplication(newApplication);
      setSuccessMessage('Aplicação criada com sucesso!');
      // Adicione lógica adicional, como limpar o formulário
      setName('');
      setDescription('');
      setDevelopUrl('');
      setHomologUrl('');
      setProductionUrl('');
      setLogo('');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
        setErrorMessage('Erro ao criar aplicação.');
      } else {
        console.error('Erro ao criar aplicação:', error);
        setErrorMessage('Erro desconhecido ao criar aplicação.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toolbar />
      {loading && <LinearProgress />}
      {successMessage && <Success message={successMessage} />}
      {errorMessage && <Error message={errorMessage} />}
      <FormContainer maxWidth="md">
        <TextField
          label="Nome"
          id='input-name'
          placeholder="Ex.: SGC"
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name ? errors.name[0] : ''}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ marginBottom: 2 }}>
          <ReactQuill
            ref={quillRef}
            id='input-description'
            value={description}
            onChange={setDescription}
            placeholder="Descrição (máximo de 255 caracteres)"
          />
          <Typography variant="caption">
            {description.length}/255 caracteres
          </Typography>
          {errors.description && (
            <Typography color="error" variant="caption">
              {errors.description[0]}
            </Typography>
          )}
        </Box>
        <TextField
          label="URL de desenvolvimento"
          id='input-development-url'
          variant="outlined"
          fullWidth
          required
          value={developUrl}
          onChange={(e) => setDevelopUrl(e.target.value)}
          error={!!errors.developUrl}
          helperText={errors.developUrl ? errors.developUrl[0] : ''}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="URL de homologação"
          id='input-homologation-url'
          variant="outlined"
          fullWidth
          required
          value={homologUrl}
          onChange={(e) => setHomologUrl(e.target.value)}
          error={!!errors.homologUrl}
          helperText={errors.homologUrl ? errors.homologUrl[0] : ''}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="URL de produção"
          id='input-production-url'
          variant="outlined"
          fullWidth
          required
          value={productionUrl}
          onChange={(e) => setProductionUrl(e.target.value)}
          error={!!errors.productionUrl}
          helperText={errors.productionUrl ? errors.productionUrl[0] : ''}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Logo"
          id='input-logo'
          variant="outlined"
          fullWidth
          required
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          error={!!errors.logo}
          helperText={errors.logo ? errors.logo[0] : ''}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          id='button-manage-application'
          color="primary"
          onClick={handleSubmit}
          disabled={loading || !name || !description || !developUrl || !homologUrl || !productionUrl || !logo}
        >
          Salvar
        </Button>
      </FormContainer>
    </>
  );
};

export default ManageApplication;
