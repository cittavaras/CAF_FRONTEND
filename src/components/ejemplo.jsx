import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavAdmin from './Navigation';
import ReactPaginate from 'react-paginate'; //para importar la libreria de paginacion
import baseURL from '../helpers/rutaBase';

class ListarAlumno extends Component {
  state = {
    alumnos: [],
    paginaNumero: 0, // valor inicial para la paginacion
    porPagina: 5, // cantidad de elementos por pagina
    totalCount: 0, // total de elementos obtenidos
  }

  componentDidMount() {
    
    this.getAlumnos();
  }

  // Función para obtener la lista de alumnos
  getAlumnos = async () => {
    try {
      const res = await axios.get(baseURL + '/alumnos');
      // Filtrar los alumnos que son del tipo 'Alumno' y que no estén activos
      const alumnos = res.data.alumnos.filter(alumno => alumno.tipoUsuario === 'Alumno' && alumno.active === false);
      const startIndex = this.state.paginaNumero * this.state.porPagina;
      // Seleccionar los alumnos de la página actual según el índice de inicio y la cantidad de elementos por página
      const alumnosSeleccionados = alumnos.slice(startIndex, startIndex + this.state.porPagina);
      // Actualizar el estado con los alumnos seleccionados y el total de alumnos obtenidos
      this.setState({ alumnos: alumnosSeleccionados, totalCount: alumnos.length });
    } catch (error) {
      console.log(error);
    }
  }


  // Función para eliminar un alumno
  eliminarAlumno = async (id) => {
    
    const alu = await axios.delete(`${baseURL}/alumnos/${id}`);
    clg(alu);
    this.getAlumnos();
  }


  // Función para aceptar un alumno
  aceptarAlumno = async (id) => {
    const res = await axios.put(`${baseURL}/alumnos/${id}`, { active: true });
    this.getAlumnos();
    console.log(res);
    console.log(res.data.alumnos);
  }
    
  // Función para manejar el cambio de página
  handlePageClick = (e) => {
    const paginaSeleccionada = e.selected; // Página seleccionada
    this.setState({ paginaNumero: paginaSeleccionada }, () => {
      this.getAlumnos();
    });
  }; // fin de handlePageClick

  render() {
    return (
      <>
        <DivT>
          <Div className="row">
            {
              this.state.alumnos.map(alumno => (
                <div className="col-md4 p-2" key={alumno._id}>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h3>{alumno.nombre}</h3>
                      <button type='button' className="btn btn-secondary" onClick={() => { this.aceptarAlumno(alumno._id) }}>
                        Aceptar Solicitud
                      </button>
                    </div>
                    <div className="card-body">
                      <p>Rut: {alumno.rut}</p>
                      <p>Correo: {alumno.correo}</p>
                      <p>Carrera: {alumno.carrera}</p>
                    </div>
                    <div className="card-footer">
                      <button type="button" className="btn btn-danger" onClick={() => this.eliminarAlumno(alumno._id)}>
                      Eliminar
                      </button>
                  </div>
                </div>
              </div>
            ))
          }
        </Div>

        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          pageCount={Math.ceil(this.state.totalCount / this.state.porPagina)}
          onPageChange={this.handlePageClick}
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
  )
  }
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
