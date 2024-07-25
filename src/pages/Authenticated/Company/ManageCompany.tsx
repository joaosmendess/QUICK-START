import React, { useState, useEffect } from 'react';
import { TextField, Toolbar, LinearProgress, Grid, Tabs, Tab, Box, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput, SelectChangeEvent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { createCompany, getCompanyById, updateCompany } from '../../../services/companyService';
import { fetchApplications } from '../../../services/applicationService';
import Error from '../../../components/Messages/ErrorMessage';
import Success from '../../../components/Messages/SuccessMessage';
import FormContainer from '../../../components/FormContainer';
import FormButton from '../../../components/FormButton';
import { Application, Company } from '../../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ManageCompany: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tabIndex, setTabIndex] = useState(0);
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [applicationIds, setApplicationIds] = useState<number[]>([]);
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [ssoName, setSsoName] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCompanyData(id);
    }
    fetchAllApplications();
  }, [id]);

  const fetchCompanyData = async (companyId: string) => {
    setLoading(true);
    try {
      const company: Company = await getCompanyById(Number(companyId));
      setName(company.name);
      setTag(company.tag);
      setCnpj(company.cnpj);
      setRedirectUrl(company.redirectUrl || '');
      setApplicationIds(company.applications.map((app: Application) => app.id).filter((id): id is number => id !== undefined));
      setClientId(company.clientId || '');
      setClientSecret(company.clientSecret || '');
      setTenantId(company.tenantId || '');
      setSsoName(company.ssoName || '');
    } catch (error) {
      console.error('Erro ao buscar dados da empresa:', error);
      setMessage('Erro ao buscar dados da empresa');
      setSeverity('error');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllApplications = async () => {
    try {
      const applicationsData = await fetchApplications();
      setApplications(applicationsData);
    } catch (error) {
      console.error('Erro ao buscar aplicações:', error);
      setMessage('Erro ao buscar aplicações');
      setSeverity('error');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const companyData = { name, cnpj, redirectUrl, applicationIds, clientId, clientSecret, tenantId, ssoName };

      if (id) {
        await updateCompany(Number(id), companyData);
        setMessage('Empresa atualizada com sucesso!');
      } else {
        await createCompany(name, cnpj, applicationIds, redirectUrl, ssoName, clientId, clientSecret, tenantId);
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

  const handleApplicationsChange = (event: SelectChangeEvent<number[]>) => {
    setApplicationIds(event.target.value as number[]);
  };

  return (
    <>
      <Toolbar />
      {loading && <LinearProgress />}
      <FormContainer>
        {severity === 'error' && <Error message={message as string} />}
        {severity === 'success' && <Success message={message as string} />}
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab id="tab-dados-principais" label="Dados Principais" />
          <Tab id="tab-dados-sso-externo" label="Dados SSO Externo" />
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
                  label="CNPJ"
                  id='input-cnpj'
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
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
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="applications-label">Aplicações</InputLabel>
                  <Select
                    labelId="applications-label"
                    id="select-applications"
                    multiple
                    value={applicationIds}
                    onChange={handleApplicationsChange}
                    input={<OutlinedInput label="Aplicações" />}
                    renderValue={(selected) => (
                      (selected as number[]).map(id => {
                        const app = applications.find(app => app.id === id);
                        return app ? app.name : '';
                      }).join(', ')
                    )}
                    MenuProps={MenuProps}
                  >
                    {applications.map((app) => (
                      <MenuItem key={app.id} value={app.id!}>
                        <Checkbox checked={applicationIds.indexOf(app.id!) > -1} id={`checkbox-application-${app.id}`} />
                        <ListItemText primary={app.name} id={`listitem-application-${app.id}`} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
          {tabIndex === 1 && (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <TextField
                  label="Client ID"
                  id='input-client-id'
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
                  id='input-client-secret'
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
                  id='input-tenant-id'
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
                  id='input-sso-name'
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
         
            <FormButton
              loading={loading}
              id='button-manager-company'
              onClick={handleSubmit}
              disabled={!name || !cnpj || !redirectUrl}
            >
              Salvar
            </FormButton>
       
        </Grid>
      </FormContainer>
    </>
  );
};

export default ManageCompany;
