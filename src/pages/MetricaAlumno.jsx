import React from 'react';
import { useTable } from 'react-table';
import { Container, Box } from '@mui/system';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BotonesPerfil from '../components/BotonesPerfil';
import baseURL from '../helpers/rutaBase';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';


<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>



const Metrica = () => {
  const [metricasRecientes, setMetricasRecientes] = useState([]);
  const [metricas, setMetricas] = useState([]);
  useEffect(() => {

    MetricasRecientes();
    Metricas();

  }, []);

  // useEffect(() => {
  //   console.log(metricas);
  // }, [metricas]);

  const MetricasRecientes = async () => {
    // const datosSesion = sessionStorage.getItem("alumno_sesion");
    const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
    const res = await axios.post(baseURL + '/metricas/alumno', { rut });
    const metricaAlumno = res.data;
    setMetricasRecientes(metricaAlumno);
  }

  const Metricas = async () => {
    const  { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
    const res = await axios.get(baseURL + '/metricas/', { params: { rut } });
    console.log(rut);
    console.log(res);
    console.log("Todas las metricas",res.data)
    const metricaAlumno = res.data;
    setMetricas(metricaAlumno);
  }

  const datas = [
    { name: 'Byron', edad: 24, altura: 1.80 },
    { name: 'Javier', edad: 23, altura: 1.70 },
    { name: 'Cristian', edad: 22, altura: 1.60 },
    { name: 'Jorge', edad: 21, altura: 1.50 },
    { name: 'Javiera', edad: 20, altura: 1.40 },
  ]
  const dataGrafico = [
    { name: 'Edad', uv: metricas?.edad ?? 0, pv: 2400, amt: 2400, },
    { name: 'Altura', uv: metricas?.altura ?? 0, pv: 1398, amt: 2210, },
    { name: 'Peso corporal', uv: metricas?.peso ?? 0, pv: 9800, amt: 2290, },
    { name: 'Porcentaje de grasa corporal', uv: metricas?.porcentajeGrasaCorporal ?? 0, pv: 3908, amt: 2000, },
    { name: 'Porcentaje de músculo', uv: metricas?.porcentajeGrasaMuscular ?? 0, pv: 4800, amt: 2181, },

    { name: 'Índice de masa corporal (IMC)', uv: metricas?.imc ?? 0, pv: 3800, amt: 2500, },
    { name: 'Grasa visceral', uv: metricas?.grasaVisceral ?? 0, pv: 4300, amt: 2100, },
  ];

  const getMetricasByFecha = async (fecha) => {
    const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
    const res = await axios.post(baseURL + '/metricas/alumno', { rut });
    const metrics = res.json();
    const metricasByFecha = metrics.filter(metrica => metrica.fecha === fecha);
    setMetricas(metricasByFecha);
  };

  // Datos de ejemplo
  const data = React.useMemo(
    () => {
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
    [metricasRecientes]
  );

  const columns = React.useMemo(
    () => [{ Header: 'Métricas de seguimiento del alumno', accessor: 'metrica' },
    { 
      Header: 'Valor',
      accessor: 'valor', 
    },
    {
      header: 'ver metricas', accessor: 'fecha',
      Cell: ({ row }) => (
        <button onClick={() => handleVerMetricas(row.original.fecha)}>
          Ver
        </button>
        ),
      },
    ],
    [],
  );

  const tableInstance = useTable({
    columns,
    data
  });
  // 
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;


  const BarChartExample = () => {
    const [selectedMetric, setSelectedMetric] = useState('edad');

    const obtenerPropiedad = (arregloObjetos, nombrePropiedad) => {
      let arregloPropiedades = [];

      for (let i = 0; i < arregloObjetos.length; i++) {
        arregloPropiedades.push(arregloObjetos[i][nombrePropiedad]);
      }

      return arregloPropiedades;
    }

    const personasSinUnidadDeMedida = metricas.map(metrica => {
      const nuevaMetrica = { ...metrica };
      nuevaMetrica.edad = parseInt(nuevaMetrica.edad);
      nuevaMetrica.altura = parseFloat(nuevaMetrica.altura);
      nuevaMetrica.peso = parseFloat(nuevaMetrica.peso);
      nuevaMetrica.imc = parseFloat(nuevaMetrica.imc);
      nuevaMetrica.porcentajeGrasaCorporal = parseInt(nuevaMetrica.porcentajeGrasaCorporal);
      nuevaMetrica.grasaVisceral = parseFloat(nuevaMetrica.grasaVisceral);
      nuevaMetrica.porcentajeGrasaMuscular = parseInt(nuevaMetrica.porcentajeGrasaMuscular);
      return nuevaMetrica;
    });



    // const data = [
    //   { name: 'edad', uv: metricas?.edad ?? 0 },
    //   { name: 'edad', uv: metricas?.edad ?? 5 },
    //   { name: 'altura', uv: metricas?.altura ?? 0 },
    //   { name: 'peso corporal', uv: metricas?.peso ?? 0 },
    //   { name: 'porcentaje de grasa corporal', uv: metricas?.porcentajeGrasaCorporal ?? 0 },
    //   { name: 'porcentaje de músculo', uv: metricas?.porcentajeGrasaMuscular ?? 0 },
    //   { name: 'imc', uv: metricas?.imc ?? 0 },
    //   { name: 'grasa visceral', uv: metricas?.grasaVisceral ?? 0 },
    // ];

    const handleMetricChange = (metric) => {
      setSelectedMetric(metric);
    }
  
    const filteredData = data.filter(item => item.name === selectedMetric);
  
    return (
      <div className='container-sm row'  >
        <h2 className='text-white'>{selectedMetric}</h2>
        <button className='btn btn-dark col-md-2 me-2 my-1' onClick={() => handleMetricChange('edad')}>Edad</button>
        <button className='btn btn-dark col-md-2 me-2 my-1' onClick={() => handleMetricChange('altura')}>Altura</button>
        <button className='btn btn-dark col-md-2 me-2 my-1' onClick={() => handleMetricChange('peso')}>Peso corporal</button>
        <button className='btn btn-dark col-md-2 me-2 my-1' onClick={() => handleMetricChange('porcentajeGrasaCorporal')}>Porcentaje de grasa corporal</button>
        <button className='btn btn-dark col-md-2 me-2 my-1' onClick={() => handleMetricChange('porcentajeGrasaMuscular')}>Porcentaje de músculo</button>
        <button className='btn btn-dark col-md-2 me-2 my-1' onClick={() => handleMetricChange('imc')}>Índice de masa corporal (IMC)</button>
        <button className='btn btn-dark col-md-2 me-2 my-1' onClick={() => handleMetricChange('grasaVisceral')}>Grasa visceral</button>
        <ResponsiveContainer width="100%" height={650}>
          <Box sx={{ bgcolor: '#fff' }} >

            <LineChart width={500} className='mx-auto my-auto' height={600} data={personasSinUnidadDeMedida}>
              <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </Box>
        </ResponsiveContainer>
      </div>
    );
  };



  return (
    <Container maxWidth="sm">
      <MetricaContainer>
        <BotonesPerfil />
        <MetricaTitle>Métricas de seguimiento del alumno</MetricaTitle>
        <MetricaTable className='container-sm' {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <MetricaRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <MetricaHeader {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </MetricaHeader>
                ))}
              </MetricaRow>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <MetricaRow {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <MetricaCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </MetricaCell>
                    );
                  })}
                </MetricaRow>
              );
            })}
          </tbody>
        </MetricaTable>
      </MetricaContainer>
      {BarChartExample()}
    </Container>
  );
};

const MetricaContainer = styled.div`
  margin-top: 70px; 
  font-family: 'lato, sans-serif';
  color: white;
  top: 100px;
  justify-content: center;
  align-items: center;
`;

const MetricaTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MetricaTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  justify-content: center;
  align-items: center;
  background-position: center;
`;

const MetricaRow = styled.tr`
  &:nth-child(even) {
    background-color: #333333;
  }
`;

const MetricaHeader = styled.th`
  text-align: left;
  padding: 8px;
  border: 1px solid #fff;
`;

const MetricaCell = styled.td`
  text-align: left;
  padding: 8px;
  border: 1px solid #fff;
`;

export default Metrica;
