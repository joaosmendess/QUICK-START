import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Container,
  TextField,
  Box,
  CircularProgress,
  Button,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getCompany, deleteCompany } from '../../../services/companyService';
import { Company } from '../../../types';
import { useNavigate } from 'react-router-dom';

const ListContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh'
});

const ListBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxHeight: '60vh',
  overflowY: 'auto'
});

const ListCompany: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, last_page } = await getCompany(page);
        setCompanies(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        setTotalPages(last_page);
      } catch (error) {
        console.error('Erro ao buscar empresas', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, companyId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedCompanyId(companyId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCompanyId(null);
  };

  const handleEditClick = () => {
    if (selectedCompanyId !== null) {
      navigate(`/gerenciar-empresa/${selectedCompanyId}`);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (selectedCompanyId !== null) {
      const company = companies.find(company => company.id === selectedCompanyId);
      if (!company) {
        console.error('Empresa não encontrada');
        return;
      }
      setSelectedCompany(company);
    }
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCompany) {
      console.error('Nenhuma empresa selecionada para exclusão');
      return;
    }

    try {
      await deleteCompany(selectedCompany.id);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== selectedCompany.id)
      );
      setSelectedCompany(null);
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Toolbar />
      <ListContainer maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            sx={{ marginBottom: 2, width: '200px', maxWidth: '400px' }}
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <SearchIcon />
              ),
            }}
          />

          {loading ? (
            <CircularProgress />
          ) : (
            <ListBox>
              <List sx={{ width: '80%' }}>
                {filteredCompanies.map((company) => (
                  <ListItem key={company.id} secondaryAction={
                    <IconButton edge="end" onClick={(event) => handleMenuClick(event, company.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  }>
                    <ListItemText primary={company.name} secondary={`CNPJ: ${company.cnpj}`} />
                  </ListItem>
                ))}
              </List>
            </ListBox>
          )}

          <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Exportar para CSV
          </Button>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => setPage(value)}
            color="primary"
            sx={{ marginTop: 2 }}
          />
        </Box>
      </ListContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditClick}>Editar</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Excluir</MenuItem>
      </Menu>

      <Dialog open={Boolean(selectedCompany)} onClose={() => setSelectedCompany(null)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja excluir a empresa {selectedCompany?.name}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedCompany(null)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="primary">Excluir</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListCompany;
