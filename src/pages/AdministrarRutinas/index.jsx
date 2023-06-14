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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Box, bgcolor } from '@mui/system';
const RutinasAlumno = () => {
  const [rutinas, setRutinas] = useState([]);
  const [selectedRutina, setSelectedRutina] = useState(null);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  useEffect(() => {
    if (alumnoSeleccionado) {
        // Aquí puedes hacer las validaciones y asignaciones necesarias
        getRutinas();
        console.log('Alumno seleccionado', alumnoSeleccionado);
    }
    }, [alumnoSeleccionado]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const rut = searchParams.get('rut');
    const nombre = searchParams.get('nombre');

    // Aquí puedes hacer las validaciones y asignaciones necesarias
    const alumnoRutina = {
        rut,
        nombre,
        // Resto de los datos del alumno
    };

    setAlumnoSeleccionado(alumnoRutina);
    }, [location.search]);

    const getRutinas = async () => {
    const res = await axios.get(baseURL + '/rutinas/alumno', { params: { rut: alumnoSeleccionado.rut } });
    const rutinasAlumno = res.data;
    setRutinas(rutinasAlumno);
  };

  const handleRutinaClick = (rutina) => {
    setSelectedRutina(rutina);
  };

  return (
    <Container style={{ marginTop: '70px', width: "100%", background: "white" }}>
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
                      
                      <IconButton autoFocus variant="contained" onClick={() => handleRutinaClick(rutina)}>
                         <EditIcon />
                      </IconButton>
                      <IconButton autoFocus color="error" variant="contained" onClick={() => handleRutinaClick(rutina)}>
                         <DeleteIcon />
                      </IconButton>
                    
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
    </Container>
  );
};

export default RutinasAlumno;