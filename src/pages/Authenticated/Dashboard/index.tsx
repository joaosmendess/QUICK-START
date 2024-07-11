import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Toolbar, Typography, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessIcon from '@mui/icons-material/Business';
import { getUsers, getCompany } from '../../../services/auth'; // Altere para o caminho correto
import { paperStyle, iconBoxStyle, iconBoxBlueStyle, containerStyle, footerStyle, flexGrowStyle, iconBoxGreenStyle } from './styles';
import DashboardCharts from '../../../components/DashboardCharts';

interface User {
  id: number;
  name: string;
  userName: string;
  empresa_id?: number;
  status: string;
  created_at: string;
  updated_at: string;
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
    setName(localStorage.getItem('name'));
    setUsername(localStorage.getItem('userName'));

    const fetchData = async () => {
      const users = await getUsers();
      const activeUsersCount = users.filter(user => user.status === 'Ativo').length;
      const inactiveUsersCount = users.filter(user => user.status === 'Inativo').length;

      setTotalUsers(users.length);
      setActiveUsers(activeUsersCount);
      setInactiveUsers(inactiveUsersCount);

      const companyData = await getCompany(1); // Chama a função getCompany com o argumento de página
      setTotalCompanies(companyData.total);

      // Obter todos os nomes de empresas
      const allCompanies: Company[] = [];
      for (let page = 1; page <= companyData.last_page; page++) {
        const { data } = await getCompany(page);
        allCompanies.push(...data);
      }

      const companyNames = allCompanies.reduce((acc: { [key: number]: string }, company: Company) => {
        acc[company.id] = company.name;
        return acc;
      }, {});

      // Processando dados de usuários cadastrados por dia
      const usersByDay = users.reduce((acc: { [key: string]: number }, user: User) => {
        const date = new Date(user.created_at);
        const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'short' });
        if (!acc[dayOfWeek]) acc[dayOfWeek] = 0;
        acc[dayOfWeek]++;
        return acc;
      }, {});

      const daysOfWeek = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'];
      const usersRegisteredData = daysOfWeek.map(day => ({
        name: day,
        value: usersByDay[day] || 0
      }));

      setUsersRegisteredPerDay(usersRegisteredData);

      // Processando dados de usuários por empresa
      const usersByCompany = users.reduce((acc: { [key: number]: number }, user: User) => {
        if (user.empresa_id !== undefined) {
          if (!acc[user.empresa_id]) acc[user.empresa_id] = 0;
          acc[user.empresa_id]++;
        }
        return acc;
      }, {});

      const usersPerCompanyData = Object.keys(usersByCompany).map(companyId => ({
        name: companyNames[Number(companyId)] ,
        value: usersByCompany[Number(companyId)]
      }));

      setUsersPerCompany(usersPerCompanyData);

      // Processando dados de usuários por status
      const usersByStatusData = daysOfWeek.map(day => ({
        name: day,
        active: users.filter(user => new Date(user.created_at).toLocaleDateString('pt-BR', { weekday: 'short' }) === day && user.status === 'Ativo').length,
        inactive: users.filter(user => new Date(user.created_at).toLocaleDateString('pt-BR', { weekday: 'short' }) === day && user.status === 'Inativo').length
      }));

      setUsersByStatus(usersByStatusData);
    };

    fetchData();
  }, []);

  return (
    <>
 {/* Adiciona espaço para o AppBar */}
<Toolbar/>
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
