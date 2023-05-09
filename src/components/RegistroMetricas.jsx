import { useState } from "react";
import { Button, Dialog, DialogContent, Container, DialogActions, DialogTitle, IconButton, TextField, DialogContentText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const RegistroMetricas = (props) => {
  const [edad, setEdad] = useState("");
  const [imc, setImc] = useState("");
  const [grasaVisceral, setGrasaVisceral] = useState("");
  const [altura, setAltura] = useState("");
  const [porcentajeGrasaCorporal, setPorcentajeGrasaCorporal] = useState("");
  const [peso, setPeso] = useState("");
  const [porcentajeGrasaMuscular, setPorcentajeGrasaMuscular] = useState("");

  let metricas = {
    edad,
    imc,
    grasaVisceral,
    altura,
    porcentajeGrasaCorporal,
    peso,
    porcentajeGrasaMuscular,
  };
  metricas.rut = props?.alumnoSeleccionado?.rut;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!edad || !imc || !grasaVisceral || !altura || !porcentajeGrasaCorporal || !peso || !porcentajeGrasaMuscular) {
      alert('Todos los campos son obligatorios');
      return;
    } else if (edad < 15 || edad > 90) {
      alert('La edad debe estar entre 15 y 90 años');
      return;
    } else if (imc < 10 || imc > 45) {
      alert('El IMC debe estar entre 10 y 45');
      return;
    } else if (altura > 3.0) {
      alert('La altura debe ser menor a 3.0');
      return;
    } else if (porcentajeGrasaCorporal < 1 || porcentajeGrasaCorporal > 100) {
      alert('El porcentaje de grasa corporal debe estar entre 1 y 100');
      return;
    }  else {props.registrarMetricas(e, metricas);};
  };
  

  return (
    <Container maxWidth="lg" style={{ marginTop: '70px' }}>
      {props.open && (
        <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md">
          <DialogTitle sx={{ m: 0, p: 2 }} style={{ marginTop: "5px", marginBottom: "20px" }}>
            <DialogContentText>Registrar Metricas de {props?.alumnoSeleccionado?.nombre}</DialogContentText>
            <IconButton
              style={{ marginTop: "5px", marginBottom: "5px" }}
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
              type="text"
              label="Edad"
              variant="outlined"
              fullWidth
              placeholder="Ejemplo: 20"
              value={edad}
              onChange={(event) => setEdad(event.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              type="text"
              label="IMC"
              variant="outlined"
              fullWidth
              placeholder="Ejemplo: 20.09"
              value={imc}
              onChange={(event) => setImc(event.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              type="text"
              label="Grasa Visceral"
              variant="outlined"
              fullWidth
              placeholder="Ejemplo: 93.2"
              value={grasaVisceral}
              onChange={(event) => setGrasaVisceral(event.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              type="text"
              label="Altura"
              variant="outlined"
              fullWidth
              placeholder="Ejemplo: 1.80"
              value={altura}
              onChange={(event) => setAltura(event.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              type="text"
              label="Porcentaje de Grasa corporal"
              variant="outlined"
              fullWidth
              placeholder="Ejemplo: 18"
              value={porcentajeGrasaCorporal}
              onChange={(event) => setPorcentajeGrasaCorporal(event.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              type="text"
              label="Peso"
              variant="outlined"
              fullWidth
              placeholder="Ejemplo: 62"
              value={peso}
              onChange={(event) => setPeso(event.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              type="text"
              label="Porcentaje de Masa Muscular"
              variant="outlined"
              fullWidth
              placeholder="Ejemplo: 15"
              value={porcentajeGrasaMuscular}
              onChange={(event) => setPorcentajeGrasaMuscular(event.target.value)}
            />
          </DialogContent>

          <DialogActions>
            {/*<Button autoFocus color="success" variant="contained" onClick={(e) => props.registrarMetricas(e, metricas)}>
              Confirmar Registro de Metricas
            </Button> */}
            <Button autoFocus color="success" variant="contained" onClick={onSubmit}>
              Confirmar Registro de Metricas
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};


export default RegistroMetricas