import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir esta permissão?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary" disabled={loading} autoFocus>
          {loading ? <CircularProgress size={24} /> : 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
