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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'

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
    Swal.fire({
      title: 'Deseas eliminar la rutina?',
      text: "Tendras que crear la rutina nuevamente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(baseURL + `/rutinas/alumno/${rutinaId}`);
          setRutinas((prevRutinas) => prevRutinas.filter((rutina) => rutina._id !== rutinaId));
          Swal.fire('Rutina eliminada exitosamente');
          // Aquí puedes manejar la respuesta si es necesario
        } catch (error) {
          console.error(error);
          // Aquí puedes manejar el error si es necesario
        };
        Swal.fire({
          title:'Rutina Eliminada!',
          text:'La rutina ha sido eliminada correctamente.',
          icon:'success',
          confirmButtonColor:'rgba(158 173 56)'
        })
      }
    })

  };
  const handleEditarRutina = (rutinaId) => {
      navigate(`/registroRutinas?rut=${alumno.rut}&nombre=${alumno.nombre}&rutina=${rutinaId}`);
  };

  return (
    <>
      <div style={{ margin: '20px' }}>
        <Typography style={{
          color: '#FCB924',
          textAlign: 'right',
          fontSize: '2.2rem',
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
            <div className='card container text-light' style={{ backgroundColor: 'rgba(0,0,0, 0)' }}>
              { console.log(rutina) }
              <div style={{ margin: 0 }}>
                <Accordion sx={{ backgroundColor: '#8f8f8f9c'}}>
                  <AccordionSummary
                    expanded={expanded === 'panel'+i} 
                    onChange={handleChange('panel1'+i)}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={'panel'+i+'a-header'}
                    sx={{ flexDirection: 'row-reverse' }}
                  >
                    <Typography sx={{color:'white', width:'90%'}}>{
                    //TittleCase for nombre rutina
                    rutina.nombre.toUpperCase()
                    } {rutina.diasDeSemana.length !== 0 ? '(' + rutina.diasDeSemana.join(', ') + ')' : '(sin dias)'} </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className='d-flex gap-2 mb-2 justify-content-between'> 
                      <div className='card' style={{ width: '40%', backgroundColor: 'rgba(200, 223, 50, 0.5)', border: '2px solid #C0D437' }}>
                        <div className='text-center' style={{ paddingTop: '25px' }}>
                          <p>CARDIO</p>
                        </div>
                        <div className='d-inline'>
                          <p className='m-1'>Inicial: <span>{rutina.cardioInicial}</span></p>
                          {/* <div className='text-center' style={{ display: 'inline-block', borderBottom: '2px solid #ffffff'}}>{rutina.cardioInicial}</div> */}
                        </div>
                        <div className=''>
                          <p className='m-1'>Final:&nbsp;&nbsp; <span>{rutina.cardioFinal}</span></p>
                          {/* <div className='text-center' style={{ display: 'inline-block', borderBottom: '2px solid #ffffff'}}>{rutina.cardioFinal}</div> */}
                        </div>
                      </div>
                      <div className='d-flex flex-column gap-2' style={{width: '60%'}}>
                        <div className='card' style={{ backgroundColor: 'rgba(200, 223, 50, 0.5)', border: '2px solid #C0D437' }}>
                          <p>Calentamiento:</p>
                          <div className='mb-2'>
                            <div className='text-center' style={{ borderBottom: '2px solid #ffffff'}}>{rutina.calentamiento}</div>
                          </div>
                        </div>
                        <div className='card' style={{ backgroundColor: 'rgba(200, 223, 50, 0.5)', border: '2px solid #C0D437'}}>
                          <p>Vuelta a la calma:</p>
                          <div className='mb-2'>
                            <div className='text-center' style={{ borderBottom: '2px solid #ffffff' }}> {rutina.cardioFinal}</div>
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
                    <EditIcon onClick={() => handleEditarRutina(rutina._id)} sx={{ color: '#FCB924' }}></EditIcon>
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
