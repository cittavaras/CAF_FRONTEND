import axios from 'axios'; import useAxiosInterceptors from '../auth/axiosResponse';
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles"; //TODO
import baseURL from '../helpers/rutaBase';
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Container, DialogActions, DialogTitle, IconButton, Typography, Box } from "@mui/material";
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
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';

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
  //const [views, setViews] = useState([isMobile? ["day"]: ["week", "day"]]);
  const [views, setViews] = useState(['week','day']);

  const { alumno, hasRole } = useAuth();
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [sesiones, setSesiones] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [fechaActual, setFechaActual] = useState(null);
  const [fechaVista, setFechaVista] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSesion, setSelectedSesion] = useState(null);
  const [alumnosSesion, setAlumnosSesion] = useState([]);
  const [view, setView] = useState(['week','day']);
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
useAxiosInterceptors();
  useEffect(() => {
    fetchServerDate().then((serverDate) => {
      setFechaActual(serverDate);
      setFechaVista(serverDate)
    });
  }, []);
  
  const fetchServerDate = async () => {
    try {
      const response = await fetch(baseURL + '/date',{
        headers: {
            'Authorization': accessToken // Include the JWT token in the Authorization header
        },
         // Include the refreshToken in the request body
      }) // Replace with your server endpoint
      const data = await response.json();
      const serverDate = moment(data.serverDate).toDate();
      var serverAdjust = serverDate;
      if(moment(serverAdjust).isoWeekday() === 7)
        serverAdjust = moment(serverAdjust).add(1, 'day').startOf('day');
      return serverAdjust;
    } catch (error) {
      console.error('Error fetching server date:', error);
      // Handle the error case appropriately
      return error;// Fallback to using the user's local date
    }
  };
  const handleNavigate = (date, view) => {
    if(moment(date).isoWeekday() === 7){
      setFechaVista(moment(date).add(1, 'day').startOf('day'));
    }else{
      setFechaVista(date);
    }
    setSelectedEvents([]);
  };

  const getSesiones = async () => {
    setLoading(true);
    setEventos([]);
    try {
      console.log("Fetching sesiones...");
      const res = await axios.get(baseURL + '/sesiones', {
        params: {
          fecha: fechaVista
        },
          headers: {
              'Authorization': accessToken // Include the JWT token in the Authorization header
          },
           // Include the refreshToken in the request body
        })
      console.log("Sesiones fetched:", res.data);
      setSesiones(res?.data ?? []);
      
      
    } catch (error) {
      console.error("Error fetching sesiones:", error);
    }
    setLoading(false);
  }

  // useEffect(() => {
  //   console.log("sesionesUseEffect", sesiones);
  // }, [sesiones]);
  
  const crearReservas = async (e) => {
    e.preventDefault();
    try {
      console.log("Creating reservas...");
      const body = {
        sesiones: selectedEvents,
        fecha: fechaVista
      }
      const res = await axios.post(baseURL + '/reservas', body,{
        headers: {
            'Authorization': accessToken // Include the JWT token in the Authorization header
        },
         // Include the refreshToken in the request body
      })
      
    console.log("Reservas created:", res.data);
    const { message, rev, fallidas } = res.data;
    let alertMessage = message;
    if (fallidas && fallidas.length > 0 && !rev.length>0) {
      const filledSessionsMessage = `Reservación Fallida. Las siguientes sesiones ya se encuentran llenas:\n${fallidas.map(session => `día ${session.dia} sesion ${session.numeroSesion}`).join('\n')}`;
      alertMessage =filledSessionsMessage;
    }else if(fallidas && fallidas.length > 0 && rev.length>0){
      const filledSessionsMessage = `Reservación completada con problemas. Las siguientes sesiones ya se encuentran llenas:\n${fallidas.map(session => `día ${session.dia} sesion ${session.numeroSesion}`).join('\n')}`;
      alertMessage =filledSessionsMessage;
    }else{
      alertMessage='Reservación completada exitosamente'
    }
      alert(alertMessage);

      const reservas = await props.getReservasByAlumno(fechaVista);
      console.log("Reservas fetched:", reservas);
      await enviarCorreoReservasCreadas(alumno, reservas);

      props.handleClose();
    } catch (error) {
      console.error("Error creating reservas:", error);
    }
  }

  const enviarCorreoReservasCreadas = async (alumno, reservas) => {
    try {
      let sesionesReservadasText = '';
      const options = {
        weekday: 'long', 
        month: 'long',             // Full day name (e.g., "Monday")
        day: 'numeric',               // Day of the month (e.g., 1, 2, 3)
        hour: 'numeric',              // Hour in 12-hour format (e.g., 1, 2, 3)
        minute: 'numeric',            // Minute (e.g., 0, 1, 2)
        hour12: false,                 // Whether to use 12-hour format or not
        timeZone: 'America/Santiago',        // Exclude time zone name
      };
      var n= 0;
      for (const reserva of reservas) {
        const fecha=new Date(reserva.diaReserva);
        const formatter = new Intl.DateTimeFormat('es-ES', options);
        const [weekday, day,month, hour, minute] = formatter.formatToParts(fecha).filter(part => part.type !== 'literal')
        const fechaFormato = `${weekday.value.charAt(0).toUpperCase()}${weekday.value.slice(1)} ${day.value} de ${month.value}, ${hour.value}:${minute.value}hrs.`;
        const textoSesion = `-${fechaFormato}\n`;
        sesionesReservadasText += textoSesion;
        n++;
      }
      if (n>0){await axios.post(baseURL + '/send-email', {
        to: alumno.correo,
        subject: 'Reserva de Sesiones CAF',
        text: `Estimado ${alumno.nombre}, Le informamos que en la semana seleccionada cuenta con las siguientes reservas:\n${sesionesReservadasText}.`,
        html: `<p>Estimado <strong>${alumno.nombre}</strong>,</p><p>Le informamos que en la semana seleccionada cuenta con las siguientes reservas:</p><p>${sesionesReservadasText}</p>`,
      },{
        headers: {
            'Authorization': accessToken // Include the JWT token in the Authorization header
        },
         // Include the refreshToken in the request body
      })}
      
      

      //console.log(`Correo de reserva enviado a ${alumno.nombre}`);
    } catch (error) {
      //console.error('Error al enviar el correo de reserva:', error);
    }
  };

  useEffect(() => {
    getSesiones();
    if (hasRole(roles.alumno)) {
      props.getReservasByAlumno(fechaVista)
    };
  }, [fechaVista]);

  useEffect(() => {
    if (props.reservasAlumno && hasRole(roles.alumno)) {
      const sesionesAlumno = props.reservasAlumno
        .map(r => r.sesion.length !== 0 ? { ...r.sesion[0], count: 0 } : null)
        .filter(session => session !== null);

      setSelectedEvents(generateTrainingEvents(sesionesAlumno, fechaVista, fechaActual, hasRole));
    }
  }, [props.reservasAlumno, fechaVista, fechaActual]);

  useEffect(() => {
    if (sesiones.length > 3) {
      const generatedEvents = generateTrainingEvents(sesiones, fechaVista, fechaActual, hasRole);
      setEventos(generatedEvents);
    }
  }, [sesiones, fechaVista, fechaActual]);

  useEffect(() => {
    if (props.open === false) {
      setSelectedEvents([])
    }
  }, [props.open]);

  useEffect(() => {
    if (selectedSesion != null) {
      console.log("Selected session:", selectedSesion);
      getAlumnosByNumeroSesion()
    }
  }, [selectedSesion]);

  useEffect(() => {
    setViews(['week','day']);
  }, []);

  
  const colorsCalendar = {
    asistio: "green",
    falta: "red",
    reserva: "yellow",
    disponible: "#2980b9",
    sinCupo: "#44494b",
    desactivada: "#8c9599"
  }

  const eventStyleGetter = (event) => {
    const fontSize = isMobile ? "0.7em" : "1em";
    const sesionPasada = moment(event.start).isBefore(fechaActual);
    const asistio = props.reservasAlumno.some((reserva) => reserva.numeroSesion === event.id && reserva.asistencia);
    const colorSesion = sesionPasada ? (asistio ? colorsCalendar.asistio : colorsCalendar.falta) : colorsCalendar.reserva;
    const isSelected = selectedEvents.map((e) => e.id).includes(event.id);
    const style = {
      backgroundColor: isSelected ? colorSesion : colorsCalendar.disponible,
      borderRadius: "0",
      opacity: 1,
      display: "block",
      fontSize: fontSize,
    };
    if (!isSelected) {
      style.backgroundColor = event.isValid ? style.backgroundColor : colorsCalendar.sinCupo;
    }
    style.backgroundColor = !event.desactivada ? style.backgroundColor : colorsCalendar.desactivada; // Apply "Desactivada" color
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
      ),
    };
  };

  const handleEventClick = (event) => {
    if (hasRole(roles.alumno)) {
      const isSelected = selectedEvents.map((e) => e.id).includes(event.id);
      const sameDaySessions = selectedEvents.filter(selected => selected.dia === event.dia);
      const maxReservationDate = moment(fechaActual).add(14, 'days').endOf('day');
      if (moment(event.start).isAfter(maxReservationDate)) {
        alert('No puedes reservar sesiones más allá de dos semanas desde hoy.');
        return;
      }
      if (!isSelected && !event.isValid) {
        alert("La sesion esta completa");
        return;
      } else if (event.desactivada) {
        alert('No se puede hacer clic en una sesión desactivada');
        return;
      }
      if (sameDaySessions.length > 0 && !sameDaySessions.some(e => e.id === event.id)) {
        alert('Solo puedes reservar 1 sesion por día');
        return;
      }
      
      if (moment(event.start).isBefore(fechaActual)) {
        alert('No puedes seleccionar un evento pasado');
        return;
      }
      
      const maxSelections = 3;
    if (selectedEvents.length < maxSelections || isSelected) {
      setSelectedEvents((prevState) => {
        if (isSelected) {
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
    alert('Se guardo correctamente la asistencia');
  };

  const getAlumnosByNumeroSesion = async () => {
    try {
      console.log("Fetching alumnos by numero sesion...");
      const res = await axios.get(`${baseURL}/sesiones/${selectedSesion.id}/alumnos`, {
        params: {
          fecha: fechaVista
        },
          headers: {
              'Authorization': accessToken // Include the JWT token in the Authorization header
          },
           // Include the refreshToken in the request body
        })
      console.log("Alumnos fetched:", res.data);
      setAlumnosSesion(res?.data ?? []);
    } catch (error) {
      console.error("Error fetching alumnos by numero sesion:", error);
    }
  }

  const tomarAsistencia = async (reservaId, asistencia) => {
    try {
      await axios.put(`${baseURL}/sesiones/reserva/${reservaId}/asistencia`, { asistencia: asistencia },{
        headers: {
            'Authorization': accessToken // Include the JWT token in the Authorization header
        },
         // Include the refreshToken in the request body
      })
    } catch (error) {
      console.log(error);
    }
  }

  const desactivarSesion = async () => {
    try {
      setLoading(true);
      await axios.put(`${baseURL}/sesiones/${selectedSesion.id}/desactivar`, { fecha: fechaVista, activar: selectedSesion.desactivada },{
        headers: {
            'Authorization': accessToken // Include the JWT token in the Authorization header
        },
         // Include the refreshToken in the request body
      })
      setSelectedSesion({ ...selectedSesion, desactivada: !selectedSesion.desactivada });
      setLoading(false);
      getSesiones();
      if (!selectedSesion.desactivada === true) {
        await getAlumnosByNumeroSesion();
        const alumnos = alumnosSesion
        for (const alumno of alumnos) {
          await enviarCorreoSesionDesactivada(alumno);
          await axios.delete(`${baseURL}/reservas/${alumno.reservaId}`,{
            headers: {
                'Authorization': accessToken // Include the JWT token in the Authorization header
            },
             // Include the refreshToken in the request body
          })
        }
        await getAlumnosByNumeroSesion();
        getSesiones();
      }
    } catch (error) {
      console.error('Error al desactivar la sesión:', error);
    }
  }

  const deleteSesion = async () => {
    try {
      //console.log(selectedSesion)
      setLoading(true);
      props.handleClose();
      console.log("Deleting sesion...");
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No sera posible revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
      }).then( async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${baseURL}/sesiones/${selectedSesion.id}`,{
            headers: {
                'Authorization': accessToken // Include the JWT token in the Authorization header
            },
             // Include the refreshToken in the request body
          }).then(() => {
          //get back to prev modal
          });
          console.log("Sesion deleted successfully"); 
          Swal.fire(
            'Eliminado!',
            'Tu bloque ha sido eliminado.',
            'success'
          )
        }
      })
      setLoading(false);
    } catch (error) {
      console.error('Error al eliminar la sesión:', error);
    }

  }

  const handleViewChange = (view) => {
    //console.log(view);
    setView(view);
    const mes = 5; // mayo
    const anio = 2023;
    const eventosMes = generateTrainingEventsForMonth(mes, anio, sesiones,fechaActual);
    //console.log("eventosMes", eventosMes);
    setEventos(eventosMes);
  };

  const enviarCorreoSesionDesactivada = async (alumno) => {
    try {
      await axios.post(baseURL + '/send-email', {
        to: alumno.correo,
        subject: 'Sesión Desactivada CAF',
        text: `Estimado ${alumno.nombre}, Lamentamos informarle que una de las sesiones que reservo ha sido desactivada. Recomendamos reservar otra sesion en el sitio. https://caf.ivaras.cl/`,
        html: `<p>Estimado <strong>${alumno.nombre}</strong>,</p><p>Lamentamos informarle que una de las sesiones que reservo ha sido desactivada. Recomendamos reservar otra sesion en el sitio. https://caf.ivaras.cl/</p>`,
      },{
        headers: {
            'Authorization': accessToken // Include the JWT token in the Authorization header
        },
         // Include the refreshToken in the request body
      })
      //console.log(`Correo enviado a ${alumno.nombre}`);
    } catch (error) {
      //console.error('Error al enviar el correo:', error);
    }
  };

  return (
    <Container maxWidth="lg"
      style={{ marginTop: '70px' }}
      backgroundColor="red"
    >
      {props.open && <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md" scroll={'paper'} 
       /*fullScreen={isSmallScreen}*/>
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
        <StyledDialogContent style={{ minWidth: '500px', width: '100%' }} theme={theme}>

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
            <>
              <Stack direction="row" spacing={1} justifyContent="center">
                <Chip label="Asistió" size="small" style={{ backgroundColor: colorsCalendar.asistio, color: 'white' }} />
                <Chip label="No asistió" size="small" style={{ backgroundColor: colorsCalendar.falta, color: 'white' }} />
                <Chip label="Reservado" size="small" style={{ backgroundColor: colorsCalendar.reserva, color: 'black' }} />
                <Chip label="Disponible" size="small" style={{ backgroundColor: colorsCalendar.disponible, color: 'white' }} />
                <Chip label="Sin Cupo" size="small" style={{ backgroundColor: colorsCalendar.sinCupo, color: 'white' }} />
                <Chip label="Desactivada" size="small" style={{ backgroundColor: colorsCalendar.desactivada, color: 'white' }} />
              </Stack>

              <CustomCalendar
                localizer={localizer}
                events={eventos}
                startAccessor="start"
                endAccessor="end"
                defaultView={["week"]}
                views={views}
                selectable={false}
                onSelectEvent={handleEventClick}
                eventPropGetter={eventStyleGetter}
                min={new Date(0, 0, 0, 8, 31)}
                max={new Date(0, 0, 0, 21, 10)}
                date={fechaVista}
                onNavigate={handleNavigate}
                disabled={loading}
                messages={messages}
                isMobile={isMobile}
                slotDuration={40}
              />
            </>)}

          {activeStep === 1 && (
            <>
              <AlumnosSesion alumnosSesion={alumnosSesion} setAlumnosSesion={setAlumnosSesion} tomarAsistencia={tomarAsistencia} />
              <div className='d-flex  justify-content-between' style={{ marginTop: '20px' }}>
                {hasRole(roles.admin) && <button variant="contained" className={selectedSesion.desactivada ? "btn btn-outline-success" : "btn btn-outline-warning"} onClick={desactivarSesion} disabled={loading}>
                  {selectedSesion.desactivada ? "Activar sesion" : "Desactivar sesion"}
                </button>}
                {hasRole(roles.admin) && <button variant="contained" className={"btn btn-outline-danger"} onClick={deleteSesion} disabled={loading}>
                  {"Eliminar sesion"}
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
              Actualizar Reservas
            </Button>
          }
        </DialogActions>
      </Dialog>}
    </Container>
  );
};

const generateTrainingEvents = (sesiones = [], fecha, fechaActual, hasRole) => {
  const maxReservationDate = moment(fechaActual).add(14, 'days').endOf('day'); // 14-day limit

  const newSesiones = sesiones.map(sesion => {
    let [hours, minutes] = sesion.horaIni.split(":");
    const start = moment(fecha).day(sesion.dia).set({ hours, minutes }).toDate();
    [hours, minutes] = sesion.horaFin.split(":");
    const end = moment(fecha).day(sesion.dia).set({ hours, minutes }).toDate();

    let isBeyondLimit = moment(start).isAfter(maxReservationDate);
    if (hasRole(roles.admin||roles.instructor)) {
      isBeyondLimit = false;
    }
    const newSesion = {
      id: sesion.numeroSesion,
      title: `Inscritos: ${sesion?.count}/${sesion?.cantidadUsuarios}`,
      start,
      end,
      isValid: sesion.count < sesion.cantidadUsuarios,
      dia: sesion.dia,
      cantidadUsuarios: sesion.count,
      cantidadMax: sesion.cantidadUsuarios,
      desactivada: sesion.desactivada || isBeyondLimit, // Mark as desactivada if beyond the limit
    };
    return newSesion;
  });

  return newSesiones;
};

const generateTrainingEventsForMonth = (month, year, sesiones,fechaActual) => {
  // console.log('INSIDE generateTrainingEventsForMonth', sesiones)
  const startOfMonth = moment(`${year}-${month}-01`, "YYYY-MM-DD").toDate();
  const endOfMonth = moment(startOfMonth).endOf('month').toDate();
  const monthEvents = [];
  
  for (let day = 1; day <= moment(endOfMonth).date(); day++) {
    const date = moment(`${year}-${month}-${day}`, "YYYY-MM-DD").toDate();
    const sesionesDia = sesiones.filter(sesion => moment(sesion.fecha).isoWeekday() === moment(date).isoWeekday());
    const eventsDia = generateTrainingEvents(sesionesDia, date, fechaActual);
    monthEvents.push(...eventsDia);
  }
  // console.log(monthEvents)
  return monthEvents;
};

const CustomCalendar = styled(Calendar)`
  .rbc-calendar {
    min-height: 120vh;
    background-color: #000000; //cambio1
    min-height: ${({ isMobile }) => (isMobile ? "80vh" : "120vh")};
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
    text-shadow: 1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000;
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
    min-width: 710px;
    overflow-x: auto;
  }
`;

export default withResizeDetector(ReservarSesion);