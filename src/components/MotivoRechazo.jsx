import { useState } from "react";
import { Button, Dialog, DialogContent, Container, DialogActions, DialogTitle, IconButton, TextField, DialogContentText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const MotivoRechazo = (props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // prevenir el comportamiento por defecto del formulario
    props.onClose(); // Llamada a la función onClose para cerrar el modal
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '70px' }}>
      {props.open && (
        <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md">
          <DialogTitle sx={{ m: 0, p: 2 }} style={{marginTop: "5px", marginBottom: "20px"}}>
            <DialogContentText>Rechazar Solicitud de {props?.alumnoEliminado?.nombre}</DialogContentText>
            <IconButton
              style={{marginTop: "5px", marginBottom: "5px"}}
              aria-label="close"
              onClick={props.handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <TextField
              label="Motivo del rechazo"
              variant="outlined"
              fullWidth
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button autoFocus color="success" variant="contained" onClick={(e) => props.eliminarAlumno(e, message)}>
              Enviar Confirmacion de Rechazo
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default MotivoRechazo;
