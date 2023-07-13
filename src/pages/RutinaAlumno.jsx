import React, { useState, useEffect } from 'react';
import baseURL from '../helpers/rutaBase';
import axios from 'axios';
import {
    Typography, Grid
} from "@mui/material";
import { Box } from '@mui/system';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import '../pages/css/ScrollableContainer.css'; // Archivo CSS para los estilos personalizados
import 'moment/locale/es';
import EjercicioBox from '../components/EjercicioBox'
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import { Link } from 'react-router-dom';

const RutinasAlumno = () => {
    const [rutinas, setRutinas] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { alumno } = useAuth();
    useEffect(() => {
        getRutinas();
    }, []);


    const getRutinas = async () => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
            const res = await axios.get(baseURL + '/rutinas/alumno/', { params: { rutAlumno: rut } });
            const rutinaAlumno = res.data;
            setRutinas(rutinaAlumno);
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = useNavigate();




    return (
        <>
            <div style={{ margin: '20px' }}>
                <Typography style={{
                    color: '#FCB924',
                    textAlign: 'right',
                    fontSize: '2.5rem',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '50px',
                    width: 'auto',
                    height: 'auto',
                }}>
                    TU <br />ENTRENAMIENTO
                </Typography>
                <hr style={{ height: '10px', background: '#C0D437', borderColor: '#C0D437', borderRadius: '23px', opacity: '1' }} />
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
                <Link
                    className="btn btn-secondary"
                    to={`/registroRutinas?rut=${alumno.rut}&nombre=${alumno.nombre}`}
                >
                    Registro Rutinas
                </Link>
            </div>

            <div >

                <div style={{ height: 'auto', width: "auto" }}>
                    {rutinas.map((rutina, i, row) => (
                        <Box key={rutina._id}
                            sx={{
                                borderRadius: '10px',
                                backgroundColor: 'rgba(0,0,0,0.68)',
                                margin: '20px', paddingBottom: '10px'
                            }}
                            style={(i + 1) === row.length ? { marginBottom: '75px' } : null}>
                            <Typography
                                sx={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: '2.5rem',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: '68px',
                                    width: 'auto',
                                    height: 'auto',
                                    flexDirection: 'column',
                                    justifyContent: 'right',
                                }}
                                variant="h5"
                            >
                                {rutina.nombre}
                            </Typography>
                            <div container spacing={2} rowSpacing={2}>
                                <Grid container spacing={2} sx={[
                                    {
                                        '& > div': {
                                            color: 'white',
                                        },
                                        'width': '100%',
                                        'margin': 'auto',
                                    }]}>
                                    <Grid item xs={4} sx={{
                                        padding: '.5rem',
                                        backgroundColor: 'rgba(200, 223, 50, 0.5)',
                                        margin: '.8rem',
                                        borderRadius: '19px'
                                    }}>
                                        <div style={{
                                            width: 'auto',
                                            height: 'auto',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Typography>CARDIO</Typography>
                                            <Typography variant="subtittle2">
                                                Inicial: {rutina.cardioInicial}
                                            </Typography> <br />
                                            <Typography variant="subtittle2">
                                                Final: {rutina.cardioFinal}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={7} md={4} container direction="column">
                                        <Grid item>
                                            <div style={{
                                                marginBottom: '.8rem',
                                                backgroundColor: 'rgba(200, 223, 50, 0.5)',
                                                borderRadius: '19px',
                                                height: 'auto',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                Calentamiento <br /> {rutina.calentamiento}
                                            </div>
                                        </Grid>
                                        <Grid item>
                                            <div style={{
                                                backgroundColor: 'rgba(200, 223, 50, 0.5)',
                                                borderRadius: '19px',
                                                height: 'auto',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                Vuelta a la calma <br /> {rutina.vueltaALaCalma}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>

                            <div>
                                {rutina.ejercicios.map((ejercicio) => {
                                    return (<EjercicioBox
                                        props={{ ejercicio }}
                                    />)
                                })}
                            </div>
                        </Box>

                    ))}
                </div>
            </div>
        </>
    );
};

export default RutinasAlumno;
