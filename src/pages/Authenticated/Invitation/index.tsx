import React, { useState, useEffect } from 'react';
import { Select, MenuItem, TextField, Toolbar, Box, FormControl, InputLabel } from '@mui/material';
import { getCompany } from '../../../services/companyService';
import { inviteUser } from '../../../services/inviteService';
import { Company } from '../../../types';
import FormContainer from '../../../components/FormContainer';
import FormButton from '../../../components/FormButton';
import Error from '../../../components/Messages/ErrorMessage';
import Success from '../../../components/Messages/SuccessMessage';

const Invitation: React.FC = () => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompany(1); // Fetch first page of companies
        setCompanies(response.data);
      } catch (error) {
        setError('Erro ao buscar empresas');
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      await inviteUser(email, parseInt(company, 10));
      setSuccessMessage('Convite enviado com sucesso!');
      setEmail('');
      setCompany('');
    } catch (error) {
      setError('Erro ao enviar convite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toolbar />
      <FormContainer>
        {error && <Error message={error} />}
        {successMessage && <Success message={successMessage} />}
        <form onSubmit={handleSubmit}>
          <Box 
            display="flex" 
            flexDirection="column" 
            width={{ xs: '100%', sm: '35rem' }}
            maxWidth="100%"
          >
            <TextField
              placeholder='E-mail para convite'
              id='input-invitation-email'
              variant='outlined'
              label='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <FormControl variant="outlined" fullWidth required margin="normal">
              <InputLabel>Empresa</InputLabel>
              <Select
                value={company}
                id='select-company-id'
                onChange={(e) => setCompany(e.target.value as string)}
                label='Empresa'
              >
                {companies.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="center" width="100%">
            <FormButton 
              loading={loading} 
              type="submit" 
              disabled={loading || !email || !company}
              id="button-invite"
            >
              Enviar Convite
            </FormButton>
          </Box>
        </form>
      </FormContainer>
    </div>
  );
};

export default Invitation;
