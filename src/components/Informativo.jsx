import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
//import AdminControl from './AdminControl.jsx';
import GimInforma from './GimInforma';
import AdminControl from './AdminControl';
import axios from 'axios'; import useAxiosInterceptors from '../auth/axiosResponse';
import { useEffect } from 'react';
import baseURL from '../helpers/rutaBase';
import Swal from 'sweetalert2';

const Informativo = () => {
  const [infoCargada, setInfoCargada] = useState([]);
  const [showModal, setShowModal] = useState(false);

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
useAxiosInterceptors();

  const handleInfoCargada = (info) => {
    // console.log('INFO', info);
    setInfoCargada(info);
  };

  const handleSubmitInfo = async (e) => {
    //control de errores if error exist alert error else alert success
    e.preventDefault();
    try {
      const resp = await axios.put(baseURL + '/landing-page/landing-page', infoCargada, {
        headers: {
            'Authorization': accessToken // Include the JWT token in the Authorization header
        },
        
    });
      Swal.fire({
        icon: 'success', text: 'Cambios guardados con éxito',
        confirmButtonColor: 'rgb(158 173 56)',
      });
    } catch (error) {
      Swal.fire({
        icon: 'info', text: 'Error al guardar la información, probablemente el tamaño de la imagen es muy grande intenta con otra',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      console.log(error.message);
    }
  };

  const getlandingPage = async () => {
    const resp = await axios.get(baseURL + '/landing-page/landing-page', {
      headers: {
          'Authorization': accessToken // Include the JWT token in the Authorization header
      },
      
  });
    setInfoCargada(resp.data);
  };

  useEffect(() => {
    getlandingPage();
  }, []);


  return (
    <div className='container mt-4 rounded' style={{ backgroundColor: '#adb5bd42' }}>
      <div className='d-md-flex justify-content-center'>
        {
          infoCargada ? (<>
            <div className='col-md-5 mt-5'>
              <h2 className='text-center' style={{ color: 'white' }}>Panel Administrador</h2>
              <AdminControl onInfoCargada={handleInfoCargada} infoCargada={infoCargada} />
              <button className='button w-50 mx-auto mt-3 mb-5 d-block' onClick={handleSubmitInfo}>
                Guardar Cambios
              </button>
            </div>
            <div className='col-md-5 mt-5'>
              <h2 className='text-center' style={{ color: 'white' }}>Previsualizacion</h2>

              <GimInforma titulo={infoCargada.titulo} imagen={infoCargada.imagenBase64} texto={infoCargada.descripcion} />
              
            </div>
          </>
          ) : (
            <p>No se ha cargado la información</p>
          )
        }
      </div>
  
    </div>
  );
};

export default Informativo;
