import React from 'react';
import { Box, TextField, InputAdornment, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface HeaderTableProps {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortOption: string;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
}

const HeaderTable: React.FC<HeaderTableProps> = ({ searchTerm, handleSearchChange, sortOption, handleSortChange }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        marginBottom: 2, 
        padding: 2, 
        backgroundColor: 'background.paper', 
        borderRadius: 1, 
        boxShadow: 1,
      }}
    >
      <TextField
        variant="outlined"
        id='input-search'
        placeholder="Procurar"
        sx={{ 
          width: '100%', 
          maxWidth: '400px',
          backgroundColor: 'background.default', // Mantém o campo no estilo do tema
          borderRadius: 1, // Ajuste de bordas
          '& .MuiOutlinedInput-root': {
            padding: '0 10px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider', // Usar uma cor neutra para a borda
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'text.primary',
          },
        }}
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default HeaderTable;
