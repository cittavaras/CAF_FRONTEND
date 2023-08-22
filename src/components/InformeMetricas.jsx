import React, { useState } from "react";
import Swal from "sweetalert2";

import {
  Dialog,
  DialogContent,
  Container,
  DialogActions,
  Button,
  Select,
  MenuItem,
  DialogTitle,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import axios from "axios";

import styled from "styled-components";
import { useTheme } from "@mui/material/styles"; //TODO

import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import baseURL from "../helpers/rutaBase";

const sortingOptions = [
  { value: "orderByRut", label: "Ordenar por RUT" },
  { value: "orderByDate", label: "Ordenar por Fecha" },
];

const directionOptions = [
  { value: "asc", label: "Ascendente" },
  { value: "desc", label: "Descendente" },
];
const CALENDAR_TITLE = "Descargar Informe de Metricas Alumnos";
const CALENDAR_PARAGRAPH =
  "Seleccione el Rut del alumno que necesite descargar, y los rangos de fechas";

const StyledDialogTitle = styled(DialogTitle)`
  margin-top: 5px;
  margin-bottom: 20px;
`;

const StyledIconButton = styled(IconButton)`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TitleContainer = styled(Box)`
  text-align: center;
  margin-bottom: 16px;
`;

const CalendarTitle = styled(Typography)`
  font-weight: bold;
`;

const CalendarParagraph = styled(Typography)`
  margin-bottom: 24px;
  text-align: center;
`;

const InformeMetricas = (props) => {
  // customizado penca
  const theme = useTheme();
  // orden de las cosas, por ejemplo hacer que baia baia ascendente o descendente
  const [order, setOrder] = useState(sortingOptions[0].value);
  // no se que chucha es por copilot, porfavor dime que hace esto
  const [direction, setDirection] = useState(directionOptions[0].value);
  // fecha de inico en la que se va a buscar informacion
  const [startDate, setStartDate] = useState("");
  // fecha final a la que se le va a buscar informacion
  const [endDate, setEndDate] = useState("");
  // Rut del alumno que se va a buscar informacion
  const [rutAlumno, setRutAlumno] = useState("");
  //rut valido 
  const [rutValido, setRutValido] = useState(true);
  // const handleRutAlumnoChange = () => {
  //   const rutSinFormatear = rut.replace(/\./g, "").replace("-", "").trim();
  //   const rutNum = rutSinFormatear.slice(0, -1);
  //   const dvIngresado = rutSinFormatear.slice(-1);
  //   const dvCalculado = calcularDigitoVerificador(rutNum);

  //   const calcularDigitoVerificador = (rutSinDigito) => {
  //     let suma = 0;
  //     let multiplicador = 2;

  //     // Itera de derecha a izquierda multiplicando y sumando los dígitos
  //     for (let i = rutSinDigito.length - 1; i >= 0; i--) {
  //       suma += parseInt(rutSinDigito[i]) * multiplicador;
  //       multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  //     }

  //     // Calcula el dígito verificador como el complemento de la suma módulo 11
  //     const digito = 11 - (suma % 11);

  //     // Devuelve el dígito verificador, considerando casos especiales
  //     if (digito === 11) {
  //       return "0";
  //     } else if (digito === 10) {
  //       return "K";
  //     } else {
  //       return digito.toString();
  //     }
  //   };
  //   if (dvIngresado.toUpperCase() === dvCalculado) {
  //     const rutFormateado =
  //       rutNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dvIngresado;
  //     setRut(rutFormateado);
  //   } else {
  //     Swal.fire({
  //       icon: "info",
  //       text: "El RUT ingresado no es válido",
  //       confirmButtonColor: "rgb(158 173 56)",
  //     });
  //     setRut("");
  //   }
  // };
  // settear la fecha de informacion en la que se empieza a buscar la informacion
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  // setter la fecha de termino donde se va a buscar la informacion
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  // no se para que se usa esto
  const handleGenerateReport = () => {
    // Aquí puedes validar y procesar las fechas ingresadas
    // console.log("Fecha de inicio:", startDate);
    // console.log("Fecha de fin:", endDate);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // settear el rut del alumno en las variables de rutAlumno y rutValido
  


  // formatear del rut
const formatearRut = (rut) => {
  rut = rut.replace(/\./g, "").replace("-","").trim();
  if(rut.length <=1){
    return rut;
  }
  const dv= rut.slice(-1);
  const num = rut.slice(0, -1);
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
};

const handleRutAlumnoChange = (event) => {
  const rutIngresado = event.target.value;
  const rutFormateado = formatearRut(rutIngresado);
  setRutAlumno(rutFormateado);
  // llama a una funcion de validacion y actualiza el estado rutValido en concecuencia
};
///////////////////////////////////////////////////////////////////////////////////


 // descargar documunto
  const handleDownloadClick = async () => {
    try {
      const orderBy = 
        // { order: "orderByDate", direction: "asc" },TODO: asi se mandaria a nivel de datos
        { order, direction }
      ;
      // console.log("rut", rutAlumno)
      const response = await axios.post(
        `${baseURL}/metricas/reporte`,
        { orderBy, startDate, endDate, rutFiltro: rutAlumno }, //TODO: aqui agregan los filtros, id de cita etc
        { responseType: "blob" }
      );

      const file = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const fileURL = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "Informe_de_metricas.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      // console.error("Error during file download", error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "70px" }}
      backgroundcolor="red"
    >
      {props.open && (
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          fullWidth
          maxWidth="md"
          scroll={"paper"}
          /*fullScreen={isSmallScreen}*/
        >
          <StyledDialogTitle>
            <StyledIconButton
              aria-label="back"
              onClick={props.handleClose}
              sx={{
                position: "absolute",
                left: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            ></StyledIconButton>
            <StyledIconButton
              aria-label="close"
              onClick={props.handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </StyledIconButton>
          </StyledDialogTitle>
          <StyledDialogContent
            style={{ minWidth: "600px", width: "100%" }}
            theme={theme}
          ></StyledDialogContent>
          <TitleContainer>
            <CalendarTitle variant="h4" component="h2">
              {CALENDAR_TITLE}
            </CalendarTitle>
          </TitleContainer>
          <CalendarParagraph variant="body1" component="p">
            {CALENDAR_PARAGRAPH}
          </CalendarParagraph>
          <br />
          <br />
          <div className="col" style={{ marginLeft: "0", textAlign: "center" }}>
            <div>
              <label htmlFor="startDate">Fecha de inicio:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />
              &nbsp;
            </div>
            &nbsp;
            <div>
              <label htmlFor="endDate">Fecha de fin:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            &nbsp;
            <div>
              <label htmlFor="endDate">Rut Alumno:</label>
              <input
                type="string"
                id="rutAlumno"
                value={rutAlumno}
                onChange={handleRutAlumnoChange}
                placeholder="Opcional"
                className={!rutValido ? "input-invalido": ""}
                // default="opcional"
              />
              {!rutValido && (
                <p className="error-message"> El RUT ingresado no es valido</p>
              )}
            </div>
          </div>
          <br />
          <Select
            labelId="order-label"
            style={{ marginLeft: "200px", marginRight: "200px" }}
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            {sortingOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <br />
          <Select
            labelId="direction-label"
            style={{ marginLeft: "200px", marginRight: "200px" }}
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            {directionOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <br />
          <br />
          <DialogActions>
            {
              <Button
                startIcon={<DescriptionIcon />}
                variant="contained"
                color="success"
                onClick={handleDownloadClick}
              >
                Generar Informe Metricas
              </Button>
            }
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};
const StyledDialogContent = styled(DialogContent)`
  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-width: 710px;
    overflow-x: auto;
  }
`;

export default InformeMetricas;
