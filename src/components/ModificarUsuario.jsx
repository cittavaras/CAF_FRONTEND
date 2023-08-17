import { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Container, DialogActions, DialogTitle, IconButton, TextField, DialogContentText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';


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

    let actualizar = {
        nombre,
        rut,
        password: contraseña,
        correo,
        carrera,
        jornada,
        active,
        tipoUsuario,
    };
    actualizar._id = props?.alumnoModificado?._id;

    const calcularDigitoVerificador = (rutSinDigito) => {
        let suma = 0;
        let multiplicador = 2;

        // Itera de derecha a izquierda multiplicando y sumando los dígitos
        for (let i = rutSinDigito.length - 1; i >= 0; i--) {
            suma += parseInt(rutSinDigito[i]) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        // Calcula el dígito verificador como el complemento de la suma módulo 11
        const digito = 11 - (suma % 11);

        // Devuelve el dígito verificador, considerando casos especiales
        if (digito === 11) {
            return "0";
        } else if (digito === 10) {
            return "K";
        } else {
            return digito.toString();
        }
    };

    const formatearRut = () => {
        const rutSinFormatear = rut.replace(/\./g, "").replace("-", "").trim();
        const rutNum = rutSinFormatear.slice(0, -1);
        const dvIngresado = rutSinFormatear.slice(-1);
        const dvCalculado = calcularDigitoVerificador(rutNum);

        if (dvIngresado.toUpperCase() === dvCalculado) {
            const rutFormateado = rutNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dvIngresado;
            setRut(rutFormateado);
        } else {
            Swal.fire({
                icon: 'info', text: 'El RUT ingresado no es válido',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            setRut("")
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !rut || !contraseña || !confirmarContraseña || !correo || !carrera || !jornada || !tipoUsuario) {
            Swal.fire({
                icon: 'info', text: 'Todos los campos son obligatorios',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            return;
        }
        else if (contraseña !== confirmarContraseña) {
            Swal.fire({
                icon: 'info', text: 'Las contraseñas no coinciden',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            return;
        }
        else if (!validarCorreoElectronico(correo)) {
            Swal.fire({
                icon: 'info', text: 'El correo debe ser de duoc',
                confirmButtonColor: 'rgb(158 173 56)',
            });
            return;
        } else { props.modificarAlumno(e, actualizar); }
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

    const validarCorreoElectronico = (correo) => {
        const expresionRegular = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesor\.duoc\.cl|duoc\.cl)$/;
        return expresionRegular.test(correo);
    };

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
                            placeholder="12.345.678-9"
                            value={rut}
                            onBlur={formatearRut}
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
                            Confirmar cambios
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};


export default ModificarUsuario