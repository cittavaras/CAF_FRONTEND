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
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>


const LandingPageAlumno = ({ location }) => {
  const { alumno } = useAuth();

  const [infoCargada, setInfoCargada] = useState({titulo:"test",imagenBase64:"hola",descripcion:"test"});
 
  const getlandingPage = async () => {
    const resp = await axios.get(baseURL + '/landing-page/landing-page');
    setInfoCargada(resp.data);
    console.log(infoCargada)
  };

  useEffect(() => { 
    getlandingPage();
  },[]);
  
  useEffect(() => {     console.log(infoCargada);   },[infoCargada]);
  return (
    <>
      <div>
        <div className='mt-2 container py-4  text-center'>
          <H1 style={{ fontSize: '2.5rem' }}>Bienvenido</H1>
          <p style={{ fontSize: '1.3rem', color: 'white' }}>{alumno?.nombre ?? 'Sin informacion'}</p>
        </div>
        {
          infoCargada ? (<GimInforma titulo={infoCargada.titulo} imagen={infoCargada.imagenBase64} texto={infoCargada.descripcion}/>) : (<GimInforma titulo="No existe información" imagen="" texto=""/>)
        }
                                  
      </div>
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