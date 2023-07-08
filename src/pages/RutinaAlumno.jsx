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
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Container, Box, bgcolor, height } from '@mui/system';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Modal } from '@mui/material';
import RegistroRutinas from './RegistroRutinas';
import useAuth from '../auth/useAuth';
import moment from 'moment';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import DeleteIcon from '@mui/icons-material/Delete';
import CrearRutinaAlumno from '../components/CrearRutinaAlumno';
const RutinasAlumno = () => {
    const [rutinas, setRutinas] = useState([]);
    const [nomRutina, setNomRutina] = useState("");
    const [selectedRutina, setSelectedRutina] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [alumnos, setAlumnos] = useState([]);
    const fechaActual = moment().format('DD-MM-YYYY');
    const { alumno } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
   

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
        getRutinas();
    }, []);

    const getRutinas = async (rut) => {
        try {
          const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
          const res = await axios.get(baseURL + '/rutinas/alumno/', { params: { rutAlumno: rut } });
          const rutinaAlumno = res.data;
          setRutinas(rutinaAlumno);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        getAlumnos();
      })
    
      // Función para obtener la lista de alumnos
      const getAlumnos = async () => {
        try {
          const res = await axios.get(baseURL + '/alumnos');
          const alumnos = res.data.alumnos.filter(alumno => alumno.tipoUsuario === 'Alumno' && alumno.active === true);
          return alumnos
        } catch (error) {
          //console.log(error);
        }
      }

    const handleRutinaClick = (rutina) => {
        setSelectedRutina(rutina);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
      };
    

    const handleBackClick = () => {
        setSelectedRutina(null);
    };
    const volverALanding = (e) => {
        e.preventDefault();
        try {
        navigate('/landing');
        } catch (error) {
        console.error(error);
        }

    };

    const handleNuevaRutinaClick = () => {
      setOpenModal(true);
    };

   
    
// }
    
  
      

    return (
        

        <Container style={{ marginTop: '70px', width: "100%", background: "white" }}>
            
            <Button variant="contained" onClick={handleNuevaRutinaClick }>
                Nueva rutina
            </Button>
            {selectedRutina ? (
                
                <Box sx={{ marginTop: '70px', width: '300px', background: 'white' }}>
                    
                    <Grid container spacing={3}>
                    
                        <Grid item xs={12}>
                        
                            <IconButton autoFocus variant="contained" fontSize="large" color="disabled" onClick={handleBackClick}>
                                <ArrowBackIcon />
                                
                            </IconButton>

                            
                           
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Rutina: {selectedRutina.nombre}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Cardio Inicial: {selectedRutina.cardioInicial}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Cardio Final: {selectedRutina.cardioFinal}
                            </Typography>
                        </Grid>
                        
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">
                                    Calentamiento:
                                </Typography>
                                <Typography variant="h6" align="center">
                                    {selectedRutina.calentamiento}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">
                                    Vuelta a la calma:
                                </Typography>
                                <Typography variant="h6" align="center">
                                    {selectedRutina.vueltaALaCalma}
                                </Typography>
                            </Grid>
                        
                    </Grid>

                    <Grid container sx={{ marginTop: '20px' }}>
                        <Grid item xs={12}>
                            <Typography variant="h6" align="left" gutterBottom>
                                Ejercicios
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Box sx={{ maxWidth: '300px', margin: '0 auto' }}>
                            <TableContainer>
                                <Table dense>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell size="small">Nombre</TableCell>
                                            <TableCell size="small">Repeticiones</TableCell>
                                            <TableCell size="small">Series</TableCell>
                                            <TableCell size="small">Kg</TableCell>
                                            <TableCell size="small">Descanso</TableCell>
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
                        </Box>
                        </Grid>
                    </Grid>
                </Box>


            ) : (
                <TableContainer sx={{  width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow item xs={12}>
                                <IconButton autoFocus variant="contained" fontSize="large" color="disabled" onClick={volverALanding}>
                                    <ArrowBackIcon />
                                </IconButton>
                                
                            </TableRow>
                            <TableRow>
                                <TableCell>Rutinas</TableCell>
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
        <Modal open={openModal} disablePortal>
        <Box
            sx={{
            width: '50%',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            }}
        >
            <CrearRutinaAlumno getRutinas={getRutinas}/>
        </Box>
        </Modal>
            
        </Container>

                
        
    );

    
};

export default RutinasAlumno;