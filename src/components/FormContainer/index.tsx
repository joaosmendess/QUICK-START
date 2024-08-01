import React from 'react';
import { Box } from '@mui/material';

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px',
        maxWidth: '500px',
        margin: '0 auto',
         // Fundo branco para destacar o formulário
        borderRadius: '8px', // Bordas arredondadas
        
        '@media (max-width: 600px)': {
          padding: '16px',
          width: '90%', // Largura fluida no mobile
        },
      }}
    >
      {children}
    </Box>
  );
};

export default FormContainer;
