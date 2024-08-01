import React from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            
            borderRadius: 2, // Bordas suavemente arredondadas
          
           
            borderColor: 'divider', // Borda compatível com o tema
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default TabPanel;
