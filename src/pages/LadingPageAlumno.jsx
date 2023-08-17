import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './css/landing.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Informativo from '../components/Informativo';
import useAuth from '../auth/useAuth';
import roles from "../helpers/roles";
import GimInforma from '../components/GimInforma';
import baseURL from '../helpers/rutaBase';
import ReactWeeklyDayPicker from '../libs/react-weekly-day-picker';
import moment from 'moment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EjercicioBox from '../components/EjercicioBox'
import { Typography } from "@mui/material";

const LandingPageAlumno = ({ location }) => {

  function getTwoDaysAgo() {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    if (today.getDay() - 1 === 0 || today.getDay() - 1 === 1) {
      twoDaysAgo.setDate(today.getDate() - 3);
    } else {
      twoDaysAgo.setDate(today.getDate() - 2);
    }
    // console.log(today)
    // console.log(twoDaysAgo)
    return twoDaysAgo;
  }

  const { alumno } = useAuth();

  const [infoCargada, setInfoCargada] = useState({titulo:"test",imagenBase64:"hola",descripcion:"test"});
  const [daysCount, setDaysCount] = useState();
  const [rutinas, setRutinas] = useState([]);
  const [hasRutina, setHasRutina] = useState(false);
  const day = moment(Date.now()).format('dddd');
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  // console.log(day)

  const getRutinas = async () => {
    try {
      const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
      const res = await axios.get(baseURL + '/rutinas/alumno/', { params: { rutAlumno: rut, day: day } });
      const rutinaAlumno = res.data;
      setRutinas(rutinaAlumno || [{}]);
      setHasRutina(rutinaAlumno.length > 0);
    } catch (error) {
      console.error(error);
    }
  };

  const getlandingPage = async () => {
    const resp = await axios.get(baseURL + '/landing-page/landing-page');
    setInfoCargada(resp.data);
    // console.log(infoCargada)
  };

  useEffect(() => { 
    // console.log(daysCount);
  },[daysCount]);

  useEffect(() => { 
    getlandingPage();
    getRutinas();
  },[]);

  // useEffect(() => {console.log(rutinas); },[rutinas]);
  // useEffect(() => {console.log(infoCargada); },[infoCargada]);

  return (
    <>
      <div className='mt-2 container py-4  text-center'>
        <H1 style={{ fontSize: '2.5rem' }}> Bienvenido </H1>
        <p style={{ fontSize: '1.3rem', color: 'white' }}>{alumno?.nombre ?? 'Sin informacion'}</p>
      </div>
      <div className='mb-5 desktop-width-dayPicker'>
        <ReactWeeklyDayPicker
          daysCount={5}  //How many days will be shown
          // classNames={}  //Overrides classnames for custom classes (below example)
          startDay={getTwoDaysAgo()} // First day as Date Object or 22 June 2016
          selectedDays={[new Date()]} // Selected days list
          multipleDaySelect={false} //enables multiple day selection
          selectDay={function(day){
            //console log name of the day
            // console.log(day);
          }}
          unselectDay={function(day){}}
          onPrevClick={function(startDay, selectedDays){}} // called with the new startDay
          onNextClick={function(startDay, selectedDays){}} // called with the new startDay
          unselectable={false} // if true allows to unselect a date once it has been selected. Only works when multipleDaySelect={false}
          format={'DD-MM-YYYY'} //format of dates that handled in selectDay and unselectDay functions
          firstLineFormat={'ddd'} // format for the first line of the day button
          secondLineFormat={'MMM D'} // format for the second line of the day button
          firstLineMobileFormat={'dddd'} // format for the first line of the day button mobile
          secondLineMobileFormat={'MMMM D, Y'} // format for the second line of the day button mobile
          unavailables={{
            // dates:['22 July 2017'],  //unavailable dates list
            // relative:[0,1],  //unavailable dates list relative to today (0:today, 1:tomorrow, -1:yesterday)
            weekly: [6] //unavailable dates list for each week (0:Sunday, 1:Monday ...)
          }}S
          //mobilView={window.innerWidth < 400}  // enables mobil view
          beforeToday={false}   // all dates before today set as unavailable (default:true)
          hiddens={{  // makes dates invisible
            weekly: [6]  //each week (0:Sunday, 1:Monday ...)
            // dates: ['22 July 2017'], //absolute dates list
            //relative: [1], // relative to today (0:today, 1:tomorrow, -1:yesterday)
          }}
          todayText={'Hoy'}  // replacing today text (default : - TODAY -)
          unavailableText={''}  // replacing unavailable text (default: unavailable )
          useArrows={true}  // use arrows for navigation (default: false)
        />
        <>
          <div className='text-center entrenamiento content'>
          <p className='mb-0 text_shadows animate-entrenamiento'> {hasRutina ? 'TIENES ENTRENAMIENTO' : 'NO TIENES ENTRENAMIENTO'}</p>
          <p className='entrenamiento-desc'>(presiona para saber el contenido)</p>  
          </div>  
        </>
        {rutinas ? rutinas.map((rutina, i, row) => (
          <div className='card container text-light' style={{ backgroundColor: 'rgba(0,0,0, 0)' }}>
          {/* { console.log(rutina) } */}
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
                <Typography sx={{color: 'white'}} >{
                //TittleCase for nombre rutina
                rutina.nombre.toUpperCase()
                } 7</Typography>
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
          </div>
        </div>
        )): null}
      </div>                    
      {
        infoCargada ? (<GimInforma titulo={infoCargada.titulo} imagen={infoCargada.imagenBase64} texto={infoCargada.descripcion}/>) : (<GimInforma titulo="No existe información" imagen="" texto=""/>)
      }
    </>
  )
}
const Div = styled.div`
  font-family: 'Lato', sans-serif;
  color: white;
  top: 100px;
`;

const H1 = styled.h1`
  font-size: '2rem';
  font-weight: 'bold';
  margin-bottom: '20px';
  text-align: 'center';
  font-family: 'Lato', sans-serif;
  color: white;
`;

const P = styled.p`
  font-size: '1.2rem';
  font-weight: 'bold';
  margin-bottom: '20px';
  text-align: 'center';
  font-family: 'Lato', sans-serif;
  color: white;
`;

export default LandingPageAlumno;