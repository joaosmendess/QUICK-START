import React, { useState, useEffect } from 'react';
import { TextField, Toolbar, LinearProgress, Grid, Tabs, Tab, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { createCompany, getCompanyById, updateCompany } from '../../../services/companyService';
import Error from '../../../components/Messages/ErrorMessage';
import Success from '../../../components/Messages/SuccessMessage';
import FormContainer from '../../../components/FormContainer'; // Certifique-se de importar o FormContainer
import FormButton from '../../../components/FormButton'; // Certifique-se de importar o FormButton

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
  const { id } = useParams<{ id: string }>();
  const [tabIndex, setTabIndex] = useState(0);
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [ssoName, setSsoName] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCompanyData(id);
    }
  }, [id]);

  const fetchCompanyData = async (companyId: string) => {
    setLoading(true);
    try {
      const company = await getCompanyById(Number(companyId));
      setName(company.name);
      setTag(company.tag);
      setCnpj(formatCNPJ(company.cnpj));
      setClientId(company.clientId || '');
      setClientSecret(company.clientSecret || '');
      setTenantId(company.tenantId || '');
      setSsoName(company.ssoName || '');
      setRedirectUrl(company.redirectUrl || '');
    } catch (error) {
      console.error('Erro ao buscar dados da empresa:', error);
      setMessage('Erro ao buscar dados da empresa');
      setSeverity('error');
    } finally {
      setLoading(false);
    }
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnpj(formatCNPJ(e.target.value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const cleanedCnpj = cleanCNPJ(cnpj);
      const companyData = { name, tag, cnpj: cleanedCnpj, ssoName, clientId, clientSecret, tenantId, redirectUrl };

      if (id) {
        await updateCompany(Number(id), companyData);
        setMessage('Empresa atualizada com sucesso!');
      } else {
        await createCompany(name, tag, cleanedCnpj, ssoName, clientId, clientSecret, tenantId, redirectUrl);
        setMessage('Empresa criada com sucesso!');
      }
      setSeverity('success');
    } catch (error) {
      console.error('Erro ao salvar empresa:', error);
      setMessage('Erro ao salvar empresa');
      setSeverity('error');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.ChangeEvent<object>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Toolbar />
      {loading && <LinearProgress />}
      <FormContainer>
        {severity === 'error' && <Error message={message as string} />}
        {severity === 'success' && <Success message={message as string} />}
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Dados Principais" />
          <Tab label="Dados SSO Externo" />
        </Tabs>
        <Box mt={2} width="100%">
          {tabIndex === 0 && (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  label="Nome"
                  id='input-name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex.: Nome da Empresa"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tag"
                  id='input-tag'
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Ex.: tag da empresa"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="CNPJ"
                  id='input-cnpj'
                  value={cnpj}
                  onChange={handleCnpjChange}
                  placeholder="Ex.: 00.000.000/0000-00"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="URL de Redirecionamento"
                  id='input-redirect-url'
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  placeholder="Ex.: https://exemplo.com/redirect"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          )}
          {tabIndex === 1 && (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <TextField
                  label="Client ID"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Client ID"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Client Secret"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="Client Secret"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tenant ID"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  placeholder="Tenant ID"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nome do SSO"
                  value={ssoName}
                  onChange={(e) => setSsoName(e.target.value)}
                  placeholder="Nome do SSO"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          )}
        </Box>
        <Grid container spacing={1} justifyContent="center" mt={2}>
          <Grid item xs={0} md={3}>
            <FormButton
              loading={loading}
              onClick={handleSubmit}
              disabled={!name || !tag || !cnpj || !redirectUrl}
            >
              Salvar
            </FormButton>
          </Grid>
        </Grid>
      </FormContainer>
    </>
  );
};

export default ManageCompany;
