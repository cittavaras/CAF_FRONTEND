import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../pages/css/style.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import baseURL from '../helpers/rutaBase';

const Configuracion = () => {

  const navigate = useNavigate();

  const { alumno } = useAuth();

  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [rut, setRut] = useState('');
  const [correo, setCorreo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [jornada, setJornada] = useState('');
  const [active, setActive] = useState('true');
  const [tipoUsuario, setTipoUsuario] = useState(alumno.tipoUsuario);

  const onChangeAlumno = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'contraseña':
        setContraseña(value);
        break;
      case 'confirmarContraseña':
        setConfirmarContraseña(value);
        break;
      case 'carrera':
        setCarrera(value);
        break;
      case 'jornada':
        setJornada(value);
        break;
      default:
        break;
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !carrera || !jornada || !contraseña || !confirmarContraseña) {
      alert('Todos los campos son obligatorios');
      return;
    } else {
      const newAlumno = {
        nombre,
        password: contraseña,
        carrera,
        jornada,
        active,
        tipoUsuario,
      };

      if (contraseña !== confirmarContraseña) {
        alert('Las contraseñas no coinciden');
        return;
      }

      await axios.put(`${baseURL}/alumnos/rut/${alumno.rut}`, newAlumno);
      alert('Alumno actualizado')
      navigate('/landing')
    }
  };

  return (
    <OuterContainer>

      <Container>
        <Login className='login'>
          <form className="form-horizontal" >
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>
            <H1>Actualizar Datos de</H1>
            <div className="form-group">
              <H2>Rut: {alumno?.rut ?? 'Sin informacion'}</H2>
              <H2>Correo: {alumno?.correo ?? 'Sin informacion'}</H2>
            </div>
            <div className="form-group">
              <InputN type="text" placeholder="Actualizar Nombre:" name="nombre" onChange={onChangeAlumno} />
            </div>
            <div className="form-group">
              <InputN type="password" placeholder="Actualizar Contraseña:" name="contraseña" onChange={onChangeAlumno} />
            </div>
            <div className="form-group">
              <InputN type="password" placeholder="Confirmar Contraseña:" name="confirmarContraseña" onChange={onChangeAlumno} />
            </div>
            <div className="form-group">
              <Select className="form-control" name="carrera" onChange={onChangeAlumno}>
                <option selected disabled={true}> ---Seleccione Su carrera---</option>
                <option value="Auditoría">Auditoría</option>
                <option value="Ecoturismo">Ecoturismo</option>
                <option value="Gastronomía internacional">Gastronomía internacional</option>
                <option value="Ingeniería en administración">Ingeniería en administración</option>
                <option value="Ingeniería en infraestructura">Ingeniería en infraestructura</option>
                <option value="Ingeniería en informatica">Ingeniería en informatica</option>
                <option value="Ingeniería en administración de recursos humanos">Ingeniería en administración de recursos humanos</option>
                <option value="Ingeniería en marketing">Ingeniería en marketing</option>
                <option value="Ingeniería en comercio exterior">Ingeniería en comercio exterior</option>
                <option value="Ingeniería en conectividad y redes">Ingeniería en conectividad y redes</option>
                <option value="Ingeniería en gestión de tecno">Ingeniería en gestión de tecno</option>
                <option value="Ingeniería en gestión logística">Ingeniería en gestión logística</option>
                <option value="Tourism & hospitality">Tourism & hospitality</option>
                <option value="Turismo y hotelería">Turismo y hotelería</option>
                <option value="Técnico administración de empresas m/marketing">Técnico administración de empresas m/marketing</option>
                <option value="Técnico admin. de infraest. y plat. tecnológicas">Técnico admin. de infraest. y plat. tecnológicas</option>
                <option value="Técnico administración de redes computacionales">Técnico administración de redes computacionales</option>
                <option value="Técnico administración de recursos humanos">Técnico administración de recursos humanos</option>
                <option value="Técnico analista programador computacional">Técnico analista programador computacional</option>
                <option value="Técnico comercio exterior">Técnico comercio exterior</option>
                <option value="Técnico contabilidad general mención legislación tributaria">Técnico contabilidad general mención legislación tributaria</option>
                <option value="técnico en administración">técnico en administración</option>
                <option value="Técnico administración financiera">Técnico administración financiera</option>
                <option value="Técnico administración de empresas m/logística">Técnico administración de empresas m/logística</option>
                <option value="Técnico en turismo y hotelería">Técnico en turismo y hotelería</option>
                <option value="Tourism & hospitality technician">Tourism & hospitality technician</option>
                <option value="Técnico turismo de aventura">Técnico turismo de aventura</option>
                <option value="Técnico turismo técnico en empresas turísticas">Técnico turismo técnico en empresas turísticas</option>
              </Select>
            </div>
            <div className="form-group">
              <SelectJ className="form-control" name="jornada" onChange={onChangeAlumno}>
                <option selected disabled={true}>JORNADA</option>
                <option value="diurno">Diurno</option>
                <option value="vespertino">Vespertino</option>
              </SelectJ>
            </div>
            <Button className="button" onClick={onSubmit}>
              ACTUALIZAR DATOS
            </Button>
          </form>
        </Login>
      </Container>
      <div className="vector1right" />
    </OuterContainer>
  )
}


const OuterContainer = styled.div`
  display: flex;
/*   justify-content: center; */
/*   align-items: center; */
/*   height: 100vh; */
/*   border-style: solid;
  border-width: 2px; */
`;

/* const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: bottom;
  align-items: center;
  align-items: left;
`; */

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

const Login = styled.div`
margin-top: 100px;
display: flex;
justify-content: center;
align-items: center;
`;

const H1 = styled.h1`
font-family: 'lato', sans-serif;
font-size: bold;
font-family: 'lato', sans-serif;
font-size: 40px;
color: #FFFFFF;
@media only screen and (max-width: 768px) {
  font-size: 30px;
}
`;

const H2 = styled.h2`
font-family: 'lato', sans-serif;
font-size: bold;
font-family: 'lato', sans-serif;
font-size: 30px;
color: #FFFFFF;
@media only screen and (max-width: 768px) {
  font-size: 30px;
}
`;

const InputN = styled.input`
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 1;
  margin-bottom: 20px;
  border-radius: 10px;
  font-family: 'lato', sans-serif;
  color: #000000;
  
  &:focus {
    &::placeholder {
      transform: translateY(-15px);
      font-size: 12px;
      color: #000000;
    }
  }

  &::placeholder {
    transition: all 0.3s ease-in-out;
  }
`;

const InputR = styled.input`
  width: 48%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  border-radius: 10px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  width: 100%;
  margin-right: 0;
  font-size: 14px;

    &:focus {
    &::placeholder {
      transform: translateY(-15px);
      font-size: 12px;
      color: #000000;
    }
  }

  &::placeholder {
    transition: all 0.3s ease-in-out;
  }
`;

const InputCorreo = styled.input`
  width: 48%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  margin-left: 4%;
  margin-bottom: 20px;
  border-radius: 10px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  width: 100%;
  margin-left: 0;
  font-size: 14px;

    &:focus {
    &::placeholder {
      transform: translateY(-15px);
      font-size: 12px;
      color: #000000;
    }
  }

  &::placeholder {
    transition: all 0.3s ease-in-out;
  }
`;

const Select = styled.select`
width: 100%;
padding: 10px;
background: rgba(255, 255, 255, 0.7);
margin-bottom: 20px;
border-radius: 10px;
font-family: 'Lato', sans-serif;
font-size: 16px;

font-size: 14px;

`;

const SelectJ = styled.select`
width: 100%;
padding: 10px;
background: rgba(255, 255, 255, 0.7);
margin-bottom: 20px;
border-radius: 10px;
font-family: 'Lato', sans-serif;
font-size: 16px;
 
font-size: 14px;

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

export default Configuracion;