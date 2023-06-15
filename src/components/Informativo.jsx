import React, { useState } from 'react';
//import AdminControl from './AdminControl.jsx';
import GimInforma from './GimInforma';
import AdminControl from './AdminControl';

const Informativo = () => {
  const [infoCargada, setInfoCargada] = useState(null);

  const handleInfoCargada = (info) => {
    setInfoCargada(info);
  };

  return (
    <div className='container'>
      <div className='d-flex justify-content-center mt-5'>
        <div className='col-5'>
          <h2 style={{color:'white'}}>Panel Administrador</h2>
          <AdminControl onInfoCargada={handleInfoCargada} />
        </div>
        <div className='col-5'>
          <h2 className='text-center' style={{color:'white'}}>Previsualizacion del Panel alumno</h2>
          {infoCargada ? (
            <GimInforma titulo={infoCargada.titulo} imagen={infoCargada.imagen} texto={infoCargada.texto} />
          ) : (
            <p>No se ha cargado la información</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Informativo;
