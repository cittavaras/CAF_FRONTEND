import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SitioParamsForm = () => {
  const [maxBloquesPorAlumno, setMaxBloquesPorAlumno] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    //console.log(`Nuevo valor de parámetro: ${maxBloquesPorAlumno}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Máximo de bloques por alumno"
        value={maxBloquesPorAlumno}
        onChange={(event) => setMaxBloquesPorAlumno(event.target.value)}
      />
      <br />
      <Button type="submit">Guardar cambios</Button>
    </form>
  );
};

export default SitioParamsForm;