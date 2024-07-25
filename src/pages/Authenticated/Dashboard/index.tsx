import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Toolbar, Typography, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessIcon from '@mui/icons-material/Business';
import { getUsers } from '../../../services/authService';
import { getCompany } from '../../../services/companyService';
import { paperStyle, iconBoxStyle, iconBoxBlueStyle, containerStyle, footerStyle, flexGrowStyle, iconBoxGreenStyle } from './styles';
import DashboardCharts from '../../../components/DashboardCharts';

interface User {
  id: number;
  name: string;
  username: string;
  companyId?: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

interface Company {
  id: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [inactiveUsers, setInactiveUsers] = useState<number>(0);
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [usersRegisteredPerDay, setUsersRegisteredPerDay] = useState<{ name: string, value: number }[]>([]);
  const [usersPerCompany, setUsersPerCompany] = useState<{ name: string, value: number }[]>([]);
  const [usersByStatus, setUsersByStatus] = useState<{ name: string, active: number, inactive: number }[]>([]);

  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');
    setName(customerData.name);
    setUsername(customerData.username);

    // Fetch data for users and companies
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const users = await getUsers();
      const companies = await getCompany(1); // Assuming page 1 for simplicity
      setTotalUsers(users.length);
      setTotalCompanies(companies.total);

      const active = users.filter((user: User) => user.status === 'active').length;
      const inactive = users.length - active;
      setActiveUsers(active);
      setInactiveUsers(inactive);

      const usersByDay = users.reduce((acc: any, user: User) => {
        if (user.created_at) {
          const date = new Date(user.created_at).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
        }
        return acc;
      }, {});
      setUsersRegisteredPerDay(Object.keys(usersByDay).map(date => ({ name: date, value: usersByDay[date] })));

      const usersByCompany = users.reduce((acc: any, user: User) => {
        const companyName = companies.data.find((c: Company) => c.id === user.companyId)?.name || 'Unknown';
        acc[companyName] = (acc[companyName] || 0) + 1;
        return acc;
      }, {});
      setUsersPerCompany(Object.keys(usersByCompany).map(company => ({ name: company, value: usersByCompany[company] })));

      setUsersByStatus([{ name: 'Users', active, inactive }]);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={containerStyle}>
        <Grid container spacing={5}>
          {/* Card de Usuários Totais */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper sx={paperStyle}>
              <Box sx={iconBoxStyle}>
                <PersonIcon sx={{ color: '#ffffff', fontSize: '2rem' }} />
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" color="textSecondary">
                  Total de Usuários
                </Typography>
                <Typography variant="h4" color="textPrimary">
                 {totalUsers}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  +3% em relação ao mês passado
                </Typography>
              </Box>
            </Paper>
          </Grid>
          {/* Card de Status dos Usuários */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={paperStyle}>
              <Box sx={iconBoxBlueStyle}>
                <AssessmentIcon sx={{ color: '#ffffff', fontSize: '2rem' }} />
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h6" color="textSecondary">
                  Status dos Usuários
                </Typography>
                <Typography component="p" variant="h4" color="success.main">
                  Ativos: {activeUsers}
                </Typography>
                <Typography component="p" variant="h4" color="error.main">
                  Inativos: {inactiveUsers}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          {/* Card de Empresas Totais */}
          <Grid item xs={12} md={4} lg={5}>
            <Paper sx={paperStyle}>
              <Box sx={iconBoxGreenStyle}>
                <BusinessIcon sx={{ color: '#ffffff', fontSize: '2rem' }} />
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h6" color="textSecondary">
                  Total de Empresas
                </Typography>
                <Typography variant="h4" color="textPrimary">
                  {totalCompanies}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  +5% em relação ao mês passado
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <br />
        {/* Gráficos */}
        <Grid container spacing={0}>
           <DashboardCharts 
            usersRegisteredPerDay={usersRegisteredPerDay} 
            usersPerCompany={usersPerCompany} 
            usersByStatus={usersByStatus}
          />
          {/* Card com Nome e Username */}
          <Grid item xs={12}>
            <Paper sx={{ ...paperStyle, justifyContent: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Usuário Logado
              </Typography>
              <Typography variant="h5" noWrap>
                Nome: {name}
              </Typography>
              <Typography variant="h5" noWrap>
                Usuário: {username}
              </Typography>
              <Box sx={flexGrowStyle} />
            </Paper>
          </Grid>
        </Grid>
        <Box sx={footerStyle}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://ofm.com.br/">
              Ofm System
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
