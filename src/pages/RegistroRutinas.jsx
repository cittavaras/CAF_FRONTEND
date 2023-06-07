import { Button, Typography, Grid, Select, IconButton ,MenuItem, InputLabel, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, FormControl } from "@mui/material";
import moment from 'moment';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import baseURL from '../helpers/rutaBase';
import { Container, Box, bgcolor } from '@mui/system';
import useAuth from '../auth/useAuth';
const RegistroRutinas = (props) => {

    //const filasTabla = Array.from(Array(8).keys());
    const [rutina, setRutina] = useState([]);

    const [nomRutina, setNomRutina] = useState("");
    const [detalleRutina, setDetalleRutina] = useState("");
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedRepeticion, setSelectedRepeticion] = useState([]);
    const [selectedSerie, setSelectedSerie] = useState([]);
    const [selectedKg, setSelectedKg] = useState([]);
    const [selectedDescanso, setSelectedDescanso] = useState([]);
    const fechaActual = moment().format('DD-MM-YYYY');

    let rutinas = {
        nomRutina,
        detalleRutina,
    };
    rutinas.rut = props?.alumnoSeleccionado?.rut;
    
    const ejercicios = [
        { id: 1, nombre: "Sentadillas" },
        { id: 2, nombre: "Abdominales" },
        { id: 3, nombre: "Flexiones" },
        { id: 4, nombre: "Burpees" },
        { id: 5, nombre: "Plancha" },
        { id: 6, nombre: "Zancadas" },
        { id: 7, nombre: "Saltos" },
        { id: 8, nombre: "Tijeras" },
        { id: 9, nombre: "Escalador" },
        { id: 10, nombre: "nose" },
        { id: 11, nombre: "nose1" },
        { id: 12, nombre: "nose2" }
    ];

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

    const alumnoSeleccionado = props.alumnoSeleccionado;
    const { alumno } = useAuth();
    return (
        <Container style={{ marginTop: '70px', width: "100%", background: "white"  }}>

            <Box sx={{ minWidth: "800px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" component="h3" sx={{ fontSize: '30px', textAlign: "center" }}>
                            Registro De Rutina
                        </Typography>
                        <h1>{props.alumnoSeleccionado?.nombre} {props.alumnoSeleccionado?.apellido}</h1>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="form-group" style={{ textAlign: "center", marginTop: "20px" }}>
                            <FormControl style={{ width: '50%' }}>
                                <InputLabel >Seleccione una rutina</InputLabel>
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
                    <Grid item xs={6}>

                        <div >
                            <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                                Nombre Rutina: {nomRutina}
                            </Typography>
                            <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                                Alumno:
                            </Typography>
                            <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                                Instructor: {alumno?.nombre ?? 'Sin información'}
                            </Typography>
                            <Typography variant="subtitle1" component="h3" sx={{ fontSize: '20px' }}>
                                Fecha Rutina: {fechaActual}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="success" startIcon={<PlusOneIcon />} onClick={() => setRutina([...rutina, rutina.length])}>Agregar Ejercicio
                        </Button>
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
                            {rutina.map((ejercicio) => (
                                <TableRow key={ejercicio}>
                                    <TableCell>
                                        <FormControl style={{ width: '100%', minWidth: "200px" }}>
                                            <InputLabel >Seleccione Ejercicio</InputLabel>
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
                                    <TableCell><TextField
                                        type="int"
                                        label="repeticiones"
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Ejemplo: 20"
                                        value={selectedRepeticion[ejercicio]}
                                        onChange={(e) => handleRepeticionChange(ejercicio, e.target.value)}
                                    /></TableCell>
                                    <TableCell><TextField
                                        type="float"
                                        label="Kg"
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Ejemplo: 20"
                                        value={selectedKg[ejercicio]}
                                        onChange={(e) => handleKgChange(ejercicio, e.target.value)}
                                    /></TableCell>
                                    <TableCell><TextField
                                        type="int"
                                        label="series"
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Ejemplo: 20"
                                        value={selectedSerie[ejercicio]}
                                        onChange={(e) => handleSerieChange(ejercicio, e.target.value)}
                                    /></TableCell>
                                    <TableCell><TextField
                                        type="float"
                                        label="Descanso"
                                        variant="outlined"
                                        fullWidth
                                        placeholder="Ejemplo: 20"
                                        value={selectedDescanso[ejercicio]}
                                        onChange={(e) => handleDescansoChange(ejercicio, e.target.value)}
                                    /></TableCell>
                                    <TableCell>
                                        <IconButton  aria-label="delete" size="small" color="error"  onClick={() => setRutina(rutina.filter((e) => e !== ejercicio))}>
                                        <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button autoFocus color="success" variant="contained">
                    Confirmar registro de rutinas
                </Button>
            </Box>



        </Container>
    )
}

export default RegistroRutinas