import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

interface FormContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  sideContent?: React.ReactNode;
  maxWidth?: string | number;
  background?: string;
  showShadow?: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  title,
  description,
  sideContent,
  maxWidth = '800px',
  background = 'linear-gradient(135deg, #f8f8f8 0%, #ececec 100%)',
  showShadow = true,
}) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: { xs: '16px', sm: '24px' },
        maxWidth: maxWidth,
        margin: '0 auto',
        background: background,
        borderRadius: '16px',
        boxShadow: showShadow ? '0px 4px 20px rgba(0,0,0,0.1)' : 'none',
        border: '1px solid #ddd',
        backdropFilter: 'blur(5px)',
        color: '#333',
        transition: 'all 0.3s ease-in-out',
        mt: 5,
        '@media (max-width: 600px)': {
          width: '100%',
          padding: '16px',
        },
      }}
    >
      {title && (
        <Typography variant="h5" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: '#666' }}>
          {description}
        </Typography>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={sideContent ? 8 : 12}>
          {children}
        </Grid>
        {sideContent && (
          <Grid item xs={12} md={4}>
            <Box 
              sx={{
                background: 'repeating-radial-gradient(circle at 90%, var(--color-background), var(--color-background) 38px, var(--color-default-white) 20px, var(--color-default-white) 39px) !important',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
                color: 'var(--color-default-gft)', // Usei a cor padrão como cor do texto para manter a visibilidade
              }}
            >
              {sideContent}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FormContainer;
