import React, { useState, useEffect } from 'react';

import baseURL from '../helpers/rutaBase';
import axios from 'axios';
import {
  Button, Typography, Grid,
  Select, IconButton, MenuItem,
  Autocomplete, InputLabel, TableContainer,
  Table, TableHead, TableRow,
  TableCell, TableBody, TextField, FormControl
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Container, Box, bgcolor } from '@mui/system';
const RutinasAlumno = () => {
  const [rutinas, setRutinas] = useState([]);
  const [selectedRutina, setSelectedRutina] = useState(null);


  useEffect(() => {
    getRutinas();
  }, []);

  const getRutinas = async () => {
    const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
    const res = await axios.get(baseURL + '/rutinas/alumno', { params: { rut } });
    const rutinasAlumno = res.data;
    setRutinas(rutinasAlumno);
  };

  const handleRutinaClick = (rutina) => {
    setSelectedRutina(rutina);
  };

  const handleBackClick = () => {
    setSelectedRutina(null);
  };

  return (
    <Container style={{ marginTop: '70px', width: "100%", background: "white" }}>
      {selectedRutina ? (
        <Box style={{ marginTop: '70px', width: "100%", background: "white", minWidth: "800px" }}>
          <Grid item xs={12}>
            <IconButton autoFocus variant="contained" fontSize="large" color="disabled" onClick={handleBackClick} >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Rutina: {selectedRutina.nombre}
              </Typography>
            </Grid>
            
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}  >
          
              <Typography variant="h6" align="center" gutterBottom>
                Cardio Inicial: {selectedRutina.cardioInicial}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                Cardio Final: {selectedRutina.cardioFinal}
              </Typography>
            </Grid>
            <Grid container  wrap="nowrap">
              <Grid item xs={12}>
                <Typography variant="h6" align="center" >
                  Calentamiento:
                </Typography>
                <Typography variant="h6" align="center" >
                  {selectedRutina.calentamiento}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" align="center" >
                  Vuelta a la calma:
                </Typography>
                <Typography variant="h6" align="center" >
                  {selectedRutina.vueltaALaCalma}
                </Typography>
              </Grid>
             
            </Grid>
          </Grid>
          <Grid container style = {{ marginTop: "20px"}}>
            <Grid item xs={12}>
              <Typography variant="h6" align="left" gutterBottom>
                Ejercicios
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Repeticiones</TableCell>
                      <TableCell>Series</TableCell>
                      <TableCell>Kg</TableCell>
                      <TableCell>Descanso</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedRutina.ejercicios.map((ejercicio) => (
                      <TableRow key={ejercicio._id}>
                        <TableCell>{ejercicio.nombre}</TableCell>
                        <TableCell>{ejercicio.repeticiones}</TableCell>
                        <TableCell>{ejercicio.series}</TableCell>
                        <TableCell>{ejercicio.kg}</TableCell>
                        <TableCell>{ejercicio.descanso}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box> 
        
       
      ) : (
        <TableContainer style={{ minWidth: "500px", width: "100%"}}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell >Rutinas</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rutinas.length > 0 ? (
                rutinas.map((rutina) => (
                  <TableRow key={rutina._id}>
                    <TableCell>{rutina.nombre}</TableCell>
                    <TableCell>
                      
                      <Button autoFocus color="success" variant="contained" onClick={() => handleRutinaClick(rutina)}>
                        Ver rutina
                    </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2}>No hay rutinas recientes</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default RutinasAlumno;