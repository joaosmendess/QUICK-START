// styles.ts
import { SxProps, Theme } from '@mui/material';

export const paperStyle: SxProps<Theme> = {
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: 3,
  borderRadius: 2,
  Height: 200,
  position: 'relative',
  backgroundColor: '#ffffff',
};

export const iconBoxStyle: SxProps<Theme> = {
  position: 'absolute',
  top: -25,
  left: 16,
  bgcolor: '#FF4081',
  borderRadius: '8px',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 3,
  zIndex: 1,
};

export const iconBoxBlueStyle: SxProps<Theme> = {
  position: 'absolute',
  top: -25,
  left: 16,
  bgcolor: '#2196F3', // Cor azul
  borderRadius: '8px',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 3,
  zIndex: 1,
};

export const containerStyle: SxProps<Theme> = {
  mt: 4,
  mb: 4,
};

export const footerStyle: SxProps<Theme> = {
  pt: 4,
};

export const flexGrowStyle: SxProps<Theme> = {
  flexGrow: 1,
};
