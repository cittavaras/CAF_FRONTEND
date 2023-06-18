import React from 'react';
import styled from "styled-components"; 
import { useNavigate } from 'react-router-dom';


const AgendaReserva = () => {

  const navigate = useNavigate();

  const handleContinuarClick = () => {
    //Aquí podrías agregar la función que quieras ejecutar al hacer clic en "Continuar"
    navigate('/landing');
  };

  return (
    <OuterContainer>
       <div className="vector-3" />
        <div className="vector-1" />
      <Container>
        <Title>AGENDA TUS RESERVAS</Title>
        <LimitationsContainer>
          <Subtitle>LIMITACIONES</Subtitle>
        </LimitationsContainer>
          <LimitationBox>
            <Limitation>Máximo tres módulos por reserva (40 min. cada módulo).</Limitation>
          </LimitationBox>
          <LimitationBox>
            <Limitation>Puedes tener una reserva por día y tres a la semana.</Limitation>
          </LimitationBox>
          <LimitationBox>
            <Limitation>De 16:41 a 18:10 el gimnasio está cerrado por limpieza.</Limitation>
          </LimitationBox>
        <Button className="button" onClick={handleContinuarClick}>Continuar</Button>
      </Container>
    </OuterContainer>
  )
};

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  box-shadow: 0px 4px 8px rgba(24, 24, 24, 0.15);
  padding: 30px;
  border-radius: 5px;
  opacity: 0.9;
  padding-right: 100px;
`;

const Title = styled.h1`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
`;

const LimitationsContainer = styled.div`
  background-color: #C0D437;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 10px;
  font-family: 'Lato', sans-serif;
  color: #FFFFFF;
  font-weight: bold;
`;

const LimitationBox = styled.div`
  background-color: #327e4b;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  opacity: 0.9;
`;

const Limitation = styled.p`
  margin-bottom: 0;
  font-family: 'Lato', sans-serif;
  color: #FFFFFF;
  font-weight: normal;
  font-size: 13px;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #959CA1;
  color: #fff;
  border: none;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-family: 'Lato', sans-serif;
  width: 100px;

  &:hover {
    background-color: #2980b9;
  }
`;

export default AgendaReserva;
