// styles.ts
import { SxProps, Theme } from '@mui/material';

export const paperStyle: SxProps<Theme> = {
  p: 3,
  display: 'flex',
  alignItems: 'center',
  borderRadius: 2,
  height: '150px',
  backgroundColor: '#ffffff',
  border: '1px solid #D3D4D4',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
};

export const iconBoxStyle: SxProps<Theme> = {
  width: 56,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 3,
  color: '#ffffff',
  marginLeft: '8px',
};