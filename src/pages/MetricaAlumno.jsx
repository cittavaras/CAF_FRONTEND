import React from 'react';
import { useTable } from 'react-table';
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
} from 'recharts';


<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>



const Metrica = () => {
  const [metricas, setMetricas] = useState([]);
  useEffect(() => {

    MetricasAlumno();

  }, []);

  // useEffect(() => {
  //   console.log(metricas);
  // }, [metricas]);

  const MetricasAlumno = async () => {
    // const datosSesion = sessionStorage.getItem("alumno_sesion");
    const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
    const res = await axios.post(baseURL + '/metricas/alumno', { rut });
    console.log(res.data)
    const metricaAlumno = res.data;
    setMetricas(metricaAlumno);
  }

  const dataGrafico = [
    { name: 'Edad', uv: metricas?.edad ?? 0, pv: 2400, amt: 2400, },
    { name: 'Altura', uv: metricas?.altura ?? 0, pv: 1398, amt: 2210, },
    { name: 'Peso corporal', uv: metricas?.peso ?? 0, pv: 9800, amt: 2290, },
    { name: 'Porcentaje de grasa corporal', uv: metricas?.porcentajeGrasaCorporal ?? 0, pv: 3908, amt: 2000, },
    { name: 'Porcentaje de músculo', uv: metricas?.porcentajeGrasaMuscular ?? 0, pv: 4800, amt: 2181, },
    { name: 'Índice de masa corporal (IMC)', uv: metricas?.imc ?? 0, pv: 3800, amt: 2500, },
    { name: 'Grasa visceral', uv: metricas?.grasaVisceral ?? 0, pv: 4300, amt: 2100, },
  ];
/*
quiero hacer un boton que cambia los valores de la tabla de metricas al alumno, ordenando por fecha
*/

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
      if (metricas) {
        return [
          { metrica: 'Edad', valor: `${metricas?.edad ?? 'No registra métricas'}` },
          { metrica: 'Altura', valor: `${metricas?.altura ?? 'No registra métricas'}` },
          { metrica: 'Peso corporal', valor: `${metricas?.peso ?? 'No registra métricas'}` },
          { metrica: 'Porcentaje de grasa corporal', valor: `${metricas?.porcentajeGrasaCorporal ?? 'No registra métricas'}` },
          { metrica: 'Porcentaje de músculo', valor: `${metricas?.porcentajeGrasaMuscular ?? 'No registra métricas'}` },
          { metrica: 'Índice de masa corporal (IMC)', valor: `${metricas?.imc ?? 'No registra métricas'}` },
          { metrica: 'Grasa visceral', valor: `${metricas?.grasaVisceral ?? 'No registra métricas'}` }
        ];
      } else {
        return [];
      }
    },
    [metricas]
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
    const data = [
      { name: 'Edad', uv: metricas?.edad ?? 0 },
      { name: 'Altura', uv: metricas?.altura ?? 0 },
      { name: 'Peso corporal', uv: metricas?.peso ?? 0 },
      { name: 'Porcentaje de grasa corporal', uv: metricas?.porcentajeGrasaCorporal ?? 0 },
      { name: 'Porcentaje de músculo', uv: metricas?.porcentajeGrasaMuscular ?? 0 },
      { name: 'Índice de masa corporal (IMC)', uv: metricas?.imc ?? 0 },
      { name: 'Grasa visceral', uv: metricas?.grasaVisceral ?? 0 },
    ];
  
    const handleMetricChange = (metric) => {
      setSelectedMetric(metric);
    }
  
    const filteredData = data.filter(item => item.name === selectedMetric);
    
    return (
      <div>
        <h2>{selectedMetric}</h2>
        <button onClick={() => handleMetricChange('edad')}>Edad</button>
        <button onClick={() => handleMetricChange('altura')}>Altura</button>
        <button onClick={() => handleMetricChange('peso corporal')}>Peso corporal</button>
        <button onClick={() => handleMetricChange('porcentaje de grasa corporal')}>Porcentaje de grasa corporal</button>
        <button onClick={() => handleMetricChange('porcentaje de músculo')}>Porcentaje de músculo</button>
        <button onClick={() => handleMetricChange('índice de masa corporal (IMC)')}>Índice de masa corporal (IMC)</button>
        <button onClick={() => handleMetricChange('grasa visceral')}>Grasa visceral</button>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  

  return (
    <MetricaContainer>
      <BotonesPerfil />
      <MetricaTitle>Métricas de seguimiento del alumno</MetricaTitle>
      <MetricaTable {...getTableProps()}>
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
        {BarChartExample()}
    </MetricaContainer>

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
