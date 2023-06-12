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
            <div className="row">
                {hasRole(roles.admin) && <>
                    <div className="col-12 col-md-2">
                        <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', fontWeight: 'bold'}} onClick={handleOpen}>Gestionar bloques</button>
                    </div>
                    <div className="col-12 col-md-2">
                        <Link className='btn' to="/crearUsuario" style={{ backgroundColor: '#E6E7E9', color: '#042945',fontWeight: 'bold'}}>Crear Usuarios</Link>
                    </div>
                    <div className="col-12 col-md-2">
                        <Link className='btn' to="/listar" style={{ backgroundColor: '#FCB32E', color: '#042945', fontWeight: 'bold' }}>Solicitudes pendientes</Link>
                    </div>
                    <div className="col-12 col-md-2">
                        <Link className='btn' to="/mantenedor" style={{ backgroundColor: '#042945', color: '#FCB32E', fontWeight: 'bold'}}>Mantenedor de usuarios</Link>
                    </div>
                    <div className="col-12 col-md-2">
                        <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', fontWeight: 'bold'}} onClick={handleOpenInforme}>Informe de Asistencia</button>
                    </div>
                    <div className="col-12 col-md-2">
                        <Link className='btn' to="/informativo" style={{ backgroundColor: '#E6E7E9', color: '#042945', fontWeight: 'bold' }}>Informativo</Link>
                    </div>
                </>}
                {hasRole(roles.instructor) && <>
                    <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px', marginTop: '90px' }} onClick={handleOpen}>Gestionar bloques</button>
                    <Link className='btn' to="/listarActivos" style={{ backgroundColor: '#FCB32E', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Buscar Alumnos</Link>
                    <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }} onClick={handleOpenInforme}>Informe de Asistencia</button>
                </>}
                {open && <ReservarSesion open={open} setOpen={setOpen} handleClose={handleClose} reservasAlumno={reservasAlumno} getReservasByAlumno={getReservasByAlumno} />}
                {asistenciaOpen && <InformeAsistencia open={asistenciaOpen} setOpen={setAsistenciaOpen} handleClose={handleCloseInforme} />}
            </div>
        </div>
    )
}

export default BotonesPerfil;