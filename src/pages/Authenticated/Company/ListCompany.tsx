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
  Grid,
  LinearProgress
} from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getCompany, updateCompany, deleteCompany } from '../../../services/companyService';
import { Company } from '../../../types';

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
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editCompanyData, setEditCompanyData] = useState<Partial<Company>>({});
  const [saving, setSaving] = useState(false);

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
    if (selectedCompanyId === null) {
      console.error('Nenhuma empresa selecionada para edição');
      return;
    }
    const company = companies.find(company => company.id === selectedCompanyId);
    if (!company) {
      console.error('Empresa não encontrada');
      return;
    }
    setSelectedCompany(company);
    setEditCompanyData(company);
    setOpenEditDialog(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (selectedCompanyId === null) {
      console.error('Nenhuma empresa selecionada para exclusão');
      return;
    }
    const company = companies.find(company => company.id === selectedCompanyId);
    if (!company) {
      console.error('Empresa não encontrada');
      return;
    }
    setSelectedCompany(company);
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditCompanyData({
      ...editCompanyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSave = async () => {
    if (!selectedCompany) {
      console.error('Nenhuma empresa selecionada para edição');
      setOpenEditDialog(false); // Fechar o diálogo de edição se não houver empresa selecionada
      return;
    }
  
    const updatedData: Partial<Company> = {
      name: editCompanyData.name ?? selectedCompany.name,
      tag: editCompanyData.tag ?? selectedCompany.tag,
      cnpj: editCompanyData.cnpj ?? selectedCompany.cnpj,
      ssoName: editCompanyData.ssoName ?? selectedCompany.ssoName ?? '',
      clientId: editCompanyData.clientId ?? selectedCompany.clientId ?? '',
      clientSecret: editCompanyData.clientSecret ?? selectedCompany.clientSecret ?? '',
      tenantId: editCompanyData.tenantId ?? selectedCompany.tenantId ?? '',
      redirectUrl: editCompanyData.redirectUrl ?? selectedCompany.redirectUrl ?? ''
    };
  
    setSaving(true);
    try {
      console.log("Dados enviados para o backend:", updatedData);
      await updateCompany(selectedCompany.id, updatedData);
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === selectedCompany.id ? { ...company, ...updatedData } : company
        )
      );
      setOpenEditDialog(false); // Fechar o diálogo de edição após salvar com sucesso
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error);
    } finally {
      setSaving(false);
    }
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
      setOpenDeleteDialog(false);
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

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        {saving && <LinearProgress />}
        <DialogTitle sx={{ marginBottom: 1 }}>Editar Empresa</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                name="name"
                value={editCompanyData.name || ''}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tag"
                name="tag"
                value={editCompanyData.tag || ''}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="CNPJ"
                name="cnpj"
                value={editCompanyData.cnpj || ''}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="SSO Name"
                name="ssoName"
                value={editCompanyData.ssoName || ''}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Client ID"
                name="clientId"
                value={editCompanyData.clientId || ''}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Client Secret"
                name="clientSecret"
                value={editCompanyData.clientSecret || ''}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tenant ID"
                name="tenantId"
                value={editCompanyData.tenantId || ''}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="URL de Redirecionamento"
                name="redirectUrl"
                value={editCompanyData.redirectUrl || ''}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleEditSave} color="primary" disabled={saving}>Salvar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja excluir a empresa {selectedCompany?.name}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="primary">Excluir</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListCompany;
