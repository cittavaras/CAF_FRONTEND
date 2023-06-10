import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import RegistroMetricas from './RegistroMetricas';
import BotonesPerfil from './BotonesPerfil';
import baseURL from '../helpers/rutaBase';
import { Link } from 'react-router-dom';
import RegistroRutinas from '../pages/RegistroRutinas';
const ListarActivos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [paginaNumero, setPaginaNumero] = useState(0);
  const [porPagina, setPorPagina] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);


  const [open, setOpen] = useState(false);

  const handleOpen = (e, al) => {
    e.preventDefault();
    setAlumnoSeleccionado(al)
    setOpen(true)

  };
  const handleClose = () => {
    setAlumnoSeleccionado(null);
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
      const alumnos = res.data.alumnos.filter(alumno => alumno.tipoUsuario === 'Alumno' && alumno.active === true);
      const startIndex = paginaNumero * porPagina;
      const alumnosSeleccionados = alumnos.slice(startIndex, startIndex + porPagina);
      setAlumnos(alumnosSeleccionados);
      setTotalCount(alumnos.length);
    } catch (error) {
      //console.log(error);
    }
  }

  const actualizarAlumno = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${baseURL}/alumnos/${search}`);
    await axios
      .post(baseURL + '/alumnos', { rut: search, })
      .then((response) => {
        //console.log('Email sent successfully:', response.data);
      })
      .catch((error) => {
        //console.error('Error sending email:', error);
      });

    getAlumnos();
  }

  const registrarMetricas = async (e, metricas) => {
    e.preventDefault();
    const {
      edad,
      imc,
      grasaVisceral,
      altura,
      porcentajeGrasaCorporal,
      peso,
      porcentajeGrasaMuscular,
      rut,
    } = metricas


    if (!edad || !imc || !grasaVisceral || !altura || !porcentajeGrasaCorporal || !peso || !porcentajeGrasaMuscular) {
      alert('Debe completar todos los campos');
      return;
    }
    else {
      await axios.post(`${baseURL}/metricas/`, metricas);
      //console.log(metricas);
      alert('Metricas registradas');
      handleClose();
    }

    getAlumnos();

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
    const res = await axios.get(baseURL + '/alumnos');
    const alumno = res.data.alumnos.filter(alumno => alumno.tipoUsuario === 'Alumno' && alumno.rut === search);
    if (!search) {
      alert('Ingrese un rut');
      getAlumnos();
      return;
    }
    else if (alumno && alumno.length > 0) {
      setAlumnos(alumno);
    }
    else {
      alert('Alumno no encontrado');
      getAlumnos();
      return;
    }
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
          <BotonesPerfil />
          <Div className="row">
            <div>
              <h2>
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: 'auto', marginRight: 'auto' }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Ingrese el rut del alumno ej: 12.345.678-9"
                    inputProps={{ 'aria-label': 'Ingrese el rut del alumno' }}
                    onChange={handleInputValue}
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
                        {/* <button type='button' className="btn btn-secondary" onClick={() => { aceptarAlumno(alumno._id) }}> */}
                        <button type='button' className="btn btn-secondary" onClick={(e) => { handleOpen(e, alumno) }}>
                          Registrar metricas alumno
                        </button>
                        <Link
                          className="btn btn-secondary"
                          to={`/registroRutinas?rut=${alumno.rut}&nombre=${alumno.nombre}`}
                        >
                          Registro Rutinas
                        </Link>
                      </div>
                      <div className="card-body">
                        <p>Rut: {alumno.rut}</p>
                        <p>Correo: {alumno.correo}</p>
                        <p>Carrera: {alumno.carrera}</p>
                      </div>
                      <div className="card-footer">

                      </div>
                    </div>
                    {open && <RegistroMetricas open={open} setOpen={setOpen} handleClose={handleClose} registrarMetricas={registrarMetricas} alumnoSeleccionado={alumnoSeleccionado}
                    />
                    }
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



export default ListarActivos;
