import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox
} from "@mui/material";

const AlumnosSesion = ({ alumnosSesion = [], setAlumnosSesion, tomarAsistencia }) => {

    async function handleAsistenciaChange(e, alumno, index) {
        await tomarAsistencia(alumno.reservaId, e.target.checked)
        const newAlumnosSesion = [...alumnosSesion];
        newAlumnosSesion[index] = { ...alumno, asistencia: !alumno.asistencia };
        setAlumnosSesion(newAlumnosSesion);
    }

    useEffect(() => {
        console.log("AlumnosSesion actualizado", alumnosSesion);
    }, [alumnosSesion]);

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Asistencia</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Rut</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    alumnosSesion.map((alumno, index) => (
                        <TableRow key={alumno.reservaId}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={alumno.asistencia}
                                    onChange={(e) => handleAsistenciaChange(e, alumno, index)}
                                />
                            </TableCell>
                            <TableCell>{alumno.nombre}</TableCell>
                            <TableCell>{alumno.rut}</TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    </TableContainer>
}

export default AlumnosSesion;
