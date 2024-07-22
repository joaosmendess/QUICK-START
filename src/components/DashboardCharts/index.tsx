import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const paperStyle = {
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: 3,
  borderRadius: 2,
  height: 300,
  position: 'relative',
  backgroundColor: '#ffffff',
  marginBottom: '20px',
};

interface DashboardChartsProps {
  usersRegisteredPerDay: { name: string, value: number }[];
  usersPerCompany: { name: string, value: number }[];
  usersByStatus: { name: string, active: number, inactive: number }[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ usersRegisteredPerDay, usersPerCompany, usersByStatus }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={paperStyle}>
          <Typography variant="h6" color="textSecondary">
            Usuários Cadastrados por Dia
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={usersRegisteredPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF4081" />
            </BarChart>
          </ResponsiveContainer>
          <Typography variant="body2" color="textSecondary">
            Total de usuários cadastrado por dia
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={paperStyle}>
          <Typography variant="h6" color="textSecondary">
            Usuários por Status
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={usersByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="active" stroke="#4CAF50" />
              <Line type="monotone" dataKey="inactive" stroke="#FF0000" />
            </LineChart>
          </ResponsiveContainer>
          <Typography variant="body2" color="textSecondary">
            Usuários ativos e inativos por dia
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={paperStyle}>
          <Typography variant="h6" color="textSecondary">
            Usuários por Empresa
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={usersPerCompany}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={false} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
          <Typography variant="body2" color="textSecondary">
            Total de Usuários por Empresa
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardCharts;
