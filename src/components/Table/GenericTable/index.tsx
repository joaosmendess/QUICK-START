import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tooltip,
  Box,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface TableData {
  [key: string]: any;
}

interface GenericTableProps<T> {
  columns: string[];
  data: T[];
  loading: boolean;
  error: string | null;
  handleEdit: (item: T) => void;
  handleDelete: (item: T) => void;
}

const columnLabels: { [key: string]: string } = {
  name: 'Nome',
  username: 'Nome de usuário',
  invitationEmail: 'Email de Convite',
  description: 'Descrição',
  status: 'Status',
  // Adicione outros mapeamentos de colunas conforme necessário
};

const statusStyles: { [key: string]: { color: string; backgroundColor: string } } = {
  Ativo: { color: 'green', backgroundColor: '#D3EAE2' },
  Inativo: { color: 'red', backgroundColor: '#F8DCD9' },
};

const GenericTable = <T extends TableData>({
  columns, data, loading, error, handleEdit, handleDelete
}: GenericTableProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<null | T>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Novo estado para busca

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, item: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleEditClick = () => {
    if (selectedItem) {
      handleEdit(selectedItem);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (selectedItem) {
      setConfirmOpen(true);
    }
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      handleDelete(selectedItem);
    }
    setConfirmOpen(false);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmOpen(false);
  };

  // Filtra os dados com base no termo de busca
  const filteredData = data.filter(item =>
    columns.some(column =>
      item[column].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
     <TableContainer 
  component={Paper} 
  elevation={3} 
  sx={{ 
    borderRadius: 2, 
    overflowX: 'auto', 
    width: '100%', 
    mt: 2 
  }}
>
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center', 
      p: 2,
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #e0e0e0',
      flexWrap: 'wrap',
    }}
  >
    <TextField
      variant="outlined"
      placeholder="Procurar"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ 
        width: { xs: '100%', sm: 'auto' },
        mb: { xs: 2, sm: 0 } 
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </Box>
  {loading ? (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
      <CircularProgress />
    </Box>
  ) : (
    <>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {filteredData.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ p: 2 }}>Nenhum dado encontrado</Typography>
      ) : (
        <Table sx={{ minWidth: 650, tableLayout: 'fixed' }}>
          <TableHead sx={{ backgroundColor: '#000' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  sx={{ 
                    color: 'white', 
                    fontWeight: 'bold', 
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    px: { xs: 1, sm: 2 }, 
                    py: { xs: 1, sm: 2 },
                    display: { xs: column === 'description' ? 'none' : 'table-cell', sm: 'table-cell' }
                  }}
                >
                  {columnLabels[column] || column}
                </TableCell>
              ))}
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 } }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    sx={{ 
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      px: { xs: 1, sm: 2 }, 
                      py: { xs: 1, sm: 2 },
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      display: { xs: column === 'description' ? 'none' : 'table-cell', sm: 'table-cell' }
                    }}
                  >
                    {column === 'status' ? (
                      <Chip
                        label={item[column]}
                        sx={statusStyles[item[column]]}
                        size="small"
                      />
                    ) : (
                      item[column]
                    )}
                  </TableCell>
                ))}
                <TableCell sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                  <Tooltip title="Ações" arrow>
                    <IconButton id="menu" onClick={(event) => handleMenuClick(event, item)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem id="menu-edit" onClick={handleEditClick}>Editar</MenuItem>
                    <MenuItem id="menu-delete" onClick={handleDeleteClick}>Excluir</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )}
</TableContainer>

      <Dialog open={confirmOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Confirmar Exclusão
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir este item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GenericTable;
