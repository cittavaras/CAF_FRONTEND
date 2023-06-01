import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import roles from "../helpers/roles";
import useAuth from '../auth/useAuth';
import ReservarSesion from './ReservarSesion';
import InformeAsistencia from './InformeAsistencia';
import baseURL from '../helpers/rutaBase';

const BotonesPerfil = () => {
    const { alumno, hasRole } = useAuth();

    const [open, setOpen] = useState(false);
    const [asistenciaOpen, setAsistenciaOpen] = useState(false);
    const [reservasAlumno, setReservasAlumno] = useState([]);

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = async () => {
        setOpen(false);
        await getReservasByAlumno();
        // setSelectedEvents([]);
    }

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
      

    useEffect(() => {
        if (alumno != null && hasRole(roles.alumno)) {
            getReservasByAlumno()
        }
    }, [alumno]);
    return (
        <div className=' d-flex  flex-sm-row flex-column  '>
            {hasRole(roles.alumno) && <>
                <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }} onClick={handleOpen}>Reservar Sesión</button>
                <Link className='btn' to="/metrica" style={{ backgroundColor: '#042945', color: '#E6E7E9', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Historial Avance</Link>
                <Link className='btn' style={{ backgroundColor: '#042945', color: '#FCB32E', fontWeight: 'bold', marginBottom: '10px' }}>Rutina de trabajo</Link>
            </>}
            {hasRole(roles.admin) && <>
                <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }} onClick={handleOpen}>Gestionar bloques</button>
                <Link className='btn' to="/crearUsuario" style={{ backgroundColor: '#E6E7E9', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Crear Usuarios</Link>
                <Link className='btn' to="/listar" style={{ backgroundColor: '#FCB32E', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Solicitudes de cuentas de usuarios pendientes</Link>
                <Link className='btn' to="/mantenedor" style={{ backgroundColor: '#042945', color: '#FCB32E', fontWeight: 'bold', marginBottom: '10px' }}>Mantenedor de usuarios</Link>
                <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }} onClick={handleOpenInforme}>Informe de Asistencia </button>
            </>}
            {hasRole(roles.instructor) && <>
                <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }} onClick={handleOpen}>Gestionar bloques</button>
                <Link className='btn' to="/listarActivos" style={{ backgroundColor: '#FCB32E', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Buscar Alumnos</Link>
                <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }} onClick={handleOpenInforme}>Informe de Asistencia</button>
            </>}
            {open && <ReservarSesion open={open} setOpen={setOpen} handleClose={handleClose} reservasAlumno={reservasAlumno} getReservasByAlumno={getReservasByAlumno} />}
            {asistenciaOpen && <InformeAsistencia open={asistenciaOpen} setOpen={setAsistenciaOpen} handleClose={handleCloseInforme}/>}
        </div>
    )
}

export default BotonesPerfil;