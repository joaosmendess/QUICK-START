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

export const listItemStyles: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  '@media (max-width: 600px)': {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export const listTextStyles: SxProps = {
  flexGrow: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '@media (max-width: 600px)': {
    maxWidth: 'calc(100% - 48px)', // Ajusta para o espaço do botão de menu
  },
};
