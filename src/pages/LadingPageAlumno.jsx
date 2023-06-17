import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './css/landing.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Informativo from '../components/Informativo';
import useAuth from '../auth/useAuth';
import roles from "../helpers/roles";
import GimInforma from '../components/GimInforma';

<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>


const LandingPageAlumno = ({ location }) => {
  const { alumno } = useAuth();

  const [titulo, setTitulo] = useState("CAF IVARAS")
  const [imagen, setImagen] = useState("https://e1.pxfuel.com/desktop-wallpaper/554/24/desktop-wallpaper-best-4-fitness-on-hip-gym-boy.jpg")
  const [texto, setTexto] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
  
  return (
    <>
      <div>
        <div className='mt-2 container py-4  text-center'>
          <H1>Bienvenido  <br style={{color:"black"}} /> {alumno?.nombre ?? 'Sin informacion'}</H1>
        </div>
        <GimInforma titulo={titulo} imagen={imagen} texto={texto}/>                          
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