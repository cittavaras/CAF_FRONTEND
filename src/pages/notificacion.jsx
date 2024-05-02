import React from 'react';
import styled from 'styled-components';
import check from './img/check.png';
import { useNavigate } from 'react-router-dom';
const Check = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${check});
  background-repeat: no-repeat;
  background-size: contain;
  filter: invert(1);

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Mensaje = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  font-family: 'Lato', sans-serif;
  color: #ffffff;
`;

const BotonExcelente = styled.button`
  background-color: #959CA1;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-family: 'Lato', sans-serif;

  &:hover {
    background-color: #2980b9;
  }
`;

const Notificacion = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <Container>
      <Check />
      <div style={{height: '20px'}}></div>
      <Mensaje>TU SOLICITUD HA SIDO ENVIADA Y ESTÁ SIENDO REVISADA POR EL ADMINISTRADOR</Mensaje>
      <BotonExcelente onclick={handleClick}>Ya puedes cerrar esta ventana</BotonExcelente>
    </Container>
  );
};


export default Notificacion;
