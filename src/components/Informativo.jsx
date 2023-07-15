import React, { useState } from 'react';
//import AdminControl from './AdminControl.jsx';
import GimInforma from './GimInforma';
import AdminControl from './AdminControl';
import axios from 'axios';
import { useEffect } from 'react';
import baseURL from '../helpers/rutaBase';

const Informativo = () => {
  const [infoCargada, setInfoCargada] = useState();

  const handleInfoCargada = (info) => {
    console.log('INFO', info);
    setInfoCargada(info);
  };
  
  const handleSubmitInfo = async () => {
    //control de errores if error exist alert error else alert success
    try {
      const resp = await axios.put(baseURL + '/landing-page/landing-page', infoCargada);
      alert('Cambios guardados con éxito');
    } catch (error) {
      alert('Error al guardar la información, probablemente el tamaño de la imagen es muy grande intenta con otra');
      console.log(error.message);
    }
  };

  const getlandingPage = async () => {
    const resp = await axios.get(baseURL + '/landing-page/landing-page');
    setInfoCargada(resp.data);
  };

  useEffect(async () => {
    getlandingPage();
  },[])
  
  useEffect(() => {
    console.log(infoCargada);
  },[infoCargada]);

  return (
    <div className='container mt-4 rounded' style={{ backgroundColor: '#adb5bd42'}}>
      <div className='d-md-flex justify-content-center'>
          {
            infoCargada ? (<>
              <div className='col-md-5 mt-5'>
                <h2 className='text-center' style={{color:'white'}}>Panel Administrador</h2>
                  <AdminControl onInfoCargada={handleInfoCargada} infoCargada={infoCargada}/>
                <button className='button w-50 mx-auto mt-3 mb-5 d-block' onClick={handleSubmitInfo}>
                  Guardar Cambios
                </button>
              </div>
              <div className='col-md-5 mt-5'>
                <h2 className='text-center' style={{color:'white'}}>Previsualizacion</h2>
  
                  <GimInforma titulo={infoCargada.titulo} imagen={infoCargada.imagenBase64} texto={infoCargada.descripcion} />
              </div>
            </>
            ): (
              <p>No se ha cargado la información</p>
            )
          }
      </div>
    </div>
  );
};

export default Informativo;
