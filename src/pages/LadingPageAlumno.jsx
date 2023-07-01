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

  const [titulo, setTitulo] = useState("CAF")
  const [imagen, setImagen] = useState("https://e1.pxfuel.com/desktop-wallpaper/554/24/desktop-wallpaper-best-4-fitness-on-hip-gym-boy.jpg")
  const [texto, setTexto] = useState("Bienvenido a CAF, tu destino para un estilo de vida saludable y enérgico! En nuestro centro, encontrarás un ambiente dinámico y motivador diseñado para ayudarte a alcanzar tus objetivos de fitness. Contamos con instalaciones de última generación y una amplia variedad de clases y programas que te permitirán fortalecer tu cuerpo y mente. En CAF, nos comprometemos a brindarte un ambiente acogedor y amigable, donde te sentirás cómodo mientras trabajas en tu salud y bienestar. Nuestro enfoque está en proporcionarte el apoyo necesario para que logres tus metas. Estaremos disponibles para responder a tus preguntas y brindarte asistencia durante tu experiencia en nuestro centro. Únete a nuestra comunidad activa y descubre la verdadera pasión por el bienestar en CAF. ¡Es hora de poner en marcha tu mejor versión!")
  
  return (
    <>
      <div>
        <div className='mt-2 container py-4  text-center'>
          <H1 style={{ fontSize: '2.5rem' }}>Bienvenido</H1>
          <p style={{ fontSize: '1.3rem', color: 'white' }}>{alumno?.nombre ?? 'Sin informacion'}</p>
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