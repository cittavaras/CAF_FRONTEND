import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import MotivoRechazo from './MotivoRechazo';

const ListarAlumno = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [paginaNumero, setPaginaNumero] = useState(0);
  const [porPagina, setPorPagina] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [alumnoEliminado, setAlumnoEliminado] = useState(null);
  

  const [open, setOpen] = useState(false);

  const handleOpen = (e, al) =>  {
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
      const res = await axios.get('https://caf.ivaras.cl/api/alumnos');
      // Filtrar los alumnos que son del tipo 'Alumno' y que no estén activos
      const alumnos = res.data.alumnos.filter(alumno => alumno.tipoUsuario === 'Alumno' && alumno.active === false);
      const startIndex = paginaNumero * porPagina;
      // Seleccionar los alumnos de la página actual según el índice de inicio y la cantidad de elementos por página
      const alumnosSeleccionados = alumnos.slice(startIndex, startIndex + porPagina);
      // Actualizar el estado con los alumnos seleccionados y el total de alumnos obtenidos
      setAlumnos(alumnosSeleccionados);
      setTotalCount(alumnos.length);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Función para eliminar un alumno
  const eliminarAlumno = async (e, message) => {
    e.preventDefault();
    const res = await axios.delete(`https://caf.ivaras.cl/api/alumnos/${alumnoEliminado._id}`);

    await axios
    .post('https://caf.ivaras.cl/api/send-email', {
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
  const aceptarAlumno = async (id) => {
    const res = await axios.put(`https://caf.ivaras.cl/api/alumnos/${id}`, { active: true });
    const {correo, nombre} = res.data;
    await axios
    .post('https://caf.ivaras.cl/api/send-email', {
      to: correo,
      subject: 'Solicitud Aceptada CAF IVARAS',
      text: `${nombre}, Le informamos que su cuenta ha sido activada exitosamente, recuerde que para ingresar necesita su correo y el rut como contraseña sin puntos, guion ni digito verificador guiense por el siguiente link https://caf.ivaras.cl/login `,
      html: `<strong>${nombre}</strong>, Le informamos que su cuenta ha sido activada exitosamente, recuerde que para ingresar necesita su correo y el rut como contraseña sin puntos, guion ni digito verificador guiense por el siguiente link https://caf.ivaras.cl/login`,
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

  // Función para manejar el cambio de página
  const handlePageClick = (e) => {
    const paginaSeleccionada = e.selected; // Página seleccionada
    setPaginaNumero(paginaSeleccionada);
  }; // fin de handlePageClick
  return (
    <>
      <DivT>
        <Div className="row">
          {
            alumnos.map(alumno => (
              <div className="col-md4 p-2" key={alumno._id}>
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <h3>{alumno.nombre}</h3>
                    <button type='button' className="btn btn-secondary" onClick={() => { aceptarAlumno(alumno._id) }}>
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
                  {open && <MotivoRechazo open={open} setOpen={setOpen} handleClose={handleClose}  alumnoEliminado={alumnoEliminado} eliminarAlumno={eliminarAlumno}/>}
              </div>
            ))
          }
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
  font-family: 'Kodchasan';
  margin-top: 100px;
  top: 100px;
`;

const Div = styled.div`
  font-family: 'Kodchasan';
  top: 10px;
`;

export default ListarAlumno;