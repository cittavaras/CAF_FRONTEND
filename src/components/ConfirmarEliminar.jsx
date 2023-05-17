import { Button, Dialog, Container, DialogActions, DialogTitle, IconButton, TextField, DialogContentText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ConfirmarEliminar = (props) => {

  return (
    <Container maxWidth="lg" style={{ marginTop: '70px' }}>
      {props.open && (
        <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md">
          <DialogTitle style={{marginTop: "5px", marginBottom: "20px", fontSize: "bold", color: "black"}}>
            <DialogContentText> ¿Estas seguro? que desea eliminar la cuenta de {props?.alumnoEliminado?.nombre}</DialogContentText>
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
          <DialogActions>
            <Button autoFocus color="success" variant="contained" onClick={(e) => props.eliminarAlumno(e)}>
              CONFIRMAR
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default ConfirmarEliminar;