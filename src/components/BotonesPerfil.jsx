import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import roles from "../helpers/roles";
import useAuth from '../auth/useAuth';
import ReservarSesion from './ReservarSesion';
import InformeAsistencia from './InformeAsistencia';
import baseURL from '../helpers/rutaBase';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import { useNavigate } from 'react-router-dom';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AssignmentIcon from '@mui/icons-material/Assignment';
import styled from "styled-components";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AlumnoContainer = styled.div`
    bottom: 0;
    align-items: center;
    padding-left: 50%;
    padding-right: 50%;
    width: 100%;
    background-color: #1E1E1E;
`;

const BotonesPerfil = () => {

    //const {alumno, hasRole} = useAuth();
    const { alumno, hasRole } = useAuth();

    const [open, setOpen] = useState(false);
    const [asistenciaOpen, setAsistenciaOpen] = useState(false);
    const [reservasAlumno, setReservasAlumno] = useState([]);

    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = async () => {
        setOpen(false);
        await getReservasByAlumno();
        // setSelectedEvents([]);
    }
    const handleButtonClick = () => {
        navigate('/metrica');
    };
    const handleHome = () => {
        navigate('/landing');
    };
    const handleGraficos = () => {
        navigate('/graficos');
    };
    const handleOpenInforme = () => {
        setAsistenciaOpen(true)
    };
    const handleCloseInforme = async () => {
        setAsistenciaOpen(false);
        //await getReservasByAlumno();
        // setSelectedEvents([]);
    }

    const getReservasByAlumno = async (fecha = new Date()) => {
        try {
            const res = await axios.post(baseURL + '/reservas/alumno', { rut: alumno.rut, fecha });
            const nuevasReservas = res?.data ?? [];
            setReservasAlumno(nuevasReservas);
            //console.log("res?.data", nuevasReservas);
            return nuevasReservas;
        } catch (error) {
            //console.log(error);
        }
    }
    const [value, setValue] = React.useState(0);


    useEffect(() => {
        if (alumno != null && hasRole(roles.alumno)) {
            getReservasByAlumno()
        }
    }, [alumno]);

    return (
        <div>
            {hasRole(roles.alumno) && <>
                <AlumnoContainer className='fixed-bottom container-xl '>
                    <Box>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction
                                label="Metricas"
                                icon={<AssignmentIcon />}
                                onClick={handleButtonClick}
                                style={{
                                    color: "#FCB924",
                                }}
                            />
                            <BottomNavigationAction
                                label="Historial"
                                onClick={handleGraficos}
                                icon={<QueryStatsIcon />}
                                style={{
                                    color: "#FCB924",
                                }}
                            />
                            <BottomNavigationAction
                                label="Reserva"
                                onClick={handleOpen}
                                icon={<RestoreIcon />}
                                style={{
                                    color: "#FCB924",
                                }}
                            />
                            <BottomNavigationAction
                                onClick={handleHome}
                                label="Rutina"
                                icon={<FitnessCenterIcon />}
                                style={{
                                    color: "#FCB924",
                                }}
                            />
                        </BottomNavigation>
                    </Box>
                </AlumnoContainer>
            </>}
            <Container className='container mt-4'>
                <Row className="botonesperfil gap-2 m-2 justify-content-center">
                    { hasRole(roles.admin) && <>
                        <Col lg={'auto'} className="col-12 col-md-2 col-sm-3" style={{ backgroundColor: '#C0D437' }}>
                            <button className='btn' style={{color: '#042945'}} onClick={handleOpen}>Gestionar bloques</button>
                        </Col>
                        <Col lg={'auto'} className="col-12 col-md-2 col-sm-3" style={{ backgroundColor: '#E6E7E9'}}>
                            <Link className='btn' to="/crearUsuario" style={{color: '#042945'}}>Crear Usuarios</Link>
                        </Col>
                        <Col lg={'auto'} className="col-12 col-md-2 col-sm-3" style={{ backgroundColor: '#FCB32E'}}>
                            <Link className='btn' to="/listar" style={{color: '#042945'}}>Solicitudes pendientes</Link>
                        </Col>
                        <Col lg={'auto'} className="col-12 col-md-2 col-sm-3" style={{ backgroundColor: '#042945'}}>
                            <Link className='btn' to="/mantenedor" style={{color: '#FCB32E'}}>Mantenedor de usuarios</Link>
                        </Col>
                        <Col lg={'auto'} className="col-12 col-md-2 col-sm-3" style={{ backgroundColor: '#C0D437'}}>
                            <button className='btn' style={{color: '#042945'}} onClick={handleOpenInforme}>Informe de Asistencia</button>
                        </Col>
                        <Col lg={'auto'} className="col-12 col-md-2 col-sm-3" style={{ backgroundColor: '#E6E7E9'}}>
                            <Link className='btn' to="/control" style={{color: '#042945'}}>Informativo</Link>
                        </Col>
                    </> }
                    {hasRole(roles.instructor) && <>
                    <Col lg={'auto'} className="col-12 col-md-2 col-sm-3" style={{ backgroundColor: '#C0D437' }}>
                        <button className='btn' style={{ color: '#042945'}} onClick={handleOpen}>Gestionar bloques</button>
                    </Col>
                    <Col lg={'auto'} className="col-12 col-md-2 col-sm-3" style={{ backgroundColor: '#FCB32E'}}>
                        <Link className='btn' to="/listarActivos">Buscar Alumnos</Link>
                    </Col>
                    <Col lg={'auto'} className="col-12 col-md-2 col-sm-3" style={{ backgroundColor: '#C0D437'}}>
                        <button className='btn' style={{ color: '#042945'}} onClick={handleOpenInforme}>Informe de Asistencia</button>
                    </Col>
                    </>}
                    {open && <ReservarSesion open={open} setOpen={setOpen} handleClose={handleClose} reservasAlumno={reservasAlumno} getReservasByAlumno={getReservasByAlumno} />}
                    {asistenciaOpen && <InformeAsistencia open={asistenciaOpen} setOpen={setAsistenciaOpen} handleClose={handleCloseInforme} />}
                </Row>
            </Container>
        </div>
    )
}

export default BotonesPerfil;