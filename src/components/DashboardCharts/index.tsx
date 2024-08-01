import React, { useMemo } from 'react';
import { Paper, Typography } from '@mui/material';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardChartsProps {
  usersPerCompany: { name: string; value: number }[];
  usersByStatus: { name: string; active: number; inactive: number }[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ usersPerCompany, usersByStatus }) => {
  // Memoize combinedData to avoid unnecessary recalculations on re-renders
  const combinedData = useMemo(() => 
    usersPerCompany.map((company) => {
      const status = usersByStatus.find((status) => status.name === company.name);
      return {
        name: company.name,
        usuariosPorEmpresa: company.value,
        ativo: status ? status.active : 0,
        inativo: status ? status.inactive : 0,
      };
    }), 
    [usersPerCompany, usersByStatus]
  );

  return (
    <Paper
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        borderRadius: '6px',
        backgroundColor: '#ffffff',
        marginBottom: '24px',
        height: '400px',
        border: '1px solid #D3D4D4'
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: '16px',
          fontWeight: 600,
          color: '#3b3b3b',
        }}
      >
        Visão Geral
      </Typography>

      <ResponsiveContainer width="100%" height="80%">
        <ComposedChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="usuariosPorEmpresa" barSize={20} fill="#8884d8" />
          <Line type="monotone" dataKey="ativo" stroke="#4CAF50" strokeWidth={2} />
          <Line type="monotone" dataKey="inativo" stroke="#FF0000" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>

      <Typography
        variant="body2"
        sx={{
          marginTop: '16px',
          color: '#888888',
        }}
      >
        Gráfico mostrando usuários por empresa e status de atividade.
      </Typography>
    </Paper>
  );
};

export default DashboardCharts;
