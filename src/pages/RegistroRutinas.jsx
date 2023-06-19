import {
    Button, Typography, Grid,
    Select, IconButton, MenuItem,
    Autocomplete, InputLabel, TableContainer,
    Table, TableHead, TableRow,
    TableCell, TableBody, TextField, FormControl
} from "@mui/material";
import moment from 'moment';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import baseURL from '../helpers/rutaBase';
import { Container, Box, bgcolor } from '@mui/system';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMediaQuery from "@mui/material/useMediaQuery";
//import { useTheme } from "@mui/material/styles";
const RegistroRutinas = (props) => {
    
    const isMobile = useMediaQuery('(max-width:600px)');
    const location = useLocation();
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

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

    useEffect(() => {
        if (alumnoSeleccionado) {
            // Aquí puedes hacer las validaciones y asignaciones necesarias
            getRutinas();
            console.log('Alumno seleccionado', alumnoSeleccionado);
        }
    }, [alumnoSeleccionado]);
    //const filasTabla = Array.from(Array(8).keys());
    const [selectedRutina, setSelectedRutina] = useState([]);
    const [rutinas, setRutinas] = useState([]);
    const [nomRutina, setNomRutina] = useState("");
    const [detalleRutina, setDetalleRutina] = useState("");
    const [cardioInicial, setCardioInicial] = useState("");
    const [cardioFinal, setCardioFinal] = useState("");
    const [calentamiento, setCalentamiento] = useState("");
    const [vueltaALaCalma, setVueltaALaCalma] = useState("");
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedRepeticion, setSelectedRepeticion] = useState([]);
    const [selectedSerie, setSelectedSerie] = useState([]);
    const [selectedKg, setSelectedKg] = useState([]);
    const [selectedDescanso, setSelectedDescanso] = useState([]);
    const fechaActual = moment().format('DD-MM-YYYY');
    const { alumno } = useAuth();
    const navigate = useNavigate();



    const ejercicios = [
        { id: 1, nombre: "Flexiones de brazo apoyo" },
        { id: 2, nombre: "Rodillas" },
        { id: 3, nombre: "Elevaciones de hombro" },
        { id: 4, nombre: "Frontales con disco" },
        { id: 5, nombre: "Dorsalera" },
        { id: 6, nombre: "Remo polea" },
        { id: 7, nombre: "Pall off press" },
        { id: 8, nombre: "Prensa 45°" },
        { id: 9, nombre: "Extensión de rodilla" },
        { id: 10, nombre: "Máquina Cuadríceps" },
        { id: 11, nombre: "Puente isquiotibiales" },
        { id: 12, nombre: "Press banca" },
        { id: 13, nombre: "Press de hombros" },
        { id: 14, nombre: "Mancuernas" },
        { id: 15, nombre: "Dorsalera polea" },
        { id: 16, nombre: "Remo mancuernas" },
        { id: 17, nombre: "Estocadas" },
        { id: 18, nombre: "Peso muerto Rumano" },
        { id: 19, nombre: "Búlgaras" },
        { id: 20, nombre: "Hip Thrust" },
        { id: 21, nombre: "Elevaciones de talones" },
        { id: 22, nombre: "Smith" },
        { id: 23, nombre: "Crunch Abdominal" },
        { id: 24, nombre: "Puente isquiotibiales" }
    ];

    const handleCardioInicialChange = (event) => {
        setCardioInicial(event.target.value);
    };
    const handleCardioFinalChange = (event) => {
        setCardioFinal(event.target.value);
    };
    const handleCalentamientoChange = (event) => {
        setCalentamiento(event.target.value);
    };
    const handleVueltaALaCalmaChange = (event) => {
        setVueltaALaCalma(event.target.value);
    };


    const handleExerciseChange = (index, value) => {
        const updatedExercises = [...selectedExercises];
        updatedExercises[index] = value;
        setSelectedExercises(updatedExercises);
    };
    const handleRepeticionChange = (index, value) => {
        const updatedRepeticion = [...selectedRepeticion];
        updatedRepeticion[index] = value;
        setSelectedRepeticion(updatedRepeticion);
    };
    const handleSerieChange = (index, value) => {
        const updatedSerie = [...selectedSerie];
        updatedSerie[index] = value;
        setSelectedSerie(updatedSerie);
    };
    const handleKgChange = (index, value) => {
        const updatedKg = [...selectedKg];
        updatedKg[index] = value;
        setSelectedKg(updatedKg);
    };
    const handleDescansoChange = (index, value) => {
        const updatedDescanso = [...selectedDescanso];
        updatedDescanso[index] = value;
        setSelectedDescanso(updatedDescanso);
    };
    const volverALanding = (e) => {
        e.preventDefault();
        try {
        navigate(-1);
        } catch (error) {
        console.error(error);
        }

    };

    const registrarRutina = async (e) => {
        e.preventDefault();
        console.log("alumno", alumno);

        try {
            const res = await axios.post(baseURL + '/rutinas/alumno/', {
                nombre: nomRutina,
                instructorId: alumno.rut,
                alumnoId: alumnoSeleccionado.rut,
                cardioInicial: cardioInicial,
                cardioFinal: cardioFinal,
                calentamiento: calentamiento,
                vueltaALaCalma: vueltaALaCalma,
                ejercicios: getEjercicios(),
            });

            // Mostrar el alert
            alert('Rutina registrada');

            // Redirigir al usuario a la página anterior
            navigate(-1);
        } catch (error) {
            console.error(error);
        }

    }
    const getRutinas = async () => {

        const res = await axios.get(baseURL + '/rutinas/alumno', { params: { rut: alumnoSeleccionado.rut } });
        //  console.log(rut);
        //   console.log(res);
        //  // console.log("Todas las metricas",res.data)
        const rutinasAlumno = res.data;
        console.log("rutinasAlumno", rutinasAlumno)
        setRutinas(rutinasAlumno);
        /*
        if (rutinasAlumno.length > 0) {
            const rutinaDefault = rutinasAlumno[0];
            setCardioInicial(rutinaDefault.cardioInicial);
            setCardioFinal(rutinaDefault.cardioFinal);
            setCalentamiento(rutinaDefault.calentamiento);
            setVueltaALaCalma(rutinaDefault.vueltaALaCalma);
            setNomRutina(rutinaDefault.nombre);
            setSelectedExercises(generarEjercicios(rutinaDefault.ejercicios))
        }
        */

    }
    const getEjercicios = () => {
        const ejerciciosFormateados = selectedRutina.map((ejercicio) => {
            return {
                nombre: selectedExercises[ejercicio],
                repeticiones: selectedRepeticion[ejercicio],
                series: selectedSerie[ejercicio],
                kg: selectedKg[ejercicio],
                descanso: selectedDescanso[ejercicio],
            }
        }
        )
        return ejerciciosFormateados;
    }
    const generarEjercicios = (ejercicios = []) => {
        setSelectedExercises(ejercicios.map(ejercicio => ejercicio.nombre));
        setSelectedRepeticion(ejercicios.map(ejercicio => ejercicio.repeticiones));
        setSelectedSerie(ejercicios.map(ejercicio => ejercicio.series));
        setSelectedKg(ejercicios.map(ejercicio => ejercicio.kg));
        setSelectedDescanso(ejercicios.map(ejercicio => ejercicio.descanso));
        setSelectedRutina(ejercicios.map((ejercicio, index) => index));
    }


    return (
        
            <Container style={{ marginTop: '70px', background: 'white', overflowX: 'auto', padding: '10px', '@media (width: 400px)': {
                padding: '5px',
                overflowX: 'scroll',
                overflowY: 'hidden',
                whiteSpace: 'nowrap',
              },}}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <IconButton autoFocus variant="contained" fontSize="large" color="disabled" onClick={volverALanding} sx={{ fontSize: '30px', textAlign: 'left' }}>
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="subtitle1" component="h3" sx={{ fontSize: '30px', textAlign: 'center' }}>
                      Registro De Rutina
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                      <FormControl style={{ width: '100%' }}>
                        <InputLabel>Seleccione una rutina</InputLabel>
                        <Select
                          name="rutina"
                          value={nomRutina}
                          onChange={(e) => setNomRutina(e.target.value)}
                        >
                          <MenuItem value="Rutina 1">Rutina 1</MenuItem>
                          <MenuItem value="Rutina 2">Rutina 2</MenuItem>
                          <MenuItem value="Rutina 3">Rutina 3</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div>
                      <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                        Nombre Rutina: {nomRutina}
                      </Typography>
                      <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                        Alumno: {alumnoSeleccionado && `${alumnoSeleccionado.nombre}`}
                      </Typography>
                      <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                        Instructor: {alumno?.nombre ?? 'Sin información'}
                      </Typography>
                      <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                        Fecha Rutina: {fechaActual}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                      Cardio Inicial
                    </Typography>
                    <TextField
                      id="outlined-multiline-static"
                      label="ej: 10 minutos"
                      value={cardioInicial}
                      onChange={handleCardioInicialChange}
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                      Cardio Final
                    </Typography>
                    <TextField
                      id="outlined-multiline-static"
                      label="ej: 10 minutos"
                      value={cardioFinal}
                      onChange={handleCardioFinalChange}
                      style={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                      Calentamiento
                    </Typography>
                    <TextField
                      id="outlined-multiline-static"
                      label="descripcion del calentamiento"
                      multiline
                      rows={2}
                      value={calentamiento}
                      onChange={handleCalentamientoChange}
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                      Vuelta a la calma
                    </Typography>
                    <TextField
                      id="outlined-multiline-static"
                      label="descripcion de la vuelta a la calma"
                      multiline
                      rows={2}
                      value={vueltaALaCalma}
                      onChange={handleVueltaALaCalmaChange}
                      style={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ejercicios</TableCell>
                        <TableCell>Repeticiones</TableCell>
                        <TableCell>Kg</TableCell>
                        <TableCell>Series</TableCell>
                        <TableCell>Descanso</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <Grid item xs={12}>
                        <Button variant="contained" color="success" startIcon={<PlusOneIcon />} onClick={() => setSelectedRutina([...selectedRutina, selectedRutina.length])}>Agregar Ejercicio</Button>
                      </Grid>
                      {selectedRutina.map((ejercicio) => (
                        <TableRow key={ejercicio}>
                          <TableCell>
                            <FormControl style={{ width: '100%', maxWidth: '200px' }}>
                              <InputLabel>Seleccione Ejercicio</InputLabel>
                              <Select
                                name="rutina"
                                type="text"
                                value={selectedExercises[ejercicio]}
                                onChange={(e) => handleExerciseChange(ejercicio, e.target.value)}
                                style={{ width: '100%' }}
                              >
                                {ejercicios.map((ejercicio) => (
                                  <MenuItem key={ejercicio.id} value={ejercicio.nombre}>
                                    {ejercicio.nombre}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="int"
                              label="repeticiones"
                              variant="outlined"
                              fullWidth
                              placeholder="Ejemplo: 20"
                              value={selectedRepeticion[ejercicio]}
                              onChange={(e) => handleRepeticionChange(ejercicio, e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="float"
                              label="Kg"
                              variant="outlined"
                              fullWidth
                              placeholder="Ejemplo: 20"
                              value={selectedKg[ejercicio]}
                              onChange={(e) => handleKgChange(ejercicio, e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="int"
                              label="series"
                              variant="outlined"
                              fullWidth
                              placeholder="Ejemplo: 20"
                              value={selectedSerie[ejercicio]}
                              onChange={(e) => handleSerieChange(ejercicio, e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="float"
                              label="Descanso"
                              variant="outlined"
                              fullWidth
                              placeholder="Ejemplo: 20"
                              value={selectedDescanso[ejercicio]}
                              onChange={(e) => handleDescansoChange(ejercicio, e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton aria-label="delete" size="small" color="error" onClick={() => setSelectedRutina(selectedRutina.filter((e) => e !== ejercicio))}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <Button autoFocus color="success" variant="contained" onClick={registrarRutina}>
                    Confirmar registro de rutinas
                  </Button>
                </div>
                <br />
              </Box>
            </Container>

    );
};

export default RegistroRutinas