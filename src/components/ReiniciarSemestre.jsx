import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import useAxiosInterceptors from '../auth/axiosResponse';
import baseURL from '../helpers/rutaBase';

const StyledDialogTitle = styled(DialogTitle)`
  margin-top: 5px;
  margin-bottom: 20px;
`;

const StyledIconButton = styled(IconButton)`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TitleContainer = styled(Box)`
  text-align: center;
  margin-bottom: 16px;
`;

const ConfirmPhraseTypography = styled(Typography)`
  margin-bottom: 24px;
  text-align: center;
`;

const ReiniciarSemestre = (props) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const [inputValue, setInputValue] = useState('');
  const [phrase, setPhrase] = useState('reiniciar semestre');
  const theme = useTheme();

  useAxiosInterceptors();

  const handleConfirm = async () => {
    if (inputValue === phrase) {
      await axios.post(baseURL + '/alumnos/resetSemester', {}, {
        headers: {
          'Authorization': accessToken // Include the JWT token in the Authorization header
        },
      });
      alert('Reinicio de Semestre Confirmado!');
      setInputValue('');
    } else {
      alert('Frase Incorrecta!');
      setInputValue('');
    }
    props.handleClose();
  };

  const handleCloseModal = () => {
    setInputValue('');
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="sm"
    >
      <StyledDialogTitle>
        <StyledIconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </StyledIconButton>
        Confirmar Reinicio Semestre
      </StyledDialogTitle>
      <DialogContent>
        <ConfirmPhraseTypography variant="body1" component="p">
          Escribir frase para confirmar:
        </ConfirmPhraseTypography>
        <ConfirmPhraseTypography variant="body2" component="p">
          {phrase}
        </ConfirmPhraseTypography>
        <TextField
          fullWidth
          type="text"
          placeholder="Escribir frase"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm} style={{ backgroundColor: 'red' }}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReiniciarSemestre;
