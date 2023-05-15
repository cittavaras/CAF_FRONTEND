import axios from 'axios';
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles"; //TODO
import baseURL from '../helpers/rutaBase';

import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Container, DialogActions, DialogTitle, IconButton, Typography, Box, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

import "moment/locale/es";
import useAuth from '../auth/useAuth';
import roles from '../helpers/roles';

import { withResizeDetector } from 'react-resize-detector';

import AlumnosSesion from "./AlumnosSesion";
import {
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

moment.locale("es");
moment.weekdays(true, 2)

const localizer = momentLocalizer(moment);

const messages = {
  today: 'Hoy',
  next: 'Siguiente',
  previous: 'Anterior',
  month: 'Mes',
  week: 'Semana',
  day: 'Día'
};

const alumno_sesion = JSON.parse(sessionStorage.getItem("alumno_sesion"));

const CALENDAR_TITLE = "Reserva tu Entrenamiento";
const CALENDAR_PARAGRAPH = "Selecciona Mes y Día que deseas agendar para ver los bloques disponibles. Luego selecciona el bloque que deseas reservar. Recuerda que solo puedes reservar 3 bloques por semana.";

const StyledDialogTitle = styled(DialogTitle)`
  margin-top: 5px;
  margin-bottom: 20px;
`;

const StyledIconButton = styled(IconButton)`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TitleContainer = styled(Box)`
  text-align: center;
  margin-bottom: 16px;
`;

const CalendarTitle = styled(Typography)`
  font-weight: bold;
`;

const CalendarParagraph = styled(Typography)`
  margin-bottom: 24px;
`;

const ReservarSesion = (props) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //const [views, setViews] = useState([isMobile? ["day"]: ["week", "day"]);
  const { alumno, hasRole } = useAuth();
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [sesiones, setSesiones] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [fechaActual, setFechaActual] = useState(moment().toDate());
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSesion, setSelectedSesion] = useState(null);
  const [alumnosSesion, setAlumnosSesion] = useState([]);

  const handleNavigate = (date, view) => {
    setFechaActual(date);
    setSelectedEvents([]);
  };

  const getSesiones = async () => {
    setLoading(true);
    setEventos([]);
    try {
      const res = await axios.get(baseURL + '/sesiones', {
        params: {
          fecha: fechaActual
        }
      });
      setSesiones(res?.data ?? []);
      console.log("res?.data", res?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const crearReservas = async (e) => {
    e.preventDefault();
    try {
      const body = {
        rut: alumno.rut,
        sesiones: selectedEvents,
        fecha: fechaActual
      }
      const res = await axios.post(baseURL + '/reservas', body);
      console.log(res);
      alert('Sesiones Reservadas');
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSesiones();
    if (hasRole(roles.alumno)) {
      props.getReservasByAlumno(fechaActual)
    };
  }, [fechaActual]);

  useEffect(() => {
    if (props.reservasAlumno && hasRole(roles.alumno)) {
      const sesionesAlumno = props.reservasAlumno.map(r => {
        return {
          ...r.sesion[0], count: 0
        }
      }
      )
      setSelectedEvents(generateTrainingEvents(sesionesAlumno, fechaActual))
    }
  }, [props.reservasAlumno]);

  useEffect(() => {
    if (sesiones.length > 0) {
      const generatedEvents = generateTrainingEvents(sesiones, fechaActual)

      setEventos(generatedEvents);
    }
  }, [sesiones, fechaActual]);

  useEffect(() => {
    if (props.open === false) {
      setSelectedEvents([])
    }
  }, [props.open]);

  useEffect(() => {
    if (selectedSesion != null) {
      getAlumnosByNumeroSesion()
    }
  }, [selectedSesion]);

  const eventStyleGetter = (event) => {
    const fontSize = isMobile ? "0.7em" : "1em";
    const fechaActual = moment();
    const sesionPasada = moment(event.start).isBefore(fechaActual)
    const colorSesion = sesionPasada ? "green" : "yellow"
    const isSelected = selectedEvents.map(e => e.id).includes(event.id);
    const style = {
      backgroundColor: isSelected ? colorSesion : "#2980b9",
      borderRadius: "0",
      opacity: 1,
      display: "block",
      fontSize: fontSize,
    };
    style.backgroundColor = event.isValid ? style.backgroundColor : "#676d70";
    return {
      style,
      children: (
        <Button
          variant="contained"
          color={isSelected ? "secondary" : "primary"}
          onClick={() => handleEventClick(event)}
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            textTransform: "none",
            padding: "4px 8px",
          }}
        >
          {event.title}
        </Button>
      )
    };
  };

  const handleEventClick = (event) => {
    console.log(event.cantidadUsuarios);
    if (hasRole(roles.alumno)) {
      const fechaActual = moment();
      if (!event.isValid) {
        alert("La sesion esta completa");
        return;
      }
      else if (event.desactivada) {
        alert('No se puede hacer clic en una sesión desactivada');
        return;
      }
      if (moment(event.start).isBefore(fechaActual)) {
        alert('No puedes seleccionar un evento pasado');
        return;
      }
      if (selectedEvents.some(selected => selected.dia === event.dia && selected.id !== event.id)) {
        alert('Solo puedes reservar 1 sesion por día');
        return;
      }
      const maxSelections = 3;
      if (
        selectedEvents.length < maxSelections ||
        selectedEvents.map(e => e.id).includes(event.id)
      ) {
        setSelectedEvents((prevState) => {
          if (prevState.map(e => e.id).includes(event.id)) {
            return prevState.filter((e) => e.id !== event.id);
          } else {
            return [...prevState, event];
          }
        });
      } else {
        alert(`¡Solo se permiten seleccionar hasta ${maxSelections} eventos!`);
      }
    } else if (hasRole(roles.admin) || hasRole(roles.instructor)) {
      if (hasRole(roles.instructor) && event.desactivada) {
        alert('No se puede hacer clic en una sesión desactivada');
        return;
      }
      else if (hasRole(roles.instructor) && event.cantidadUsuarios <= 0) {
        alert('No se puede hacer clic en una sesión sin alumnos');
        return;
      }

      setActiveStep(1);
      setSelectedSesion(event);
    }
  };

  const handleBackClick = () => {
    setActiveStep(0);
    setSelectedSesion(null);
    setAlumnosSesion([]);
  };

  const getAlumnosByNumeroSesion = async () => {
    try {
      const res = await axios.get(`${baseURL}/sesiones/${selectedSesion.id}/alumnos`, {
        params: {
          fecha: fechaActual
        }
      });
      setAlumnosSesion(res?.data ?? []);
      console.log("res?.data", res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const tomarAsistencia = async (reservaId, asistencia) => {
    try {
      await axios.put(`${baseURL}/sesiones/reserva/${reservaId}/asistencia`, { asistencia: asistencia });
    } catch (error) {
      console.log(error);
    }
  }

  const desactivarSesion = async () => {
    try {
      setLoading(true);
      await axios.put(`${baseURL}/sesiones/${selectedSesion.id}/desactivar`, {fecha: fechaActual, activar: selectedSesion.desactivada});
      setSelectedSesion({...selectedSesion, desactivada:!selectedSesion.desactivada});
      setLoading(false);
      getSesiones();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container maxWidth="lg"
      style={{ marginTop: '70px' }}
      backgroundColor="red"
    >
      {props.open && <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md" scroll={'paper'} 
      fullScreen={isMobile}>
        <StyledDialogTitle  >
          <StyledIconButton
            aria-label="back"
            onClick={handleBackClick}
            disabled={activeStep === 0}
            sx={{
              position: 'absolute',
              left: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <ArrowBackIcon />
          </StyledIconButton>
          <StyledIconButton
            aria-label="close"
            onClick={props.handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </StyledIconButton>
        </StyledDialogTitle>
        <StyledDialogContent fullScreen={isMobile} style={{ minWidth: '500px', width: '100%' }} theme={theme}>

          <TitleContainer>
            <CalendarTitle variant="h4" component="h2">{CALENDAR_TITLE}</CalendarTitle>
          </TitleContainer>
          <CalendarParagraph variant="body1" component="p">{CALENDAR_PARAGRAPH}</CalendarParagraph>
          {(hasRole(roles.admin) || hasRole(roles.instructor)) &&
            <Stepper activeStep={activeStep} alternativeLabel>
              <Step>
                <StepLabel>Selector</StepLabel>
              </Step>
              <Step>
                <StepLabel>Detalle</StepLabel>
              </Step>
            </Stepper>
          }
          {activeStep === 0 && (
            <CustomCalendar
              localizer={localizer}
              events={eventos}
              startAccessor="start"
              endAccessor="end"
              defaultView={isMobile? "day": "week"}
              views={["month","week", "day"]}
              selectable={false}
              onSelectEvent={handleEventClick}
              eventPropGetter={eventStyleGetter}
              min={new Date(0, 0, 0, 8, 31)}
              max={new Date(0, 0, 0, 21, 10)}
              date={fechaActual}
              onNavigate={handleNavigate}
              disabled={loading}
              messages={messages}
              isMobile={isMobile}
              slotDuration={40}
            />
          )}
          {activeStep === 1 && (
            <>
              <AlumnosSesion alumnosSesion={alumnosSesion} setAlumnosSesion={setAlumnosSesion} tomarAsistencia={tomarAsistencia} />
              <div className='d-flex  justify-content-between' style ={{ marginTop: '20px'}}>
                { hasRole(roles.admin) && <button variant="contained" className= {selectedSesion.desactivada ? "btn btn-outline-success" : "btn btn-outline-danger"} onClick={desactivarSesion} disabled={loading}>
                  {selectedSesion.desactivada ? "Activar sesion" : "Desactivar sesion"}
                </button>}
                <button variant="contained" className="btn btn-success " onClick={handleBackClick}>
                  Guardar asistencia
                </button>
              </div>
            </>
          )}
        </StyledDialogContent>

        <DialogActions>
          {activeStep === 0 && hasRole(roles.alumno) &&
            <Button autoFocus color="success" variant="contained" onClick={crearReservas}>
              Confirmar reserva
            </Button>
          }
        </DialogActions>
      </Dialog>}
    </Container>
  );
};

const generateTrainingEvents = (sesiones = [], fechaActual) => {
  const newSesiones = sesiones.map(sesion => {
    let [hours, minutes] = sesion.horaIni.split(":");
    const start = moment(fechaActual).day(sesion.dia).set({ hours, minutes }).toDate();
    [hours, minutes] = sesion.horaFin.split(":");
    const end = moment(fechaActual).day(sesion.dia).set({ hours, minutes }).toDate();
    const newSesion = {
      id: sesion.numeroSesion,
      title: `Entrenamiento \n${sesion.numeroSesion} \n${sesion?.count}/${sesion?.cantidadUsuarios}`,
      start,
      end,
      isValid: sesion.count < sesion.cantidadUsuarios,
      dia: sesion.dia,
      cantidadUsuarios: sesion.count,
      desactivada: sesion.desactivada
    };
    return newSesion;
  })
  return newSesiones;
};

const CustomCalendar = styled(Calendar)`
  .rbc-calendar {
    min-height: 120vh;
    background-color: #000000; //cambio1
    min-height: ${({ isMobile }) => (isMobile ? "100vh" : "120vh")};
    background-color: #000000;
    max-width: 100%;
    min-height: 100vh;
    background-color: #000000;

  }
  .rbc-toolbar {
    background-color: #ffffff;
    border-bottom: 1px solid #e0e0e0;
  }
  .rbc-toolbar button {
    color: #000;
    background-color: transparent;
    border: none;
  }
  .rbc-toolbar button:hover {
    color: #2980b9;
    background-color: transparent;
  }
  .rbc-header {
    background-color: #ffffff;
    color: #000;
    font-weight: bold;
    padding: 10px 0;
  }
  .rbc-time-view {
    background-color: #f5f5f5;
  }
  .rbc-timeslot-group {
    border-color: #e0e0e0;
  }
  .rbc-time-view .rbc-day-bg.rbc-today {
    background-color: #e0e0e0;
  }
  .rbc-event {
    white-space: normal;
    line-height: 1.2;
    font-size: ${({ isMobile }) => (isMobile ? "0.7em" : "1em")};
    background-color: #2980b9;
    border-radius: 4px;
    color: #fff;
    border: none;
    font-weight: normal;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
  }
  @media (max-width: 600px) {
  .rbc-event-content {
    white-space: normal;
    line-height: 1.2;
  }
}
    
  .rbc-event:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .rbc-event-label {
    font-weight: normal;
    font-size: 0.8em;
  }
  
`;
const StyledDialogContent = styled(DialogContent)`
  ${({ theme }) => theme.breakpoints.down("sm")} {
  
  }
`;

export default withResizeDetector(ReservarSesion);