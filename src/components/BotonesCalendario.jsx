import React from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar'; // Importa el componente Avatar de Material-UI
import { Typography } from '@mui/material'; // Importa el componente Typography de Material-UI



const BotonesCalendario = ({ dayNumber, dayNombre, onClick }) => {
  // const classes = StyledButton(); // Obtiene las clases de estilos

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      alignSelf: 'center',
    }}  onClick={onClick}> {/* Contenedor del avatar con el estilo avatar y el evento onClick */}
    
      <Avatar style={{alignItems:'center',
      alignItems: 'center',
      height:'80px',
      border: `2px solid white`,
      backgroundColor: 'rgba(0, 0, 0, 0.46)',
      width:'80px'}}>{`${dayNumber}\n${dayNombre}`}</Avatar> {/* Avatar con las iniciales del nombre y apellido */}
      
    </div>
  );
};

export default BotonesCalendario;
