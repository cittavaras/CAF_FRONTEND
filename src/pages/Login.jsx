import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../auth/useAuth';

<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [alumno, setAlumno] = useState('');
  const [contraseña, setContraseña] = useState('');

  const onChangeCorreo = (e) => {
    setAlumno(e.target.value);
  }

  const onChangeConstraseña = (e) => {
    setContraseña(e.target.value);
  }

  const validarCorreoElectronico = (correo) => {
    const expresionRegular = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|duoc\.profesor\.cl)$/;
    return expresionRegular.test(correo);
  }

  const validacion = async (e) => {
    e.preventDefault();

    if (!alumno || !contraseña) {  
      alert('Debe ingresar todos los campos');
      return;
    }
    else if (validarCorreoElectronico(alumno)  !== true) {
      alert('El correo debe ser de duoc');
      return;
    }
    else {
      const res = await axios.post(`https://caf.ivaras.cl/api/alumnos/login`, {correo: alumno, password: contraseña});
      console.log(res);
      try {
        const usuario = res?.data?.respAlumno
        if (!!usuario) {
          login(usuario);
          console.log('usuario', usuario);
          if (usuario.tipoUsuario === 'Admin') {
            alert('Bienvenido administrador');
            navigate('/admin');
          }
          else if (usuario.tipoUsuario === 'Alumno') {
            alert('Bienvenido alumno');
            navigate('/landing');
          }
          else {

            alert('Bienvenido Instructor');
          }
        }
        else {
          alert('El usuario o contraseña es incorrecto')
        }
      }
      catch (error) {
        console.log(error);
        alert('Ocurrió un error al iniciar sesión')
      }
      ;
    }
  }

  return (
    
    <OuterContainer>
      <div className="vector-1" />
      <div className="vector-2" />
      <div className="vector-6" />
      <Container>
        <Wrapper>
          <Login0 className='login0'>
            <Form className='form-horizontal  d-flex  flex-column '>
              <Title>INICIAR SESIÓN</Title>
              {/* <Input type="text" placeholder="CORREO DUOC:" value={alumno} onChange={onChangeCorreo} /> */}
              <InputCorreo type="mail" placeholder="CORREO DUOC:" name="correo" value={alumno} onChange={onChangeCorreo} />
              {/* <Input type="password" placeholder="CONTRASEÑA:" value={contraseña} onChange={onChangeConstraseña} /> */}
              <InputPass type="password" placeholder="CONTRASEÑA" name="contraseña" value={contraseña} onChange={onChangeConstraseña} />
              <Button onClick={validacion}>INICIAR SESIÓN</Button>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link to="/registro" style={{ borderBottom: '1px solid #FFF', color: '#FFF', textDecoration: 'none' }}>¿No tienes cuenta? Puedes crearte una aquí</Link></div>
            </Form>
          </Login0>  
        </Wrapper>
      </Container>    
    </ OuterContainer>
  );
}


const Login0 = styled.div`
margin-top: 50px;
display: flex;
justify-content: center;
align-items: center;
`;

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;


`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding: 20px;
  border-radius: 5px;
  opacity: 0.9;
  /* padding-right: 100px; */
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px  #ccc;
  padding: 30px;
  border-radius: 5px;
/*   background-color: #fff; */
  opacity: 0.9;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #FFFFFF;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
`;

const Button = styled.button`
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

const InputCorreo = styled.input`
  width: 48%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  margin-left: 4%;
  margin-bottom: 20px;
  border-radius: 17px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  width: 100%;
  margin-left: 0;
  font-size: 14px;
  font-weight: bold;

    &:focus {
    &::placeholder {
      transform: translateY(-14px);
      font-size: 14px;
      color: #302f2f;
    }
  }

  &::placeholder {
    transition: all 0.3s ease-in-out;
  }
`;

const InputPass = styled.input`
  width: 48%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  margin-left: 4%;
  margin-bottom: 20px;
  border-radius: 17px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  width: 100%;
  margin-left: 0;
  font-size: 14px;
  font-weight: bold; 

  &:focus {
    &::placeholder {
      transform: translateY(-14px);
      font-size: 14px;
      color: #000000;
    }
  }


  &::placeholder {
    transition: all 0.3s ease-in-out;
  }
`;

export default Login;
