import React, { useState } from 'react';
import { Container, TextField, Button, Toolbar, LinearProgress } from '@mui/material';
import { styled } from '@stitches/react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { createCompany } from '../../../services/auth';
import { Company } from '../../../types';
import Error from '../../../components/Messages/ErrorMessage';
import Success from '../../../components/Messages/SuccessMessage';

const FormContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  justifyContent: 'center',
  alignItems: 'center'
});

const formatCNPJ = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove todos os caracteres não numéricos
    .replace(/^(\d{2})(\d)/, '$1.$2') // Adiciona ponto após os dois primeiros dígitos
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Adiciona ponto após os próximos três dígitos
    .replace(/\.(\d{3})(\d)/, '.$1/$2') // Adiciona barra após os próximos três dígitos
    .replace(/(\d{4})(\d)/, '$1-$2') // Adiciona hífen após os próximos quatro dígitos
    .replace(/(-\d{2})\d+?$/, '$1'); // Limita o número de dígitos após o hífen
};

const cleanCNPJ = (value: string) => {
  return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
};

const ManageCompany: React.FC = () => {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnpj(formatCNPJ(e.target.value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const cleanedCnpj = cleanCNPJ(cnpj);
      const newCompany = await createCompany(name, cleanedCnpj);
      console.log('Empresa criada com sucesso:', newCompany);
      setMessage('Empresa criada com sucesso!');
      setSeverity('success');
      setName('');
      setCnpj('');
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      setMessage('Erro ao criar empresa');
      setSeverity('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Toolbar/>
      {loading && <LinearProgress />}
     
      <FormContainer maxWidth="xs">
        {severity === 'error' && <Error message={message as string} />}
        {severity === 'success' && <Success message={message as string} />}
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex.: Nome da Empresa"
          variant="outlined"
          required
          sx={{ marginBottom: 2, width: '400px' }}
        />
        <TextField
          label="CNPJ"
          value={cnpj}
          onChange={handleCnpjChange}
          placeholder="Ex.: 00.000.000/0000-00"
          variant="outlined"
          required
          sx={{ marginBottom: 2, width: '400px' }}
        />
        <Button
          startIcon={<AddCircleIcon />}
          sx={{ alignSelf: 'flex-start', marginTop: 2 }}
          onClick={handleSubmit}
        >
          Adicionar Aplicação
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Salvar
        </Button>
      </FormContainer>
    </>
  );
};

export default ManageCompany;
