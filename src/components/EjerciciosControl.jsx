import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import baseURL from '../helpers/rutaBase';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const EjerciciosControl = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [ejercicio, setEjercicio] = useState('');
  const [nombre, setNombre] = useState('');
  const [newExerciseAdded, setNewExerciseAdded] = useState(false);
  //funcion que agrega un ejercicio al array de ejercicios
  const handleAddExercise = () => {
    setEjercicios((prevEjercicios) => [...prevEjercicios, { nombre: '' }]);
  }

  const handleQuitarEjercicio = (ejercicioID) => {
    const nuevosEjercicios = ejercicios.filter((ejercicio) => ejercicio._id !== ejercicioID);
    setEjercicios(nuevosEjercicios);
  };

  const handleModificarEjercicio = (ejercicioID, campo, valor) => {
    const nuevosEjercicios = ejercicios.map((ejercicio) =>
    ejercicio._id === ejercicioID ? { ...ejercicio, [campo]: valor } : ejercicio
  );
    setEjercicios(nuevosEjercicios);
  };
  const getEjercicios = async () => {
    try {
      const res = await axios.get(baseURL + '/ejercicios/');
      const ejercicios = res.data;
      setEjercicios(ejercicios);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(baseURL + '/ejercicios/', ejercicios);
      Swal.fire('Ejercicios guardados con éxito');
    } catch (error) {
      console.error(error);
    }
  };
  const eliminarEjercicio = async (ejercicioID) => {
    try {
      const res = await axios.delete(baseURL + `/ejercicios/${ejercicioID}`);
      setEjercicios((prevEjercicios) => prevEjercicios.filter((ejercicio) => ejercicio._id !== ejercicioID));
      Swal.fire('Ejercicio eliminado exitosamente');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEjercicios();
  }, []);

  return (
    <div className="m-auto" style={{ maxWidth: '345px' }}>
      <div className="d-grid gap-4">
        <div className="ejercicios-container">
          <Typography style={{ color: 'white' }}>Ejercicios</Typography>
          {ejercicios.map((ejercicio) => (
            <div key={ejercicio._id} className="ejercicio">
              <TextField
                value={ejercicio.nombre}
                label="Nombre del Ejercicio"
                variant="outlined"
                onChange={(e) =>
                  handleModificarEjercicio(ejercicio._id, e.target.value)
                }
              />
              <Button variant="outlined" onClick={() => handleQuitarEjercicio(ejercicio._id)}>
                Quitar Ejercicio
              </Button>
            </div>
          ))}
          <Button variant="outlined" onClick={handleAddExercise}>
            Agregar Ejercicio
          </Button>
        </div>
        <Button variant="outlined" onClick={handleSubmit}>
          Guardar Ejercicios
        </Button>
      </div>
    </div>
  );
};

export default EjerciciosControl;
