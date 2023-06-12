import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import baseURL from '../helpers/rutaBase';
import axios from 'axios';
import { useTable } from 'react-table';
import useAuth from '../auth/useAuth';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const Rutina = () => {

    const [rutina, setRutina] = useState([]);
    const [rutinasRecientes, setRutinasRecientes] = useState([]);
    const [fecha, setFecha] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);


    useEffect(() => {
        rutinasRecientes();
        getRutinas();
    }, []);


   

    const getRutinas = async () => {
        const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
        const res = await axios.get(baseURL + '/rutinas/', { params: { rut } });
        //  console.log(rut);
        //   console.log(res);
        //  // console.log("Todas las metricas",res.data)
        const rutinaAlumno = res.data;
        setRutina(rutinaAlumno);
    }


    const RutinasRecientes = async () => {
        // const datosSesion = sessionStorage.getItem("alumno_sesion");
        const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
        const res = await axios.post(baseURL + '/rutinas/alumno', { rut });
        const rutinaAlumno = res.data;
        setFecha(rutinaAlumno.fecha);
        setRutinasRecientes(rutinaAlumno);
        await getRutinas();
      }

        
      const data = React.useMemo(() => {
        if (rutinasRecientes) {
            const ejerciciosData = rutinasRecientes.ejercicios.map((ejercicio) => {
                return {
                  rutina: ejercicio.nombre,
                  valor: `${ejercicio.repeticiones}, ${ejercicio.series}, ${ejercicio.kg}, ${ejercicio.descanso}`,
                };
              });
          return [
            { rutina: 'cardio Inicial', valor: `${rutinasRecientes?.cardioInicial ?? 'No registra métricas'}` },
            { rutina: 'Cardio Final', valor: `${rutinasRecientes?.cardioFinal ?? 'No registra métricas'}` },
            { rutina: 'calentamiento', valor: `${rutinasRecientes?.calentamiento ?? 'No registra métricas'}` },
            { rutina: 'vuelta a la calma', valor: `${rutinasRecientes?.vueltaALaCalma ?? 'No registra métricas'}` },
            ...ejerciciosData,
            
          ];
        } else {
          return [];
        }
      },
      [rutinasRecientes]
    );

    return (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rutina</TableCell>
                <TableCell>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.rutina}</TableCell>
                  <TableCell>{item.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
      
      
};
export default Rutina;
