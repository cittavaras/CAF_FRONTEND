import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BotonesPerfil from '../components/BotonesPerfil';
import { LineChart, Line, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

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
    const res = await axios.post('https://caf.ivaras.cl/api/metricas/alumno', { rut });
    console.log(res.data)
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
    { Header: 'Valor', accessor: 'valor' }],
    []
  );

  const tableInstance = useTable({
    columns,
    data
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

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
      <ResponsiveContainer width={600} height={300}>

        <BarChart
          dataGrafico={datas}
          width={500}
          height={300}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="edad" fill='#6b48ff' />
          <Bar dataKey="altura" fill='#1ee3cf' />
        </BarChart>
      </ResponsiveContainer>
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
