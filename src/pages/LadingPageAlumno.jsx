import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './css/landing.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReservarSesion from '../components/ReservarSesion';
import useAuth from '../auth/useAuth';
import roles from "../helpers/roles";

<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>


const LandingPageAlumno = ({ location }) => {
  const { alumno } = useAuth();
  return (

    <>
      <Div>
        <div className='mt-5 container py-5  text-center'>
          <H1>Bienvenido  <br /> {alumno?.nombre ?? 'Sin informacion'}</H1>
        </div>                           
      </Div>

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