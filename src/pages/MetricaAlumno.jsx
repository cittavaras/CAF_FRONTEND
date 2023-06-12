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


<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>


const Metrica = () => {
  const { alumno } = useAuth();
  const [metricasRecientes, setMetricasRecientes] = useState([]);
  const [metricas, setMetricas] = useState([]);
  const [fecha, setFecha] = useState([]);

  useEffect(() => {
    MetricasRecientes();
  }, []);

  const MetricasRecientes = async () => {
    const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
    const res = await axios.post(baseURL + '/metricas/alumno', { rut });
    const metricaAlumno = res.data;
    setFecha(metricaAlumno.fecha);
    setMetricasRecientes(metricaAlumno);
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
        { metrica: 'Edad', valor: `${metricasRecientes?.edad ?? 'No registra métricas'}` },
        { metrica: 'Altura', valor: `${metricasRecientes?.altura ?? 'No registra métricas'}` },
        { metrica: 'Peso corporal', valor: `${metricasRecientes?.peso ?? 'No registra métricas'}` },
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
    setMetricasRecientes(metricasAlumno);
  };

  const ButtonDropdown = () => {
    return (
      <Box sx={{ minWidth: 120, width: '100%', margin:'auto', padding: '19px'}}>
        <FormControl fullWidth variant="filled" >
          <InputLabel style={{color:'White'}} id="demo-simple-select-label">
            Fecha
          </InputLabel>
          <Select
            style={{color:'White'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fecha}
            label="fecha"
            onChange={handleChange}
          >
            {metricas.map((metrica, i) => (
              <MenuItem value={metrica.fecha} key= {i}>
                {moment(metrica.fecha).format('DD/MM/YYYY')}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
    );
  };

  const MetricCard = ({ metrica, valor, gridArea, colSize = 4 }) => (
    <div
      className={`col-${colSize} my-2`}
      style={{
        gridArea,
        padding: '5px',
        margin: '0',
      }}
    >
      <div
        style={{
          gridArea,
          backgroundColor: 'rgba(192, 212, 55, 0.7)',
          border: '1px solid white',
          borderRadius: '19px',
          padding: '15px',
          margin: '0',
          height: '100%',
        }}
      >
        <Typography style={{ color: 'white' }} variant="subtitle1" component="div">{metrica}</Typography>
        <Typography style={{ color: 'white' }} variant="h6">{valor}</Typography>
      </div>
    </div>
  );

  const card = (
    <CardContent style={{padding: '0px!important'}}>
      <div className='row'>
        <MetricCard metrica={data[0]?.metrica} valor={data[0]?.valor} gridArea="edad" />
        <MetricCard metrica="IMC" valor={data[5]?.valor} gridArea="IMC" />
        <MetricCard metrica={data[6]?.metrica} valor={data[6]?.valor} gridArea="grasavisceral" />
      </div>
      <div className='row'>
        <MetricCard metrica={data[1]?.metrica} valor={data[1]?.valor} gridArea="altura" />
        <MetricCard colSize={8} metrica={data[3]?.metrica} valor={data[3]?.valor} gridArea="porcentajedecrasacorporal" />
      </div>
      <div className='row'>
        <MetricCard metrica={data[2]?.metrica} valor={data[2]?.valor} gridArea="pesocorporal" />
        <MetricCard colSize={8} metrica={data[4]?.metrica} valor={data[4]?.valor} gridArea="porcentajedemusculo" />
      </div>
    </CardContent>
  );

  const OutlineCard = () => {
    return (
      <Box sx={{ height: '500', width: '500' }}>
        {card}
      </Box>
    );
  }

  return (
<Container className="mt-4" style={{ background: 'rgba(0, 0, 0, 0.46)', borderRadius: '19px', width:'100%', marginBottom:'50px'}}>
      <Titulo>
        <Saludo>Hola {alumno?.nombre ?? 'Sin informacion'}</Saludo>
      </Titulo>
      <div className='w-100'>
        <ButtonDropdown/>
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
