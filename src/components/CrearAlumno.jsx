import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import '../pages/css/style.css';
import { useNavigate } from 'react-router-dom';
import baseURL from '../helpers/rutaBase';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Swal from 'sweetalert2'




const CrearAlumno = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    if (!nombre || !rut || !correo || !carrera || !jornada) {
      Swal.fire({
        icon: 'info', text: 'Todos los campos son obligatorios',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      return;
    } else if (!validarCorreoElectronico(correo)) {
      Swal.fire({
        icon: 'info', text: 'El correo debe ser de duoc',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      return;
    }
    else {
      setOpen(true);
    };

  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [correo, setCorreo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [jornada, setJornada] = useState('');
  const [active, setActive] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('Alumno');

  useEffect(() => {
    const getAlumnos = async () => {
      const res = await axios.get(baseURL + '/alumnos');
      setAlumnos(res.data);
    };

    getAlumnos();
  }, []);

  const onChangeAlumno = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'rut':
        setRut(value);
        break;
      case 'correo':
        setCorreo(value);
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

  const calcularDigitoVerificador = (rutSinDigito) => {
    let suma = 0;
    let multiplicador = 2;

    // Itera de derecha a izquierda multiplicando y sumando los dígitos
    for (let i = rutSinDigito.length - 1; i >= 0; i--) {
      suma += parseInt(rutSinDigito[i]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    // Calcula el dígito verificador como el complemento de la suma módulo 11
    const digito = 11 - (suma % 11);

    // Devuelve el dígito verificador, considerando casos especiales
    if (digito === 11) {
      return "0";
    } else if (digito === 10) {
      return "K";
    } else {
      return digito.toString();
    }
  };

  const formatearRut = () => {
    const rutSinFormatear = rut.replace(/\./g, "").replace("-", "").trim();
    const rutNum = rutSinFormatear.slice(0, -1);
    const dvIngresado = rutSinFormatear.slice(-1);
    const dvCalculado = calcularDigitoVerificador(rutNum);

    if (dvIngresado.toUpperCase() === dvCalculado) {
      const rutFormateado = rutNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dvIngresado;
      setRut(rutFormateado);
    } else {
      Swal.fire({
        icon: 'info', text: 'El RUT ingresado no es válido',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      setRut("")
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log({nombre, rut, correo, carrera, jornada, active, tipoUsuario})
    correo.toLowerCase();
    const newAlumno = {
      nombre,
      rut,
      correo,
      carrera,
      jornada,
      active,
      tipoUsuario,
    };
    // console.log(newAlumno)
    const res = await axios.post(baseURL + '/alumnos', newAlumno);
    //console.log(res);

    await axios
      .post(baseURL + '/send-email', {
        to: correo,
        subject: 'Registro CAF',
        text: `${nombre}: nos es grato saber que estas interesado(a) en nuestros servicios de CAF. En los proximos días activaremos tu cuenta y te enviaremos un correo notificandote como acceder a la plataforma y a sus servicios. Atentamente, el equipo de CAF`,
        html: `<strong>${nombre}</strong>: nos es grato saber que estas interesado(a) en nuestros servicios de CAF. En los proximos días activaremos tu cuenta y te enviaremos un correo notificandote como acceder a la plataforma y a sus servicios. Atentamente, el equipo de CAF`,
      })
      .then((response) => {
        //console.log('Email sent successfully:', response.data);
      })
      .catch((error) => {
        // console.error('Error sending email:', error);
      });

    navigate('/notificacion');

  };


  const validarCorreoElectronico = (correo) => {
    const expresionRegular = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesor\.duoc\.cl|duoc\.cl)$/;
    return expresionRegular.test(correo);
  };

  return (
    <OuterContainer>

      <Container>
        <Login className='login'>
          <form className="form-horizontal" >
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>
            <H1>REGISTRO</H1>
            <H2>Presiona cada casilla para registrar</H2>
            <div className="form-group">
              <InputN type="text" placeholder="NOMBRE COMPLETO:" name="nombre" onChange={onChangeAlumno} />
            </div>
            <div className="form-group">
              <InputR type="text" placeholder="RUT:" name="rut" value={rut} pattern="^(\d{1,2}\.)?\d{3}\.\d{3}-[0-9kK]$" onBlur={formatearRut} onChange={onChangeAlumno} />
              <InputCorreo type="mail" placeholder="CORREO DUOC:" name="correo" onChange={onChangeAlumno} />
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
            <Button className="button" onClick={(e) => { handleClickOpen(e) }}>
              ENVIAR SOLICITUD
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
            >
              <DialogTitle aria-label="confirmacion">
                {"¿Están correctos estos datos?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  IMPORTANTE: Una vez enviada la solicitud, no se podrá modificar. Asegurate de que los datos sean correctos. <br /><br />
                  Correo: {correo} <br />
                  Rut: {rut} <br />
                  Nombre: {nombre} <br />
                  Carrera: {carrera} <br />
                  Jornada: {jornada}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={(e) => { onSubmit(e) }} >
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>

          </form>
        </Login>
      </Container>
      <div className="vector1right" />
    </OuterContainer>
  )
}


const OuterContainer = styled.div`
  display: flex;
`;



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding: 20px;
  border-radius: 5px;
  opacity: 0.9;
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

const H2 = styled.h1`
font-family: 'lato', sans-serif;
font-size: 18px;
margin-bottom: 20px;
color: #FCB924;
@media only screen and (max-width: 768px) {
  font-size: 14px;
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

export default CrearAlumno;