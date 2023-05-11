import { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Container, DialogActions, DialogTitle, IconButton, TextField, DialogContentText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const ModificarUsuario = (props) => {
    const [nombre, setNombre] = useState('');
    const [rut, setRut] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [correo, setCorreo] = useState('');
    const [carrera, setCarrera] = useState('');
    const [jornada, setJornada] = useState('');
    const [active, setActive] = useState('true');
    const [tipoUsuario, setTipoUsuario] = useState('');


    const onSubmit = async (e) => {
        e.preventDefault();

    };

    useEffect(() => {
        if (props.alumnoModificado) {
            setNombre(props.alumnoModificado.nombre)
            setRut(props.alumnoModificado.rut)
            setCorreo(props.alumnoModificado.correo)
            setCarrera(props.alumnoModificado.carrera)
            setJornada(props.alumnoModificado.jornada)
            setTipoUsuario(props.alumnoModificado.tipoUsuario)
        }
      }, [props.alumnoModificado]);

    return (
        <Container maxWidth="lg" style={{ marginTop: '70px' }}>
            {props.open && (
                <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md">
                    <DialogTitle sx={{ m: 0, p: 2 }} style={{ marginTop: "5px", marginBottom: "20px" }}>
                        <DialogContentText>Modificar datos de {props?.alumnoModificado?.nombre}</DialogContentText>
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
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            type="text"
                            label="Rut"
                            variant="outlined"
                            fullWidth
                            value={rut}
                            onChange={(event) => setRut(event.target.value)}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            type="text"
                            label="Contraseña"
                            variant="outlined"
                            fullWidth
                            value={contraseña}
                            onChange={(event) => setContraseña(event.target.value)}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            type="text"
                            label="Confirmar Contraseña"
                            variant="outlined"
                            fullWidth
                            value={confirmarContraseña}
                            onChange={(event) => setConfirmarContraseña(event.target.value)}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            type="text"
                            label="Correo"
                            variant="outlined"
                            fullWidth
                            value={correo}
                            onChange={(event) => setCorreo(event.target.value)}
                        />
                    </DialogContent>
                    <DialogContent>
                        <select className="form-control" name="carrera" onChange={(event) => setCarrera(event.target.value)} value={carrera}>
                            <option selected disabled={true}> ---Seleccione Su carrera---</option>
                            <option value="Auditoría">Auditoría</option>
                            <option value="Ecoturismo">Ecoturismo</option>
                            <option value="Gastronomía internacional">Gastronomía internacional</option>
                            <option value="Ingeniería en administración">Ingeniería en administración</option>
                            <option value="Ingeniería en infraestructura">Ingeniería en infraestructura</option>
                            <option value="Ingeniería en informatica">Ingeniería en informatica</option>
                            <option value="Ingeniería en administración de recursos humanos">Ingeniería en administración de recursos humanos</option>
                            <option value="Ingeniería en marketing">Ingeniería en marketing</option>
                            <option value="Ingeniería en comercio exterior">Ingeniería en comercio exterior</option>
                            <option value="Ingeniería en conectividad y redes">Ingeniería en conectividad y redes</option>
                            <option value="Ingeniería en gestión de tecno">Ingeniería en gestión de tecno</option>
                            <option value="Ingeniería en gestión logística">Ingeniería en gestión logística</option>
                            <option value="Tourism & hospitality">Tourism & hospitality</option>
                            <option value="Turismo y hotelería">Turismo y hotelería</option>
                            <option value="Técnico administración de empresas m/marketing">Técnico administración de empresas m/marketing</option>
                            <option value="Técnico admin. de infraest. y plat. tecnológicas">Técnico admin. de infraest. y plat. tecnológicas</option>
                            <option value="Técnico administración de redes computacionales">Técnico administración de redes computacionales</option>
                            <option value="Técnico administración de recursos humanos">Técnico administración de recursos humanos</option>
                            <option value="Técnico analista programador computacional">Técnico analista programador computacional</option>
                            <option value="Técnico comercio exterior">Técnico comercio exterior</option>
                            <option value="Técnico contabilidad general mención legislación tributaria">Técnico contabilidad general mención legislación tributaria</option>
                            <option value="técnico en administración">técnico en administración</option>
                            <option value="Técnico administración financiera">Técnico administración financiera</option>
                            <option value="Técnico administración de empresas m/logística">Técnico administración de empresas m/logística</option>
                            <option value="Técnico en turismo y hotelería">Técnico en turismo y hotelería</option>
                            <option value="Tourism & hospitality technician">Tourism & hospitality technician</option>
                            <option value="Técnico turismo de aventura">Técnico turismo de aventura</option>
                            <option value="Técnico turismo técnico en empresas turísticas">Técnico turismo técnico en empresas turísticas</option>
                        </select>
                    </DialogContent>
                    <DialogContent>
                        <select className="form-control" name="jornada" onChange={(event) => setJornada(event.target.value)} value={jornada}>
                            <option selected disabled={true}>JORNADA</option>
                            <option value="diurno">Diurno</option>
                            <option value="vespertino">Vespertino</option>
                        </select>
                    </DialogContent>
                    <DialogContent>
                        <select className="form-control" name="tipoUsuario" onChange={(event) => setTipoUsuario(event.target.value)} value={tipoUsuario}>
                            <option selected disabled={true}>CATEGORIA USUARIO</option>
                            <option value="Alumno">Alumno</option>
                            <option value="Instructor">Instructor</option>
                        </select>
                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus color="success" variant="contained" onClick={onSubmit}>
                            Confirmar Registro de Metricas
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};


export default ModificarUsuario