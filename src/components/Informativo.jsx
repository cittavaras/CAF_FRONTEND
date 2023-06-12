import React, { useState } from 'react';
//import AdminControl from './AdminControl.jsx';
import GimInforma from './GimInforma';
import AdminControl from './AdminControl';

const Padre = () => {
  const [infoCargada, setInfoCargada] = useState(null);

  const handleInfoCargada = (info) => {
    setInfoCargada(info);
  };

  return (
    <div>
      <h2>Página del Administrador</h2>
      <AdminControl onInfoCargada={handleInfoCargada} />

      <h2>Página del Alumno</h2>
      {infoCargada ? (
        <GimInforma imagen={infoCargada.imagen} texto={infoCargada.texto} />
      ) : (
        <p>No se ha cargado la información</p>
      )}
    </div>
  );
};

export default Padre;
