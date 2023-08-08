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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import { useHistory } from 'react-router-dom';
const RutinasAlumno = () => {
  //const history = useHistory();
  const navigate = useNavigate();
  const [rutinas, setRutinas] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { alumno } = useAuth();
  useEffect(() => {
    getRutinas();
  }, []);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
  const BorrarRutina = async (rutinaId) => {
    try {
      const res = await axios.delete(baseURL + `/rutinas/alumno/${rutinaId}`);
      setRutinas((prevRutinas) => prevRutinas.filter((rutina) => rutina._id !== rutinaId));
      console.log('Rutina eliminada exitosamente');
      // Aquí puedes manejar la respuesta si es necesario
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error si es necesario
    }
  };
  const handleEditarRutina = (rutina) => {
    console.log("rutina", rutina)
    navigate('/registroRutinas', { state: { rutina: rutina } });
  };
  
  
/*
 Sort rutinas by rutina 1, rutina 2, rutina 3
*/

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
        <hr style={{ height: '10px', background: '#C0D437', borderColor: '#C0D437', borderRadius: '9px', opacity: '1' }} />
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
          Registrar Rutina
        </Link>
      </div>
      <div style={{ marginBottom: '10rem' }} >
        <div className='mt-4' style={{ height: 'auto', width: "auto" }}>
          {/* I need sort rutinas from rutina 1 to rutina 2 to rutina 3
                how can i do it
                */}
          {rutinas.map((rutina, i, row) => (
            <div className='card container text-light' style={{ backgroundColor: 'rgba(0,0,0,0.68)' }}>
              { console.log(rutina) }
              <div style={{ margin: 0 }}>
                  <Accordion>
                    <AccordionSummary
                      expanded={expanded === 'panel'+i} 
                      onChange={handleChange('panel1'+i)}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id={'panel'+i+'a-header'}
                      sx={{ flexDirection: 'row-reverse', backgroundColor: '#fffff!important'}}
                    >
                      <Typography>{rutina.nombre}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: 'rgba(0,0,0,100)'}}>
                      <div className="row m-2 justify-content-center">
                        <div className="col-4 card" style={{ backgroundColor: 'rgba(200, 223, 50, 0.5)', margin: '0' }}>
                          <div className=''>
                            <div className='text-center' style={{ paddingTop: '25px' }}>
                              <p>CARDIO</p>
                            </div>
                            <div className='mb-2 d-flex align-items-center'>
                              <p className='m-2' style={{ display: 'inline' }}>Inicial</p>:
                              <div className='text-center' style={{ display: 'inline-block', borderBottom: '2px solid #ffffff', width: '70%', }}>{rutina.cardioInicial}</div>
                            </div>
                            <div className='mb-2 d-flex align-items-center'>
                              <p style={{ display: 'inline', margin: '11px' }}>Final</p>:
                              <div className='text-center' style={{ display: 'inline-block', borderBottom: '2px solid #ffffff', width: '70%', }}>{rutina.cardioFinal}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-8">
                          <div className='card p-3 mb-2' style={{ backgroundColor: 'rgba(200, 223, 50, 0.5)' }}>
                            <p>Calentamiento:</p>
                            <div className='mb-2 d-flex align-items-center'>
                              <div className='text-center' style={{ borderBottom: '2px solid #ffffff', width: '100%', }}>{rutina.calentamiento}</div>
                            </div>
                          </div>
                          <div className='card p-3' style={{ backgroundColor: 'rgba(200, 223, 50, 0.5)', margin: 0 }}>
                            <p>Vuelta a la calma:</p>
                            <div className='mb-2 d-flex align-items-center'>
                              <div className='text-center' style={{ borderBottom: '2px solid #ffffff', width: '100%', }}> {rutina.cardioFinal}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {rutina.ejercicios.map((ejercicio) => {
                          return (<EjercicioBox
                            props={{ ejercicio }}
                          />)
                        })}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <div className='d-block position-absolute' style={{ top: '10px', right: '30px'}}>
                      <EditIcon onClick={() => handleEditarRutina(rutina)} sx={{ color: '#FCB924' }}></EditIcon>
                      <DeleteIcon onClick={() => BorrarRutina(rutina._id)} sx={{ color: '#CB0303', }}></DeleteIcon>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RutinasAlumno;
