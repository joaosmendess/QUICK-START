import React, { Suspense, useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Toolbar, Typography, Link, Fade } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessIcon from '@mui/icons-material/Business';
import DashboardCharts from '../../../components/DashboardCharts';
import { calculateUserStats, calculateUsersPerCompany } from './utils/dashboardUtils';
import { UserStats, UsersPerCompany } from './types';
import { getUsers } from '../../../services/authService';
import { getCompany, getUsersByCompanyId } from '../../../services/companyService';
import { paperStyle, iconBoxStyle } from './styles';

const Dashboard: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [usersPerCompany, setUsersPerCompany] = useState<UsersPerCompany>([]);
  const [usersByStatus, setUsersByStatus] = useState<{ name: string; active: number; inactive: number }[]>([]);
  const [, setName] = useState<string | null>(null);
  const [, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');
    setName(customerData.name);
    setUsername(customerData.username);

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Agrupando as requisições para otimizar a performance
      const [users, companies] = await Promise.all([getUsers(), getCompany(1)]);
      
      // Calculando estatísticas gerais de usuários
      const userStats = calculateUserStats(users);
      setUserStats({
        ...userStats,
        totalCompanies: companies.total,
      });

      // Calculando usuários por empresa
      const companyStats = calculateUsersPerCompany(users, companies.data);
      setUsersPerCompany(companyStats);

      // Obtendo usuários por empresa e calculando ativos e inativos
      const statusByCompany = await Promise.all(
        companies.data.map(async (company) => {
          const usersInCompany = await getUsersByCompanyId(company.id);
          const stats = calculateUserStats(usersInCompany);
          return {
            name: company.name,
            active: stats.activeUsers,
            inactive: stats.inactiveUsers,
          };
        })
      );
      setUsersByStatus(statusByCompany);

      // Após os dados serem carregados, desabilita o estado de carregamento
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  if (loading || !userStats) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg">
        <Fade in={!loading} timeout={1000}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ ...paperStyle, display: 'flex', alignItems: 'center', background: 'linear-gradient(to right, #FF4081, #FF80AB)' }}>
                <Box sx={{ ...iconBoxStyle, backgroundColor: '#FF4081' }}>
                  <PersonIcon sx={{ color: '#ffffff' }} />
                </Box>
                <Box sx={{ ml: 4 }}>
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>Total de Usuários</Typography>
                  <Typography variant="h4" sx={{ color: '#ffffff' }}>{userStats.totalUsers}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ color: '#ffffff', opacity: 0.8 }}>
                    +3% em relação ao mês passado
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ ...paperStyle, display: 'flex', alignItems: 'center', background: 'linear-gradient(to right, #2196F3, #64B5F6)' }}>
                <Box sx={{ ...iconBoxStyle, backgroundColor: '#2196F3' }}>
                  <AssessmentIcon sx={{ color: '#ffffff' }} />
                </Box>
                <Box sx={{ ml: 4 }}>
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>Status dos Usuários</Typography>
                  <Typography component="p" variant="h6" color="#ffffff">
                    Ativos: {userStats.activeUsers}
                  </Typography>
                  <Typography component="p" variant="h6" color="#ffffff">
                    Inativos: {userStats.inactiveUsers}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ ...paperStyle, display: 'flex', alignItems: 'center', background: 'linear-gradient(to right, #4CAF50, #81C784)' }}>
                <Box sx={{ ...iconBoxStyle, backgroundColor: '#4CAF50' }}>
                  <BusinessIcon sx={{ color: '#ffffff' }} />
                </Box>
                <Box sx={{ ml: 4 }}>
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>Total de Empresas</Typography>
                  <Typography variant="h4" sx={{ color: '#ffffff' }}>{userStats.totalCompanies}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ color: '#ffffff', opacity: 0.8 }}>
                    +5% em relação ao mês passado
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Fade>
        <Suspense fallback={<div>Loading Charts...</div>}>
          <DashboardCharts 
            usersPerCompany={usersPerCompany} 
            usersByStatus={usersByStatus}
          />
        </Suspense>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
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
