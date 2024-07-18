import { SxProps } from '@mui/material';

export const containerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  p: 2,
  gap: 2,
  maxWidth: '600px',
  margin: 'auto',
  '@media (max-width: 600px)': {
    padding: '16px',
  },
};

export const buttonStyles: SxProps = {
  textTransform: 'none',
};
