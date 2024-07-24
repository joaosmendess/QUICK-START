import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Container,
  Box,
  Button,
  Toolbar,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import { styled } from '@stitches/react';
import { getCompany, deleteCompany } from '../../../services/companyService';
import { Company } from '../../../types';
import { useNavigate } from 'react-router-dom';
import HeaderTable from '../../../components/HeaderTable';
import GenericTable from '../../../components/Table/GenericTable';
import Error from '../../../components/Messages/ErrorMessage';
import Success from '../../../components/Messages/SuccessMessage';

const ListContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh'
});

const ListCompany: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
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

  const handleEditClick = (company: Company) => {
    navigate(`/gerenciar-empresa/${company.id}`, { state: { company } });
  };

  const handleDeleteClick = (company: Company) => {
    setSelectedCompany(company);
    setConfirmOpen(true);
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
      setMessage({ type: 'success', text: 'Empresa excluída com sucesso!' });
      setSelectedCompany(null);
      setConfirmOpen(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao excluir empresa. Por favor, tente novamente.' });
      console.error('Erro ao excluir empresa:', error);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmOpen(false);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = ['name', 'cnpj'];

  return (
    <div>
      <Toolbar />
      <ListContainer maxWidth="md">
        {message && (message.type === 'success' ? (
          <Success message={message.text} />
        ) : (
          <Error message={message.text} />
        ))}
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
          <HeaderTable searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

          <GenericTable
            columns={columns}
            data={filteredCompanies}
            loading={loading}
            error={null}
            handleEdit={handleEditClick}
            handleDelete={handleDeleteClick}
          />

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

      <Dialog open={confirmOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Confirmar Exclusão
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir a empresa <strong>{selectedCompany?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListCompany;
