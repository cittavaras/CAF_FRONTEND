import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/css/style.css';
import Inicio from "../pages/Inicio"
import Bienvenida from '../pages/Bienvenida';
import CrearAlumno from '../components/CrearAlumno'
import Notificacion from "../pages/notificacion";
import LandingPageAlumno from "../pages/LadingPageAlumno";
import Login from '../pages/Login';
import MetricaAlumno from '../pages/MetricaAlumno';
import GraficosAlumnos from '../pages/GraficosAlumnos';
import ListarAlumno from "../components/ListarAlumno";
import NotFoundPage from "../pages/NotFoundPage";
import AgendaReserva from "../components/AgendaReserva";
import Layout from "../layouts/Layout";
import useAuth from '../auth/useAuth';
import roles from '../helpers/roles';
import routes from '../helpers/routes';
import CrearUsuario from "../components/CrearUsuario";
import ListarActivos from "../components/ListarActivos";
import Configuracion from "../components/Configuracion";
import ModificarEliminarUsuario from "../components/ModificarEliminarUsuario";
import SobreNosotros from "../pages/SobreNosotros";
import AdminControl from "../components/AdminControl";
import Informativo from "../components/Informativo";
import RegistroRutinas from "../pages/RegistroRutinas";
import RutinaAlumno from "../pages/RutinaAlumno";

export default function AppRouter() {
  const { isLogged } = useAuth();
  useEffect(() => {
    //loadSession();
  }, [isLogged]);
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Rutas publicas */}
          <Route path="/registro" element={
            <PublicRoute>
              <CrearAlumno/>
            </PublicRoute>}
          />
          <Route path="/qr" element={
            <PublicRoute>
              <Inicio/>
            </PublicRoute>}
          />
          <Route path="/bienvenida" element={
            <PublicRoute>
              <Bienvenida/>
            </PublicRoute>}
          />
          <Route path="/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>}
          />
          {/* Ruta que no existe */}
          <Route path="*" element={
            <PublicRoute>
              <NotFoundPage/>
            </PublicRoute>}
          />
          <Route path="/notificacion" element={
            <PublicRoute>
              <Notificacion />
            </PublicRoute>}
          />
          <Route path="/nosotros" element={
            <PublicRoute>
              <SobreNosotros/>
            </PublicRoute>}
          />
          {/* Rutas privadas */}
          <Route path="/landing" element={
            <PrivateRoute>
              <LandingPageAlumno />
            </PrivateRoute>}
          />
          <Route path="/control" element={
            <PrivateRoute>
              <Informativo/>
            </PrivateRoute>}
          />
          <Route path="/reserva" element={
            <PrivateRoute>
              <AgendaReserva/>
            </PrivateRoute>}
          />
          <Route path="/metrica" element={
            <PrivateRoute>
              <MetricaAlumno/>
            </PrivateRoute>}
          />
          <Route path="/graficos" element={
            <PrivateRoute>
              <GraficosAlumnos/>
            </PrivateRoute>}
          />
          <Route path="/configuracion" element={
            <PrivateRoute>
              <Configuracion/>
            </PrivateRoute>}
          />
          <Route path="/listar" element={
            <PrivateRoute hasRole={roles.admin} >
              <ListarAlumno />
            </PrivateRoute>}
          />
          <Route path="/crearUsuario" element={
            <PrivateRoute hasRole={roles.admin} >
              <CrearUsuario/>
            </PrivateRoute>}
          />
          <Route path="/listarActivos" element={
            <PrivateRoute hasRole={roles.instructor} >
              <ListarActivos />
            </PrivateRoute>}
          />
          <Route path="/mantenedor" element={
            <PrivateRoute hasRole={roles.admin} >
              <ModificarEliminarUsuario />
            </PrivateRoute>}
          />
          <Route path="/registroRutinas" element={
            <PrivateRoute hasRole={roles.instructor} >
              <RegistroRutinas />
            </PrivateRoute>}
          />
          <Route path="/rutina" element={
            <PrivateRoute hasRole={roles.alumno} >
              <RutinaAlumno />
            </PrivateRoute>}
          />
          <Route path="/adminControl" element={
            <PrivateRoute hasRole={roles.admin} >
              <AdminControl />
            </PrivateRoute>}
          />
          
        </Routes>
      </Layout>
    </Router>
  )
}

function PrivateRoute({ children, redirectTo = '/', hasRole: tipoUsuario }) {
  const { hasRole, isLogged } = useAuth();

  if (tipoUsuario && !hasRole(tipoUsuario)) {
    return <Navigate to={redirectTo} />;
  }

  if (!isLogged()) {
    return <Navigate to={'/'} />;
  }
  return children;
}

function PublicRoute({ children, redirectTo = '/landing' }) {
  const { isLogged } = useAuth();
  return !isLogged() ? children : <Navigate to={redirectTo} />;
}