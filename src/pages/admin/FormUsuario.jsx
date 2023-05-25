import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const CrearUsuarioForm = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    //console.log(`Nuevo usuario: ${usuario}, ${contraseña}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre de usuario"
        value={usuario}
        onChange={(event) => setUsuario(event.target.value)}
      />
      <br />
      <br></br>
      <TextField
        label="Contraseña"
        type="contraseña"
        value={contraseña}
        onChange={(event) => setContraseña(event.target.value)}
      />
      <br />
      <Button type="submit">Crear usuario</Button>
      <br />
    </form>
  );
};

export default CrearUsuarioForm;