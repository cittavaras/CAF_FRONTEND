import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import baseURL from '../helpers/rutaBase';
import ConfirmarEliminar from './ConfirmarEliminar';
import ModificarUsuario from './ModificarUsuario';
import Swal from 'sweetalert2';

const ModificarEliminarUsuario = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [paginaNumero, setPaginaNumero] = useState(0);
  const [porPagina, setPorPagina] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [alumnoEliminado, setAlumnoEliminado] = useState(null);
  const [alumnoModificado, setAlumnoModificado] = useState(null);


  const [open, setOpen] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);

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

  const handleOpenModificar = (e, al) => {
    e.preventDefault();
    setAlumnoModificado(al)
    setOpenModificar(true)

  };
  const handleCloseModificar = () => {
    setAlumnoModificado(null);
    setOpenModificar(false);
    // setSelectedEvents([]);
  }

  useEffect(() => {
    getAlumnos();
  }, [paginaNumero]);

  // Función para obtener la lista de alumnos
  const getAlumnos = async () => {
    try {
      const res = await axios.get(baseURL + '/alumnos');
      const alumnos = res.data.alumnos.filter(alumno => alumno.tipoUsuario === 'Alumno' && alumno.active === true);
      const startIndex = paginaNumero * porPagina;
      const alumnosSeleccionados = alumnos.slice(startIndex, startIndex + porPagina);
      setAlumnos(alumnosSeleccionados);
      setTotalCount(alumnos.length);
    } catch (error) {
      //console.log(error);
    }
  }

  const formatearRut = (e) => {
    //console.log(e.target.value)
    const rutSinFormatear = e.target.value.replace(/\./g, "").replace("-", "").trim();
    const dv = rutSinFormatear.slice(-1);
    const rutNum = rutSinFormatear.slice(0, -1);
    const rutFormateado = rutNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
    setSearch(rutFormateado);
    search.trim();
  }

  const handleInputValue = (e) => {
    formatearRut(e);
  }

  // Filtrar por rut
  const filtrarAlumnos = async (e) => {
    e.preventDefault();
    if(e.key !== undefined) {
      if(e.key !== 'Enter') return;
    }
    const res = await axios.get(baseURL + '/alumnos');
    const alumno = res.data.alumnos.filter(alumno => alumno.tipoUsuario === 'Alumno' && alumno.rut === search);
    if (!search) {
      Swal.fire({
        icon: 'info', text: 'Ingrese un rut',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      getAlumnos();
      return;
    }
    else if (alumno && alumno.length > 0) {
      setAlumnos(alumno);
    }
    else {
      Swal.fire({
        icon: 'info', text: 'Alumno no encontrado',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      getAlumnos();
      return;
    }
  }
  const modificarAlumno = async (e, actualizar) => {
    e.preventDefault();
    const {
      nombre,
      rut,
      password: contraseña,
      correo,
      carrera,
      jornada,
      tipoUsuario,
    } = actualizar

    if (!nombre || !rut || !contraseña || !correo || !carrera || !jornada || !tipoUsuario) {
      Swal.fire({
        icon: 'info', text: 'Debe completar todos los campos',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      return;
    }
    else {
      await axios.put(`${baseURL}/alumnos/${alumnoModificado._id}`, actualizar);
      //console.log(actualizar);
      Swal.fire({
        icon: 'info', text: 'Datos del alumno actualizadas con éxito',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      handleCloseModificar();
    }
    getAlumnos();

  }

  const eliminarAlumno = async (e) => {
    e.preventDefault();
    const res = await axios.delete(`${baseURL}/alumnos/${alumnoEliminado._id}`);

    handleClose();
    getAlumnos();

  }

  // Función para manejar el cambio de página
  const handlePageClick = (e) => {
    const paginaSeleccionada = e.selected; // Página seleccionada
    setPaginaNumero(paginaSeleccionada);
  }; // fin de handlePageClick
  return (
    <>
      <Container maxWidth="md">
        <DivT>
          <Div className="row">
            <div>
              <h2>
                <Paper
                  onSubmit={(e) => { e.preventDefault(); }}
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: 'auto', marginRight: 'auto' }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Ingrese el rut del alumno ej: 12.345.678-9"
                    inputProps={{ 'aria-label': 'Ingrese el rut del alumno' }}
                    onChange={handleInputValue}
                    onKeyUp={filtrarAlumnos}
                    value={search} />
                  <button className='btn btn-dark' type="button" sx={{ p: '10px' }} aria-label="search" onClick={filtrarAlumnos}>
                    <SearchIcon />
                  </button>
                </Paper>
              </h2>
              {
                alumnos.map(alumno => (
                  <card className="col-md-4 p-2" key={alumno._id}>
                    <div className="card">
                      <div className="card-header d-flex justify-content-between">
                        <h3>{alumno.nombre}</h3>
                        <button type='button' className="btn btn-secondary" onClick={(e) => { handleOpenModificar(e, alumno) }}>
                          Modificar datos
                        </button>
                        {openModificar && <ModificarUsuario open={openModificar} setOpen={setOpenModificar} handleClose={handleCloseModificar} alumnoModificado={alumnoModificado} modificarAlumno={modificarAlumno} />}
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
                        {open && <ConfirmarEliminar open={open} setOpen={setOpen} handleClose={handleClose} alumnoEliminado={alumnoEliminado} eliminarAlumno={eliminarAlumno} />}
                      </div>
                    </div>
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
      </Container>
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


export default ModificarEliminarUsuario;