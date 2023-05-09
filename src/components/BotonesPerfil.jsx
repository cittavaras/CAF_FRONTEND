import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import roles from "../helpers/roles";
import useAuth from '../auth/useAuth';
import ReservarSesion from './ReservarSesion';
import baseURL from '../helpers/rutaBase';

const BotonesPerfil = () => {
    const { alumno, hasRole } = useAuth();

    const [open, setOpen] = useState(false);
    const [reservasAlumno, setReservasAlumno] = useState([]);

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = async () => {
        setOpen(false);
        await getReservasByAlumno();
        // setSelectedEvents([]);
    }

    const getReservasByAlumno = async (fecha = new Date()) => {
        try {
            const res = await axios.post(baseURL + '/reservas/alumno', { rut: alumno.rut, fecha });
            setReservasAlumno(res?.data ?? []);
            console.log("res?.data", res?.data );
        } catch (error) {
            console.log(error);
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
                {/* <Link className='btn' style={{ backgroundColor: '#E6E7E9', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Sesiones Reservadas</Link>
            <Link className='btn' style={{ backgroundColor: '#FCB32E', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Mis Sesiones</Link> */}
                <Link className='btn' to="/metrica" style={{ backgroundColor: '#042945', color: '#E6E7E9', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Historial Avance</Link>
                <Link className='btn' style={{ backgroundColor: '#042945', color: '#FCB32E', fontWeight: 'bold', marginBottom: '10px' }}>Rutina de trabajo</Link>
            </>}
            {hasRole(roles.admin) && <>
                <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }} onClick={handleOpen}>Gestionar bloques</button>
                <Link className='btn' to="/crearUsuario" style={{ backgroundColor: '#E6E7E9', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Crear Usuarios</Link>
                <Link className='btn' to="/listar" style={{ backgroundColor: '#FCB32E', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Solicitudes de cuentas de usuarios pendientes</Link>
            </>}
            {hasRole(roles.instructor) && <>
                <button className='btn' style={{ backgroundColor: '#C0D437', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }} onClick={handleOpen}>Gestionar bloques</button>
                <Link className='btn' to="/listarActivos" style={{ backgroundColor: '#FCB32E', color: '#042945', marginRight: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Buscar Alumnos</Link>
            </>}
            {open && <ReservarSesion open={open} setOpen={setOpen} handleClose={handleClose} reservasAlumno={reservasAlumno} getReservasByAlumno={getReservasByAlumno} />}
        </div>
    )
}

export default BotonesPerfil;