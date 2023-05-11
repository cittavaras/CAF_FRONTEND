import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import MotivoRechazo from './MotivoRechazo';
import BotonesPerfil from './BotonesPerfil';
import baseURL from '../helpers/rutaBase';

const ListarAlumno = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [paginaNumero, setPaginaNumero] = useState(0);
  const [porPagina, setPorPagina] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [alumnoEliminado, setAlumnoEliminado] = useState(null);


  const [open, setOpen] = useState(false);

  const handleOpen = (e, al) => {
    e.preventDefault();
    setAlumnoEliminado(al)
    setOpen(true)

  };
  const handleClose = () => {
    setAlumnoEliminado(null);
    setOpen(false);
    // setSelectedEvents([]);
  }


  useEffect(() => {
    getAlumnos();
  }, [paginaNumero]);

  // Función para obtener la lista de alumnos
  const getAlumnos = async () => {
    try {
      const res = await axios.get(baseURL + '/alumnos');
      const alumnos = res.data.alumnos.filter(alumno => alumno.tipoUsuario === 'Alumno' && alumno.active === false);
      const startIndex = paginaNumero * porPagina;
      const alumnosSeleccionados = alumnos.slice(startIndex, startIndex + porPagina);
      setAlumnos(alumnosSeleccionados);
      setTotalCount(alumnos.length);
    } catch (error) {
      console.log(error);
    }
  }

  // Función para eliminar un alumno
  const eliminarAlumno = async (e, message) => {
    e.preventDefault();
    const res = await axios.delete(`${baseURL}/alumnos/${alumnoEliminado._id}`);

    await axios
      .post(baseURL + '/send-email', {
        to: alumnoEliminado?.correo,
        subject: 'Solicitud declinada CAF IVARAS',
        text: `${alumnoEliminado?.nombre}, ${message} `,
        html: `<strong>${alumnoEliminado?.nombre}</strong>, ${message}`,
      })
      .then((response) => {
        console.log('Email sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });

    handleClose();
    getAlumnos();

  }

  // Función para aceptar un alumno
  const aceptarAlumno = async (alumno) => {
    const res = await axios.put(`${baseURL}/alumnos/${alumno._id}`, { active: true });
    await axios
      .post(baseURL + '/send-email', {
        to: alumno.correo,
        subject: 'Solicitud Aceptada CAF IVARAS',
        text: `${alumno.nombre}, Le informamos que su cuenta ha sido activada exitosamente, recuerde que para ingresar necesita su correo y el rut como contraseña sin puntos, sin guion y sin digito verificador guiense por el siguiente link https://caf-desarrollo.ivaras.cl`,
        html: `<strong>${alumno.nombre}</strong>, Le informamos que su cuenta ha sido activada exitosamente, recuerde que para ingresar necesita su correo y el rut como contraseña sin puntos, sin guion y sin digito verificador guiense por el siguiente link https://caf-desarrollo.ivaras.cl`,
      })
      .then((response) => {
        console.log('Email sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });

    console.log(res);
    console.log(res?.data);

    getAlumnos();
  }

  const handlePageClick = (e) => {
    const paginaSeleccionada = e.selected;
    setPaginaNumero(paginaSeleccionada);
  };
  
  return (
    <>
      <DivT>
      <BotonesPerfil/>
        <Div className="row" >
          <div>
            {
              alumnos.map(alumno => (
                <card className="col-md-4 p-2" key={alumno._id}>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h3>{alumno.nombre}</h3>
                      <button type='button' className="btn btn-secondary" onClick={() => { aceptarAlumno(alumno) }}>
                        Aceptar Solicitud
                      </button>
                    </div>
                    <div className="card-body">
                      <p>Rut: {alumno.rut}</p>
                      <p>Correo: {alumno.correo}</p>
                      <p>Carrera: {alumno.carrera}</p>
                    </div>
                    <div className="card-footer">
                      <button type="button" className="btn btn-danger" onClick={(e) => { handleOpen(e, alumno) }} >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  {open && <MotivoRechazo open={open} setOpen={setOpen} handleClose={handleClose} alumnoEliminado={alumnoEliminado} eliminarAlumno={eliminarAlumno} />}
                </card>
              ))
            }
          </div>
        </Div>

        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          pageCount={Math.ceil(totalCount / porPagina)}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />

      </DivT>
    </>
  );
};

const DivT = styled.div`
  margin-top: 100px;
  top: 100px;
`;

const Div = styled.div`
  top: 10px;
`;

export default ListarAlumno;
