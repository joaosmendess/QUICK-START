import React, { useState, useEffect } from 'react';

import { Container, TextField, Box, CircularProgress, Snackbar, Alert, Toolbar } from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';


const ListContainer = styled(Container, {
  marginTop: '20px',
});

const ListApplication: React.FC = () => {
  

  
  return (
    <div>
      <Toolbar/>
      <ListContainer maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            fullWidth
          
            InputProps={{
              endAdornment: (
                <SearchIcon />
              ),
            }}
          />
        </Box>
       
      </ListContainer>
      
    </div>
  );
};

export default ListApplication;
