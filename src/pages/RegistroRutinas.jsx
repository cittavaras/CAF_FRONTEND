import {
  Button, Typography, Grid,
  Select, IconButton, MenuItem,
  Autocomplete, InputLabel, TableContainer,
  Table, TableHead, TableRow,
  TableCell, TableBody, TextField, FormControl
} from "@mui/material";
import moment from 'moment';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import baseURL from '../helpers/rutaBase';
import { Container, Box, bgcolor } from '@mui/system';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';
import ReactWeeklyDayPicker from '../libs/react-weekly-day-picker';
import BoxEjerciciosForm from '../components/BoxEjerciciosForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddIcon from '@mui/icons-material/Add';



//import { useTheme } from "@mui/material/styles";

function getMondayOfCurrentWeek() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Calculate the difference to Monday (0 for Monday, 1 for Tuesday, etc.)
  const monday = new Date(today);
  monday.setDate(today.getDate() - diff);
  return monday;
}

const RegistroRutinas = (props) => {

  const isMobile = useMediaQuery('(max-width:600px)');
  const location = useLocation();
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const rutina = location.state?.rutina || {};
  const isEditing = !!rutina; // Si rutina está definida, estás en modo de edición
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const rut = searchParams.get('rut');
    const nombre = searchParams.get('nombre');

    // Aquí puedes hacer las validaciones y asignaciones necesarias
    const alumnoRutina = {
      rut,
      nombre,
      // Resto de los datos del alumno
    };

    setAlumnoSeleccionado(alumnoRutina);
  }, [location.search]);

  useEffect(() => {
    if (alumnoSeleccionado) {
      // Aquí puedes hacer las validaciones y asignaciones necesarias
      // getRutinas();
    }
  }, [alumnoSeleccionado]);
  //const filasTabla = Array.from(Array(8).keys());
  const [selectedRutina, setSelectedRutina] = useState([]);
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [rutinas, setRutinas] = useState([]);
  const [nomRutina, setNomRutina] = useState("");
  const [detalleRutina, setDetalleRutina] = useState("");
  const [cardioInicial, setCardioInicial] = useState("");
  const [cardioFinal, setCardioFinal] = useState("");
  const [calentamiento, setCalentamiento] = useState("");
  const [vueltaALaCalma, setVueltaALaCalma] = useState("");
  const [selectedExercises, setSelectedExercises] = useState({}); // Inicialización vacía
  const [selectedRepeticion, setSelectedRepeticion] = useState({}); // Inicialización vacía
  const [selectedKg, setSelectedKg] = useState({}); // Inicialización vacía
  const [selectedSerie, setSelectedSerie] = useState({}); // Inicialización vacía
  const [selectedDescanso, setSelectedDescanso] = useState({});
  const { alumno } = useAuth();
  const navigate = useNavigate();
  
  const actionButtonText = isEditing ? 'Guardar Cambios' : 'Crear Rutina';
  let selectedDays = [];

  const ejercicios = [
    { id: 1, nombre: "Flexiones de brazo apoyo" },
    { id: 2, nombre: "Rodillas" },
    { id: 3, nombre: "Elevaciones de hombro" },
    { id: 4, nombre: "Frontales con disco" },
    { id: 5, nombre: "Dorsalera" },
    { id: 6, nombre: "Remo polea" },
    { id: 7, nombre: "Pall off press" },
    { id: 8, nombre: "Prensa 45°" },
    { id: 9, nombre: "Extensión de rodilla" },
    { id: 10, nombre: "Máquina Cuadríceps" },
    { id: 11, nombre: "Puente isquiotibiales" },
    { id: 12, nombre: "Press banca" },
    { id: 13, nombre: "Press de hombros" },
    { id: 14, nombre: "Mancuernas" },
    { id: 15, nombre: "Dorsalera polea" },
    { id: 16, nombre: "Remo mancuernas" },
    { id: 17, nombre: "Estocadas" },
    { id: 18, nombre: "Peso muerto Rumano" },
    { id: 19, nombre: "Búlgaras" },
    { id: 20, nombre: "Hip Thrust" },
    { id: 21, nombre: "Elevaciones de talones" },
    { id: 22, nombre: "Smith" },
    { id: 23, nombre: "Crunch Abdominal" },
    { id: 24, nombre: "Puente isquiotibiales" }
  ];

  const handleCardioInicialChange = (event) => {
    setCardioInicial(event.target.value);
  };
  const handleCardioFinalChange = (event) => {
    setCardioFinal(event.target.value);
  };
  const handleCalentamientoChange = (event) => {
    setCalentamiento(event.target.value);
  };
  const handleVueltaALaCalmaChange = (event) => {
    setVueltaALaCalma(event.target.value);
  };


  const handleAddDias = (day) => {
    selectedDays = day;
    console.log(selectedDays)
  };
  // const handleDiasChange = (index, value) => {
  //   const updatedDias = [...selectedDias];
  //   updatedDias[index] = value;
  //   setDiasSeleccionados(updatedDias);
  // };

  const handleExerciseChange = (index, value) => {
    const updatedExercises = [...selectedExercises];
    updatedExercises[index] = value;
    setSelectedExercises(updatedExercises);
  };
  const handleRepeticionChange = (index, value) => {
    const updatedRepeticion = [...selectedRepeticion];
    updatedRepeticion[index] = value;
    setSelectedRepeticion(updatedRepeticion);
  };
  const handleSerieChange = (index, value) => {
    const updatedSerie = [...selectedSerie];
    updatedSerie[index] = value;
    setSelectedSerie(updatedSerie);
  };
  const handleKgChange = (index, value) => {
    const updatedKg = [...selectedKg];
    updatedKg[index] = value;
    setSelectedKg(updatedKg);
  };
  const handleDescansoChange = (index, value) => {
    const updatedDescanso = [...selectedDescanso];
    updatedDescanso[index] = value;
    setSelectedDescanso(updatedDescanso);
  };
  const volverALanding = (e) => {
    e.preventDefault();
    try {
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  // const BorrarRit
  const registrarRutina = async (e) => {
    e.preventDefault();

    if (alumno.tipoUsuario === "Alumno") {
      try {
        const res = await axios.post(baseURL + '/rutinas/alumno/', {
          nombre: nomRutina,
          diasDeSemana: selectedDays,
          alumnoId: alumnoSeleccionado.rut,
          cardioInicial: cardioInicial,
          cardioFinal: cardioFinal,
          calentamiento: calentamiento,
          vueltaALaCalma: vueltaALaCalma,
          ejercicios: getEjercicios(),
        });

        // Mostrar el alert
        alert('Rutina registrada');

        // Redirigir al usuario a la página anterior
        navigate(-1);
      } catch (error) {
        console.error(error);
      }
    }
    else {
      try {
        const res = await axios.post(baseURL + '/rutinas/alumno/', {
          nombre: nomRutina,
          diasDeSemana: selectedDays,
          instructorId: alumno.rut,
          alumnoId: alumnoSeleccionado.rut,
          cardioInicial: cardioInicial,
          cardioFinal: cardioFinal,
          calentamiento: calentamiento,
          vueltaALaCalma: vueltaALaCalma,
          ejercicios: getEjercicios(),
        });

        // Mostrar el alert
        alert('Rutina registrada');

        // Redirigir al usuario a la página anterior
        navigate(-1);
      } catch (error) {
        console.error(error);
      }
    }
  }
  const editarRutina = async (e, rutinaId, datosRutina) => {
    e.preventDefault();
    try {
      const putRes = await axios.put(`/rutinas/alumno/${rutinaId}`, datosRutina);
      return putRes.data;
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar el error si es necesario
      return null;
    }
  }

  const getEjercicios = () => {
    const ejerciciosFormateados = selectedRutina.map((ejercicio) => {
      return {
        nombre: selectedExercises[ejercicio],
        repeticiones: selectedRepeticion[ejercicio],
        series: selectedSerie[ejercicio],
        kg: selectedKg[ejercicio],
        descanso: selectedDescanso[ejercicio],
      }
    }
    )
    return ejerciciosFormateados;
  }
  const generarEjercicios = (ejercicios = []) => {
    setSelectedExercises(ejercicios.map(ejercicio => ejercicio.nombre));
    setSelectedRepeticion(ejercicios.map(ejercicio => ejercicio.repeticiones));
    setSelectedSerie(ejercicios.map(ejercicio => ejercicio.series));
    setSelectedKg(ejercicios.map(ejercicio => ejercicio.kg));
    setSelectedDescanso(ejercicios.map(ejercicio => ejercicio.descanso));
    setSelectedRutina(ejercicios.map((ejercicio, index) => index));
  }

  const classNames1 = {
    dayBox: 'rwdpDayBoxDesktop rwdp-flex-box rwdp-flex-row rwdp-justify-content-center',
  }
  
  // const handleActionButtonClick = async () => {
  //   if (isEditing) {
  //     console.log("put")
  //     // await guardarCambiosRutina(rutina._id, rutina);
  //   } else {
  //     console.log("post")
  //     await registrarRutina();
  //   }
  // };
  
  return (
    <>
      {/*Esto es lo que va a quedar ahora Este es el titulo*/}
      <div style={{ margin: '20px', marginBottom: '100px'}}>
        <Box className="flex-row justify-content-around" sx={{ margin: '21px', display: 'flex', alignItems: 'center'}}>
          <div className="m-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="6rem" height="auto" viewBox="0 0 144 94" fill="none">
              <path d="M88.1266 64.5041C88.7718 64.6167 89.1688 64.7461 89.5634 64.7485C96.2581 64.7605 102.953 64.7413 109.647 64.7725C110.793 64.7773 111.226 64.4106 111.214 63.1811C111.157 57.7912 111.283 52.3964 111.153 47.0089C111.094 44.5907 112.913 43.0114 115.04 43.1336C117.828 43.2942 120.629 43.1743 123.424 43.2007C126.605 43.2318 129.018 45.499 129.263 48.7201C129.32 49.4606 129.556 49.753 130.31 49.8201C133.512 50.1053 135.793 52.6169 135.819 55.8499C135.84 58.4047 135.849 60.9619 135.809 63.5167C135.795 64.4489 136.116 64.8132 137.045 64.7701C138.264 64.715 139.486 64.7365 140.706 64.7677C142.634 64.8156 144.007 66.2751 144 68.2212C143.993 69.9371 142.537 71.3487 140.687 71.3967C139.585 71.4254 138.482 71.4062 137.378 71.411C136.348 71.4158 135.831 71.9591 135.828 73.0407C135.823 75.5164 135.84 77.9921 135.812 80.4702C135.778 83.6265 133.536 86.071 130.405 86.2963C129.538 86.3586 129.285 86.6846 129.23 87.5306C129.039 90.6006 126.591 92.9421 123.568 92.9709C120.655 92.9972 117.741 92.9756 114.827 92.9517C112.568 92.9325 111.238 91.6096 111.228 89.34C111.207 83.9093 111.219 78.4786 111.214 73.0455C111.214 71.459 111.195 71.423 109.638 71.4206C102.038 71.411 94.4385 71.411 86.8388 71.4206C85.2366 71.4206 85.194 71.4829 85.194 73.1126C85.1917 78.3037 85.0853 83.4971 85.2318 88.6857C85.3169 91.6695 83.4879 93.1146 81.0161 92.99C78.3458 92.8558 75.6613 92.99 72.9839 92.9756C69.6992 92.9565 67.3385 90.7228 67.1116 87.3964C67.0596 86.6462 66.8115 86.3011 66.0553 86.3131C65.6276 86.3203 65.1644 86.3059 64.7745 86.1549C63.7466 85.7547 62.9951 86.1765 62.1751 86.7637C59.4859 88.6929 56.7565 90.5671 54.0272 92.4388C52.9449 93.1818 51.7869 93.2177 50.7212 92.4388C44.5393 87.9332 38.2677 83.5426 32.2323 78.8405C25.8047 73.834 19.8733 68.2332 14.476 62.0835C10.6029 57.6714 7.03463 53.01 4.35252 47.7422C1.56406 42.2612 -0.342957 36.531 0.0516801 30.2159C0.446317 23.8913 2.40296 18.1778 6.09884 13.0347C8.96055 9.05155 12.5548 5.92639 16.8131 3.70474C23.2077 0.373469 29.9945 -0.800864 37.1594 0.615525C42.63 1.69639 47.316 4.27513 51.5128 7.88681C52.1391 8.42604 52.6424 8.42125 53.2544 7.85325C56.74 4.62503 60.8352 2.45372 65.3251 1.1236C69.6071 -0.144196 73.9741 -0.326338 78.4049 0.512472C82.5497 1.29616 86.4441 2.64065 90.0148 4.9294C94.4125 7.7478 97.9477 11.4074 100.554 15.9777C103.586 21.2934 104.905 27.0356 104.697 33.1541C104.583 36.4591 103.711 39.5818 102.605 42.6734C100.497 48.5619 97.0355 53.6091 93.2427 58.4502C91.8509 60.2261 90.3125 61.8846 88.8427 63.5981C88.6654 63.8042 88.5047 64.0247 88.1243 64.5041H88.1266ZM52.8409 38.3691C52.6448 38.2062 52.451 38.0432 52.2548 37.8826C52.08 38.2901 51.9122 38.6999 51.7255 39.1001C51.1749 40.2864 50.6054 41.4655 50.0643 42.6567C48.0485 47.0952 46.0564 51.5432 44.0218 55.9746C43.3129 57.518 41.791 58.352 40.2787 58.0764C39.005 57.8439 38.2866 56.8829 37.6674 55.8427C36.6348 54.1052 35.6588 52.3317 34.5576 50.6397C34.2953 50.2347 33.6407 49.8632 33.1658 49.8608C27.1824 49.8129 21.1967 49.8297 15.2109 49.8536C14.8045 49.8536 14.4004 50.0406 13.9963 50.1412C14.1546 50.563 14.2255 51.0471 14.4807 51.3947C19.8308 58.7043 26.2159 64.9977 33.0594 70.8502C38.9506 75.8879 45.1585 80.4942 51.4939 84.9351C52.1603 85.4024 52.6329 85.3976 53.2804 84.9255C55.3812 83.3916 57.5553 81.9561 59.6253 80.3815C60.0838 80.034 60.4571 79.2863 60.4879 78.7015C60.6013 76.6716 60.5162 74.6297 60.5682 72.595C60.5942 71.6267 60.1807 71.3416 59.2921 71.3775C58.035 71.4302 56.7731 71.4254 55.5136 71.3943C53.668 71.3487 52.269 69.9276 52.2808 68.1613C52.2927 66.2536 53.6325 64.8252 55.4946 64.7725C56.7542 64.7365 58.0161 64.6982 59.2732 64.7557C60.2823 64.8012 60.5564 64.3626 60.5446 63.4064C60.5091 60.8109 60.5304 58.2154 60.5682 55.6199C60.6107 52.6145 62.988 50.0238 65.9254 49.8297C66.7808 49.7746 67.0573 49.4702 67.1163 48.617C67.3314 45.5733 69.815 43.239 72.8232 43.2055C75.7369 43.1719 78.6506 43.1671 81.5643 43.1791C83.8211 43.1887 85.1066 44.502 85.135 46.8172C85.1704 49.6931 85.1704 52.5666 85.1988 55.4425C85.2035 55.9362 85.2767 56.4275 85.3193 56.9188C85.4682 57.0147 85.6147 57.1129 85.7635 57.2088C86.0755 56.7654 86.3614 56.3005 86.7041 55.8811C90.0738 51.7637 93.16 47.4499 95.4026 42.5824C96.9386 39.2463 98.1273 35.8 98.1414 32.0397C98.158 28.2339 97.4136 24.6079 95.8209 21.1568C93.8217 16.8237 90.8513 13.3654 86.8907 10.7699C83.9794 8.85982 80.7798 7.74301 77.3958 7.08394C72.7263 6.17084 68.2199 6.77239 63.8931 8.65611C60.4241 10.166 57.4726 12.4499 54.9015 15.2635C53.2544 17.0658 51.527 17.0298 49.8019 15.2755C49.5515 15.0215 49.3081 14.7626 49.0576 14.5086C44.4873 9.83045 39.0829 6.94015 32.4946 6.72685C26.6129 6.53512 21.2085 8.11209 16.4941 11.7333C10.4918 16.3444 7.23549 22.5228 6.60691 30.132C6.31152 33.7173 7.20005 37.0989 8.35087 40.423C9.30793 43.1887 9.35283 43.1719 12.2311 43.1743C19.9088 43.1815 27.5865 43.2366 35.2642 43.1671C37.2255 43.1504 38.4473 43.982 39.324 45.6356C39.6335 46.218 40.0494 46.7429 40.4843 47.3971C40.7229 47.052 40.9073 46.8483 41.0183 46.611C42.1762 44.133 43.3223 41.6525 44.4684 39.1696C46.0115 35.8216 47.557 32.4735 49.0883 29.1231C49.6791 27.8289 50.5038 26.8223 51.9925 26.6258C53.5829 26.4149 54.6534 27.2777 55.36 28.5623C56.3501 30.3645 57.2126 32.2362 58.1153 34.0864C59.3134 36.5429 60.4382 39.0378 61.7096 41.4536C62.6666 43.275 62.3476 45.3145 60.7573 46.2947C59.3323 47.1742 57.1866 46.635 56.2674 45.0029C55.0504 42.8388 53.9752 40.5908 52.8385 38.3787L52.8409 38.3691ZM78.5892 68.1924C78.5892 68.1924 78.6057 68.1924 78.6152 68.1924C78.6152 62.7234 78.6152 57.2543 78.6152 51.7877C78.6152 50.5015 77.9929 49.8536 76.7483 49.8441C74.7429 49.8265 73.7149 50.8378 73.6645 52.8782C73.6101 55.0567 72.2561 56.4323 70.1199 56.4778C69.4511 56.4922 68.78 56.5066 68.1136 56.485C67.4165 56.4635 67.1163 56.7702 67.1163 57.482C67.1211 64.5472 67.1187 71.6124 67.1069 78.6775C67.1069 79.3797 67.381 79.7081 68.0876 79.6889C68.8745 79.6697 69.6638 79.6673 70.4483 79.7009C72.1734 79.7752 73.5416 81.158 73.6267 82.9171C73.6669 83.7128 73.6574 84.5133 73.655 85.3113C73.6527 86.0087 73.9599 86.3227 74.6617 86.3083C75.6046 86.2867 76.5522 86.2963 77.4951 86.3323C78.2985 86.3634 78.6057 86.0279 78.601 85.1963C78.5774 79.5283 78.5892 73.8604 78.5892 68.1924ZM117.748 68.1133C117.762 68.1133 117.779 68.1133 117.793 68.1133C117.793 73.4242 117.793 78.7327 117.793 84.0435C117.793 86.4952 117.448 86.3251 119.967 86.3011C123.037 86.2724 122.68 86.7277 122.715 83.4683C122.741 81.0502 124.048 79.7225 126.425 79.6913C126.82 79.6865 127.212 79.6841 127.607 79.6745C128.692 79.6458 129.237 79.0874 129.24 77.9993C129.247 71.5716 129.242 65.1439 129.266 58.7163C129.273 56.4659 129.304 56.4659 127.033 56.4826C126.756 56.4826 126.482 56.4826 126.206 56.4778C124.131 56.4299 122.755 55.0543 122.699 52.9644C122.64 50.8538 121.561 49.8057 119.461 49.8201C117.807 49.8321 117.753 49.8752 117.75 51.5864C117.743 57.0962 117.75 62.6059 117.75 68.1133H117.748Z" fill="#FCB32E" />
            </svg>
          </div>
          <p className="tituloRegistroRuti m-auto">
            {rutina.id ? (<p className="tituloRegistroRuti mb-0 text-end">Editar <br/>Rutina</p>) : (<p className="tituloRegistroRuti mb-0 text-end">Crear <br/> Nueva Rutina</p>)}
          </p>
        </Box>
        <hr style={{ height: '10px', background: '#C0D437', borderColor: '#C0D437', borderRadius: '23px', opacity: '1' }} />
        <section>
          <div className="text-center intructor-alumno d-flex justify-content-between mt-4">
            <div>
              <h4>Instructor</h4>
              <p>{alumno?.nombre ?? 'Sin informacion'}</p>
            </div>
            <div>
              <h4>Alumno</h4>
              <p>{alumnoSeleccionado && `${alumnoSeleccionado.nombre}`}</p>
            </div>
          </div>
        </section>
        <Row className="form-registro-rutinas">
          {/*Este es el primer box que indica la fecha*/}
          <Col xs={12}>
            <ReactWeeklyDayPicker
              daysCount={6}  //How many days will be shown
              classNames={classNames1}  //Overrides classnames for custom classes (below example)
              startDay={getMondayOfCurrentWeek()} // First day as Date Object or 22 June 2016
              // selectedDays={} // Selected days list
              multipleDaySelect={true} //enables multiple day selection
              selectDay={(day) => {handleAddDias(day)}}
              unselectDay={function(day){ // called when a day is unselected
                // console.log('UNSELECT')
                // deleteDay(day)
              }}
              onPrevClick={function(startDay, selectedDays){}} // called with the new startDay
              onNextClick={function(startDay, selectedDays){}} // called with the new startDay
              unselectable={false} // if true allows to unselect a date once it has been selected. Only works when multipleDaySelect={false}
              format={'dddd'} //format of dates that handled in selectDay and unselectDay functions
              firstLineFormat={'dddd'} // format for the first line of the day button
              secondLineFormat={false} // format for the second line of the day button
              firstLineMobileFormat={'dddd'} // format for the first line of the day button mobile
              secondLineMobileFormat={'MMMM D, Y'} // format for the second line of the day button mobile
              unavailables={{
                // dates:['22 July 2017'],  //unavailable dates list
                // relative:[0,1],  //unavailable dates list relative to today (0:today, 1:tomorrow, -1:yesterday)
                weekly: [9] //unavailable dates list for each week (0:Sunday, 1:Monday ...)
              }}
              //mobilView={window.innerWidth < 400}  // enables mobil view
              beforeToday={true}   // all dates before today set as unavailable (default:true)
              hiddens={{  // makes dates invisible
                // dates: ['22 July 2017'], //absolute dates list
                // relative: [2], // relative to today (0:today, 1:tomorrow, -1:yesterday)
                weekly: [9]  //each week (0:Sunday, 1:Monday ...)
              }}
              todayText={''}  // replacing today text (default : - TODAY -)
              unavailableText={''}  // replacing unavailable text (default: unavailable )
              useArrows={false}  // use arrows for navigation (default: false)
              width={'auto'}
            />
          </Col>
          <Col xs={12} style={{ padding: 0 }}>
            <BoxEjerciciosForm></BoxEjerciciosForm>
          </Col>
          {/* <div className="col col-6">
            <p style={{ width: '25%', margin: '15px', borderRight: '2px solid #FFF', textAlign: 'center', marginTop: '15px', justifyContent: 'center' }}>
              {fechaDiaActual}
            </p>
            <p style={{ width: '75%', justifyContent:'center', marginTop:'15px' }}>
              {fechaMesActual.toUpperCase()}
            </p>
          </div> */}
          {/* drop down para las rutinas */}
          {/* <div className="col col-6" >
            <div>
              <FormControl
                className="w-100">
                <InputLabel>Rutina</InputLabel>
                <Select
                  name="rutina"
                  value={nomRutina}
                  label="Rutina"
                  onChange={(e) => setNomRutina(e.target.value)}
                >
                  <MenuItem value="Rutina 1">Rutina 1</MenuItem>
                  <MenuItem value="Rutina 2">Rutina 2</MenuItem>
                  <MenuItem value="Rutina 3">Rutina 3</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div> */}
          {/*Cardio inicial */}
          <Col xs={6} className="BoxRutina">
            <p>
              Cardio Inicial
            </p>
            <TextField
              type="number"
              required
              id="outlined-required"
              className="input-group-box-rutina"
              label="ej: 10 minutos"
              value={rutina.cardioInicia || cardioInicial}
              onChange={handleCardioInicialChange}
            />
          </Col>
          {/*Cardio Final */}
          <div className="col col-6 BoxRutina">
            <p>
              Cardio Final
            </p>
            <TextField
              type="number"
              required
              id="outlined-required"
              className="input-group-box-rutina"
              label="ej: 10 minutos"
              value={rutina.cardioFinal || cardioFinal}
              onChange={handleCardioFinalChange}
            />
          </div>
          {/*Calentamiento */}
          <Col xs={6} className="BoxRutina mt-3">
            <p>
              Calentamiento
            </p>
            <TextField
              type="text"
              required
              id="outlined-required"
              className="input-group-box-rutina"
              value={rutina.calentamiento || calentamiento}
              onChange={handleCalentamientoChange}
              label="descripcion del calentamiento"
            />
          </Col>
          {/*Vuelta A la calma */}
          <Col xs={6} className="BoxRutina mt-3">
            <p>
              Vuelta a la calma
            </p>
            <TextField
              type="text"
              required
              id="outlined-required"
              className="input-group-box-rutina"
              value={rutina.vueltaALaCalma || vueltaALaCalma}
              onChange={handleVueltaALaCalmaChange}
              label="descripción de vuelta a la calma"
            />
          </Col>
        </Row>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button autoFocus color="success" variant="contained">
              {rutina.id ? 'Guardar Cambios' : 'Crear Rutina'}
            </Button>
         </div>
      </div>
      {/* esto es lo que estaba antes */}
      {/* <Container style={{
        marginTop: '70px', background: 'white', overflowX: 'auto', padding: '10px', '@media (width: 400px)': {
          padding: '5px',
          overflowX: 'scroll',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
        },
      }}>
        <Box style={{ marginBottom:'95px'}}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ejercicios</TableCell>
                  <TableCell>Repeticiones</TableCell>
                  <TableCell>Kg</TableCell>
                  <TableCell>Series</TableCell>
                  <TableCell>Descanso</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Grid item xs={12}>
                  <Button variant="contained" color="success" startIcon={<PlusOneIcon />} onClick={() => generarEjercicios()}>Agregar Ejercicio</Button>
                </Grid>
                {selectedRutina.map((ejercicio) => (
                  <TableRow key={ejercicio}>
                    <TableCell>
                      <FormControl style={{ width: '100%', maxWidth: '200px' }}>
                        <InputLabel>Seleccione Ejercicio</InputLabel>
                        <Select
                          name="rutina"
                          type="text"
                          value={rutina.ejercicios[ejercicio]?.nombre || selectedExercises[ejercicio]}
                          onChange={(e) => handleExerciseChange(ejercicio, e.target.value)}
                          style={{ width: '100%' }}
                        >
                          {ejercicios.map((ejercicio) => (
                            <MenuItem key={ejercicio.id} value={ejercicio.nombre}>
                              {ejercicio.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="int"
                        label="repeticiones"
                        variant="outlined"
                        fullWidth
                        placeholder="Ejemplo: 20"
                        value={rutina.ejercicios[ejercicio]?.repeticiones || selectedRepeticion[ejercicio]}
                        onChange={(e) => handleRepeticionChange(ejercicio, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="float"
                        label="Kg"
                        variant="outlined"
                        fullWidth
                        placeholder="Ejemplo: 20"
                        value={rutina.ejercicios[ejercicio]?.kg || selectedKg[ejercicio]}
                        onChange={(e) => handleKgChange(ejercicio, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="int"
                        label="series"
                        variant="outlined"
                        fullWidth
                        placeholder="Ejemplo: 20"
                        value={rutina.ejercicios[ejercicio]?.series || selectedSerie[ejercicio]}
                        onChange={(e) => handleSerieChange(ejercicio, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="float"
                        label="Descanso"
                        variant="outlined"
                        fullWidth
                        placeholder="Ejemplo: 20"
                        value={rutina.ejercicios[ejercicio]?.descanso || selectedDescanso[ejercicio]}
                        onChange={(e) => handleDescansoChange(ejercicio, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" size="small" color="error" onClick={() => setSelectedRutina(selectedRutina.filter((e) => e !== ejercicio))}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button autoFocus color="success" variant="contained">
              {rutina.id ? 'Guardar Cambios' : 'Crear Rutina'}
            </Button>
          </div>
          <br />
        </Box>
      </Container> */}
    </>
  );
};

export default RegistroRutinas