import React from 'react';
import { useTable } from 'react-table';
import { Container, Box } from '@mui/system';
import axios from 'axios';
import { useState, useEffect } from 'react';
import baseURL from '../helpers/rutaBase';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment';
import 'moment/locale/es';
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
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

const Graficos = () => {
  const [metricas, setMetricas] = useState([]);

  useEffect(() => {
    getMetricas();
  }, []);

  const getMetricas = async () => {
    const { rut } = JSON.parse(sessionStorage.getItem('alumno_sesion'));
    const res = await axios.get(baseURL + '/metricas/', { params: { rut } });
    const metricaAlumno = res.data;
    setMetricas(metricaAlumno);
  };

  const isMobile = useMediaQuery('(max-width: 600px)');

  const BarChartExample = () => {
    const [selectedMetric, setSelectedMetric] = useState('peso');

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

    const handleMetricChange = (metric) => {
      setSelectedMetric(metric);
    };

    return (
      <div className='container'>
        <div style={{ marginLeft: '9%', color: 'white' }}>
          Seleccione una metrica para visualizar
        </div>
        <div style={{marginLeft: '9%'}}>
          <button
            className={`btn btn-dark ${isMobile ? 'col-12' : 'col-md-2'} me-2 my-1`}
            style={{ display: 'inline-flex', alignItems: 'center', marginTop: '100px' }}
            onClick={() => handleMetricChange('peso')}
          >
            Peso corporal
          </button><button
            className={`btn btn-dark ${isMobile ? 'col-12' : 'col-md-2'} me-2 my-1`}
            style={{ display: 'inline-flex', alignItems: 'center' }}
            onClick={() => handleMetricChange('porcentajeGrasaCorporal')}
          >
            Porcentaje Grasa Corporal
          </button>
          <button
            className={`btn btn-dark ${isMobile ? 'col-12' : 'col-md-2'} me-2 my-1`}
            style={{ display: 'inline-flex', alignItems: 'center' }}
            onClick={() => handleMetricChange('porcentajeGrasaMuscular')}
          >
            Porcentaje Grasa Muscular
          </button>
          <button
            className={`btn btn-dark ${isMobile ? 'col-12' : 'col-md-2'} me-2 my-1`}
            style={{ display: 'inline-flex', alignItems: 'center' }}
            onClick={() => handleMetricChange('imc')}
          >
            Índice de Masa Corporal (IMC)
          </button>
          <button
            className={`btn btn-dark ${isMobile ? 'col-12' : 'col-md-2'} me-2 my-1`}
            style={{ display: 'inline-flex', alignItems: 'center' }}
            onClick={() => handleMetricChange('grasaVisceral')}
          >
            Grasa Visceral
          </button>
        </div>
        <div>
          <div >
            <ResponsiveContainer width={isMobile ? '100%' : 500}>
              <CustomBox>
                <LineChart
                  width={500}
                  margin={{
                    left: -5,
                    top: 50,
                    bottom: 100,
                    right: 50
                  }} height={500}
                  data={personasSinUnidadDeMedida}>
                  <Line dataKey={selectedMetric} stroke="#C0D437" />
                  <CartesianGrid stroke="#C0D437" />
                  <XAxis
                    dataKey="name"
                    label={{
                      value: 'Fecha de registro',
                      position: 'insideBottom',
                    }}
                  />
                  <YAxis
                    angle={90}
                    label={{
                      value: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
                      angle: -90,
                    }}
                  />
                  <Tooltip
                    labelFormatter={(value) => `Fecha actual - ${moment(value.fecha).format('DD/MM/YYYY')}`}
                    formatter={(value, name, entry) => [`${value} - ${moment(entry.payload.fecha).format('DD/MM/YYYY')}`, selectedMetric]}
                  />
                </LineChart>
              </CustomBox>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <BarChartExample />
    </div>
  );

};
const CustomBox = styled(Box)`
  background-color: navy;
`;

export default Graficos;