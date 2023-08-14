import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import baseURL from '../helpers/rutaBase';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const EjerciciosControl = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [modificar, setModificar] = useState(false);
  const [ejerciciosModificados, setEjerciciosModificados] = useState([]);

  const handleAddExercise = () => {
    setEjercicios((prevEjercicios) => [...prevEjercicios, { nombre: '' }]);
    if (modificar === true) {
      setEjerciciosModificados((prevEjerciciosModificados) => [
        ...prevEjerciciosModificados,
        { nombre: '', modificado: true },
      ]);
    }
  };

  const handleQuitarEjercicio = (index) => {
    const ejercicio = ejercicios[index];
    if (ejercicio._id) {
      eliminarEjercicio(ejercicio._id);
    } else {
      const nuevosEjercicios = ejercicios.filter((_, idx) => idx !== index);
      setEjercicios(nuevosEjercicios);
    }
  };

  const handleModificarEjercicio = (index, valor) => {
    const nuevosEjercicios = [...ejercicios];
    nuevosEjercicios[index].nombre = valor;
    nuevosEjercicios[index].modificado = true;
    setEjercicios(nuevosEjercicios);
  };

  const handleSubmit = async (e, ejercicios) => {
    e.preventDefault();
    try {
      const res = await axios.post(baseURL + `/ejercicios/`, { ejercicios });
      Swal.fire('Ejercicios guardados con éxito');
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarEjercicio = async (ejercicioID) => {
    try {
      const res = await axios.delete(baseURL + `/ejercicios/${ejercicioID}`);
      setEjercicios((prevEjercicios) =>
        prevEjercicios.filter((ejercicio) => ejercicio._id !== ejercicioID)
      );
      Swal.fire('Ejercicio eliminado exitosamente');
    } catch (error) {
      console.error(error);
    }
  };

  const verificarModificarYAgregar = async (e) => {
    e.preventDefault();
  
    const ejerciciosModificados = ejercicios.filter((ejercicio) => ejercicio.modificado && ejercicio._id);
    const ejerciciosNuevos = ejercicios.filter((ejercicio) => !ejercicio._id);
  
    try {
      for (const ejercicioModificado of ejerciciosModificados) {
        await axios.put(
          baseURL + `/ejercicios/${ejercicioModificado._id}`,
          { _id: ejercicioModificado._id, nombre: ejercicioModificado.nombre }
        );
      }
  
      if (ejerciciosNuevos.length > 0) {
        const nuevosEjerciciosData = ejerciciosNuevos.map((ejercicio) => ({ nombre: ejercicio.nombre }));
        await axios.post(baseURL + `/ejercicios/`, { ejercicios: nuevosEjerciciosData });
      }
  
      setEjerciciosModificados([]);
      Swal.fire('Ejercicios guardados con éxito');
    } catch (error) {
      console.error('Error al actualizar ejercicios:', error);
    }
  };
  
  

  useEffect(() => {
    const getEjercicios = async () => {
      try {
        const res = await axios.get(baseURL + '/ejercicios');
        setEjercicios(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getEjercicios();
  }, []);


  const style = {
    "&": {
      padding: '5px',
    },
    "& label.Mui-focused": {
      color: "#C0D437!important"
    },
    "& .MuiFormLabel-root": {
      color: "white!important",
      top: "-2px",
      padding: "0px 0px 0px 0px!important"
    },
    "& label": {
      padding: 'inherit!important',
      color: 'white!important'
    },
    "& .MuiInputBase-root:after": {
      borderBottomColor: "#C0D437!important",
      color: 'white!important'
    },
    "& .MuiInputBase-root:before": {
      borderBottomColor: "white!important"
    },
    ".MuiInputBase-input": {
      backgroundColor: "rgb(165 181 58 / 17%)",
      color: 'white!important'
    },
    ".MuiFilledInput-input": {
      paddingTop: "19px",
      paddingRight: "9px",
      paddingBottom: "7px",
      paddingLeft: "3px"
    }
  }

  return (
    <div className="m-auto" style={{ maxWidth: 'max-content' }}>
      <div className="d-grid gap-4"
        style={{
          background: 'rgba(0,0,0,0.7)',
          width: '100%',
          height: '100%',
          borderRadius: '13px',
        }}
      >
        <div className="ejercicios-container" style={{ backgroundColor: 'rgba(0,0,0,0)', padding: '15px' }}>
          <StyledEjerciciosContainer>
            <Typography
              style={{ color: 'white', textAlign: 'center', marginBottom: 'revert' }}
            >
              Ejercicios
            </Typography>
            {ejercicios.map((ejercicio, index) => (
              <div key={index} className="ejercicio mb-2" style={{ color: 'white' }}>
                <Row className="align-items-center">
                  <Col xs={8}>
                    <TextField
                      autoComplete="off"
                      sx={style}
                      value={ejercicio.nombre}
                      label="Nombre del Ejercicio"
                      variant="filled"
                      className="input-group-box-rutina"
                      type="text"
                      onChange={(e) => handleModificarEjercicio(index, e.target.value)}
                    />
                  </Col>
                  <Col xs={4} className="text-end">
                    <Button
                      sx={{ color: 'red', border: '1px solid red' }}
                      variant="outlined"
                      onClick={() => handleQuitarEjercicio(index)}
                    >
                      Quitar Ejercicio
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
            <Button variant="outlined" onClick={handleAddExercise} style={{ border: '13px', background: 'rgb(158 173 56)', color: 'white' }}>
              Agregar Ejercicio
            </Button>
          </StyledEjerciciosContainer>
        </div>
        <Button style={{ border: '13px', background: 'rgb(158 173 56)', color: 'white' }} variant="outlined" onClick={(e) => verificarModificarYAgregar(e, ejercicios)}>
          {modificar ? 'Modificar' : 'Guardar'} Ejercicios
        </Button>
      </div>
    </div>
  );
};  
const StyledEjerciciosContainer = styled.div`
  background: rgba(0, 0, 0, 0);
  padding: 15px;
  overflow-y: auto; // Añade esto para habilitar el scroll vertical
  max-height: 600px; // Establece una altura máxima para el contenedor
`;
export default EjerciciosControl;
