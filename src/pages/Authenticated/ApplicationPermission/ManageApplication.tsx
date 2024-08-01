import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Typography, Box, Toolbar, LinearProgress } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createApplication, getApplicationById, updateApplication } from '../../../services/applicationService';
import Success from '../../../components/Messages/SuccessMessage';
import Error from '../../../components/Messages/ErrorMessage';
import FormContainer from '../../../components/FormContainer';
import FormButton from '../../../components/FormButton';

const stripHtmlTags = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const translateErrors = (errors: any) => {
  const translatedErrors: any = {};
  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      translatedErrors[key] = errors[key].map((error: string) => {
        switch (error) {
          case 'Name is required':
            return 'O nome é obrigatório';
          case 'Description is required':
            return 'A descrição é obrigatória';
          case 'Develop URL is required':
            return 'A URL de desenvolvimento é obrigatória';
          case 'Homolog URL is required':
            return 'A URL de homologação é obrigatória';
          case 'Production URL is required':
            return 'A URL de produção é obrigatória';
          case 'Logo is required':
            return 'O logo é obrigatório';
          case 'The name has already been taken':
            return 'O nome já está em uso';
          default:
            return error;
        }
      });
    }
  }
  return translatedErrors;
};

const ManageApplication: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchApplication = async () => {
      if (id) {
        setLoading(true);
        try {
          const data = await getApplicationById(parseInt(id));
          setName(data.name);
          setDescription(data.description);
          setDevelopUrl(data.developUrl);
          setHomologUrl(data.homologUrl);
          setProductionUrl(data.productionUrl);
          setLogo(data.logo);
        } catch (error) {
          setErrorMessage('Erro ao carregar aplicação.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplication();
  }, [id]);

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

      if (id) {
        await updateApplication({ ...newApplication, id: parseInt(id) });
        setSuccessMessage('Aplicação atualizada com sucesso!');
      } else {
        await createApplication(newApplication);
        setSuccessMessage('Aplicação criada com sucesso!');
      }

      // Redirecionar para a lista de aplicações
      navigate('/listar-aplicacoes');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const translatedErrors = translateErrors(error.response.data.errors);
        setErrors(translatedErrors);
        setErrorMessage('Erro ao salvar aplicação.');
      } else {
        console.error('Erro ao salvar aplicação:', error);
        setErrorMessage('Erro desconhecido ao salvar aplicação.');
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
      <FormContainer
        title={id ? "Editar Aplicação" : "Criar Aplicação"}
        description="Preencha os detalhes da aplicação nos campos abaixo."
        sideContent={
          <Box 
            sx={{
              
              marginBottom: '16px', // Espaçamento inferior para separação visual
            }}
          >
            <Typography variant="h6" gutterBottom>
              Dicas:
            </Typography>
            <Typography variant="body2">
              - O nome da aplicação é obrigatório e deve ser único.
            </Typography>
            <Typography variant="body2">
              - Descreva a aplicação de forma clara, destacando suas principais funcionalidades.
            </Typography>
            <Typography variant="body2">
              - Preencha as URLs de desenvolvimento, homologação e produção corretamente.
            </Typography>
            <Typography variant="body2">
              - Não esqueça de fornecer o logo da aplicação.
            </Typography>
          </Box>
        }
      >
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
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <ReactQuill
            ref={quillRef}
            id='input-description'
            value={description}
            onChange={setDescription}
            placeholder="Descrição (máximo de 255 caracteres)"
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['link', 'image'],
                ['clean']                                         
              ]
            }}
            formats={[
              'header', 'font', 'size',
              'bold', 'italic', 'underline',
              'list', 'bullet',
              'link', 'image'
            ]}
            style={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
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
          id='input-url-development'
          variant="outlined"
          fullWidth
          required
          value={developUrl}
          onChange={(e) => setDevelopUrl(e.target.value)}
          error={!!errors.developUrl}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="URL de homologação"
          id='input-url-homologation'
          variant="outlined"
          fullWidth
          required
          value={homologUrl}
          onChange={(e) => setHomologUrl(e.target.value)}
          error={!!errors.homologUrl}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="URL de produção"
          id='input-url-production'
          variant="outlined"
          fullWidth
          required
          value={productionUrl}
          onChange={(e) => setProductionUrl(e.target.value)}
          error={!!errors.productionUrl}
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
          sx={{ marginBottom: 2 }}
        />
        <FormButton
          loading={loading}
          onClick={handleSubmit}
          id='button-manager-application'
          disabled={!name || !description || !developUrl || !homologUrl || !productionUrl || !logo}
        >
          {id ? 'Editar' : 'Salvar'}
        </FormButton>
      </FormContainer>
    </>
  );
};

export default ManageApplication;
