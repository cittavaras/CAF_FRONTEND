import React from 'react';
import { Container, Box } from '@mui/system';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import baseURL from '../helpers/rutaBase';
import useAuth from '../auth/useAuth';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../pages/css/ScrollableContainer.css'; // Archivo CSS para los estilos personalizados
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment';
import 'moment/locale/es';
import CircularProgress from '@mui/material/CircularProgress';

const Metrica = () => {
  const { alumno } = useAuth();
  const [metricasRecientes, setMetricasRecientes] = useState([]);
  const [isFetchDone, setIsFetchDone] = useState(true);
  const [metricas, setMetricas] = useState([]);
  const [fecha, setFecha] = useState([]);

  useEffect(() => {
    MetricasRecientes()
  }, []);

  useEffect(() => {
    console.log(metricasRecientes);
  }, [metricasRecientes])

  function getNumericValue(valor) {
    let contenidoNumerico;
    let valorNumerico;
    if (valor) {
      contenidoNumerico = valor.match(/[\d.]+/); // Extraer los dígitos numéricos del valor utilizando una expresión regular
      if (contenidoNumerico) {
        valorNumerico = parseFloat(contenidoNumerico[0]); // Convertir el contenido numérico extraído en un valor numérico
        //const valorNumerico = parseFloat(contenidoNumerico[0].replace(/,/g, '')); 
        return valorNumerico;
      }
    } else {
      return valor;
    }
  }


  const MetricasRecientes = async () => {
    const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
    const res = await axios.post(baseURL + '/metricas/alumno', { rut });
    const metricaAlumno = res.data;
    const valor = data[0]?.valor; // Suponiendo que data es un arreglo de objetos y quieres acceder al primer elemento

    metricaAlumno.edad = getNumericValue(metricaAlumno.edad);
    metricaAlumno.grasaVisceral = getNumericValue(metricaAlumno.grasaVisceral);
    metricaAlumno.peso = getNumericValue(metricaAlumno.peso);
    metricaAlumno.altura = getNumericValue(metricaAlumno.altura);

    setFecha(metricaAlumno.fecha);
    setMetricasRecientes(metricaAlumno);  
    setIsFetchDone(false);
    await getMetricas();
  }

  const getMetricas = async () => {
    const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
    const res = await axios.get(baseURL + '/metricas/', { params: { rut } });

    const metricaAlumno = res.data;
    setMetricas(metricaAlumno);
  };

  const data = React.useMemo(() => {
    if (metricasRecientes) {
      return [
        { metrica: 'EDAD', valor: `${metricasRecientes?.edad ?? 'No registra métricas'}` },
        { metrica: 'ALTURA', valor: `${metricasRecientes?.altura ?? 'No registra métricas'}` },
        { metrica: 'PESO', valor: `${metricasRecientes?.peso ?? 'No registra métricas'}` },
        { metrica: 'Porcentaje de grasa corporal', valor: `${metricasRecientes?.porcentajeGrasaCorporal ?? 'No registra métricas'}` },
        { metrica: 'Porcentaje de músculo', valor: `${metricasRecientes?.porcentajeGrasaMuscular ?? 'No registra métricas'}` },
        { metrica: 'Índice de masa corporal (IMC)', valor: `${metricasRecientes?.imc ?? 'No registra métricas'}` },
        { metrica: 'Grasa visceral', valor: `${metricasRecientes?.grasaVisceral ?? 'No registra métricas'}` }
      ];
    } else {
      return [];
    }
  },
    [metricasRecientes],
  );

  const handleChange = async (event) => {
    const selectedFecha = event.target.value;
    setFecha(selectedFecha);

    const metricasAlumno = metricas.find((metrica) => metrica.fecha === selectedFecha);

    metricasAlumno.edad = getNumericValue(metricasAlumno.edad);
    metricasAlumno.grasaVisceral = getNumericValue(metricasAlumno.grasaVisceral);
    metricasAlumno.peso = getNumericValue(metricasAlumno.peso);
    metricasAlumno.altura = getNumericValue(metricasAlumno.altura);
    setMetricasRecientes(metricasAlumno);

  };

  const ButtonDropdown = () => {
    return (
      <Box sx={{ minWidth: 120, width: '100%', margin: 'auto', padding: '19px' }}>
        <FormControl fullWidth variant="filled" >
          <InputLabel style={{ color: 'White', background:'' }} id="demo-simple-select-label">
            Fecha
          </InputLabel>
          <Select
            style={{ color: 'White' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fecha}
            label="fecha"
            onChange={handleChange}
          >
            {metricas.map((metrica, i) => (
              <MenuItem value={metrica.fecha} key={i}>
                {moment(metrica.fecha).format('DD/MM/YYYY')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const MetricCard = ({ metrica, valor, gridArea, colSize = 4 , medida}) => (
    <div
      className={`col-${colSize} my-2`}
      style={{
        gridArea,
        margin: '0',
      }}
    >
      <div class="caf_green_bg"
        style={{
          gridArea,
          border: '2px solid #C0D437',
          borderRadius: '19px',
          padding: '10px',
          margin: '0',
          height: '100%',
        }}
      >
        <Typography style={{ color: 'white', textAlign: 'left', fontSize: '.8rem', fontWeight: '400' }} variant="subtitle1" component="div">{metrica}</Typography>
        <Typography style={{ color: 'white', textAlign: 'left', fontSize: '1.8rem', fontWeight: '400' }} variant="h6">{valor} {' '}<span style={{ fontSize: '1.2rem', fontWeight:'300'}}>{medida}</span></Typography>
      </div>
    </div>
  );

  const card = (
    <CardContent className="row card-metrics-content">
      <MetricCard colSize={4} metrica={data[0]?.metrica} valor={data[0]?.valor} medida={'años'} gridArea="edad" />
      <MetricCard colSize={4} metrica="IMC" valor={data[5]?.valor} gridArea="IMC" />
      <MetricCard colSize={4} metrica={data[6]?.metrica} valor={data[6]?.valor} medida={'cm'} gridArea="grasavisceral" />
      <MetricCard colSize={4} metrica={data[1]?.metrica} valor={data[1]?.valor} medida={'mts'} gridArea="altura" />
      <MetricCard colSize={8} metrica={data[3]?.metrica} valor={data[3]?.valor} gridArea="porcentajedecrasacorporal" />
      <MetricCard colSize={4} metrica={data[2]?.metrica} valor={data[2]?.valor} medida={'kg'} gridArea="pesocorporal" />
      <MetricCard colSize={8} metrica={data[4]?.metrica} valor={data[4]?.valor} gridArea="porcentajedemusculo" />
    </CardContent>
  );

  const OutlineCard = () => {
    return (
      <Box sx={{ height: '500', width: '500' }}>
        { isFetchDone ? <CircularProgress /> : card }
      </Box>
    );
  }

  return (
    <Container className="mt-4" style={{ background: 'rgba(0, 0, 0, 0.46)', borderRadius: '19px', width: '100%', marginBottom: '50px'}}>
      <Titulo>
        <Saludo>Hola {alumno?.nombre ?? 'Sin informacion'}</Saludo>
      </Titulo>
      <div className='w-100'>
      <Typography sx={{justifyContent:'center', color:'white'}}>Seleccione una fecha</Typography>
        <ButtonDropdown />
        <Contenedor >
          <OutlineCard />
        </Contenedor>
      </div>
      {/*
      <ScrollableContainer/>
      <Texto>
      Tienes entrenamiento esta semana
      </Texto>
      <Texto2>
      presiona para saber el contenido
  </Texto2>*/}
    </Container>
  );
};

const Titulo = styled.div`
  font-size: 35px;
  color: #ffffff;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  minHeight: '100vh';
`;

const Saludo = styled.div`
  font-size: 30px;
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
  text-align: center;
`;

const Contenedor = styled.div`
  borderRadius: 19px;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
`;

const Texto = styled.div`
  font-size: 15px;
  color: #ffffff;
  text-align: center;
`;
const Texto2 = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.69);
  text-align: center;
  margin-bottom: 500px;
`;

export default Metrica;
