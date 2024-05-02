import React, { useState } from "react";

import { Dialog, 
    DialogContent, 
    Container, 
    DialogActions, 
    Button,
    Select,
    MenuItem,
    DialogTitle,
    Typography, 
    Box,
    IconButton } from  "@mui/material";

import axios from 'axios'; import useAxiosInterceptors from '../auth/axiosResponse';
import { useEffect } from 'react';
import styled from "styled-components";
import { useTheme } from "@mui/material/styles"; //TODO

import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import baseURL from '../helpers/rutaBase';

const sortingOptions = [
  { value: "orderByRut", label: "Ordenar por RUT" },
  { value: "orderByDate", label: "Ordenar por Fecha" }
];

const directionOptions = [
  { value: "asc", label: "Ascendente" },
  { value: "desc", label: "Descendente" }
];
const CALENDAR_TITLE = "Descargar hoja de asistencia";
const CALENDAR_PARAGRAPH = "Seleccione las fechas que necesite descargar y el orden de la hoja de asistencia";

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
const InformeAsistencia = (props) => {
  const theme = useTheme();
  const [order, setOrder] = useState(sortingOptions[0].value);
  const [direction, setDirection] = useState(directionOptions[0].value);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
useAxiosInterceptors();
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleGenerateReport = () => {
    // Aquí puedes validar y procesar las fechas ingresadas
    // console.log("Fecha de inicio:", startDate);
    // console.log("Fecha de fin:", endDate);
  };
  const handleDownloadClick = async () => {
    try {
      const orderBy = 
        // { order: "orderByDate", direction: "asc" },TODO: asi se mandaria a nivel de datos
        { order, direction }
      ;

      const response = await axios.post(`${baseURL}/reservas/reporte`,
        { orderBy, startDate,endDate }, //TODO: aqui agregan los filtros, id de cita etc
        { responseType: "blob",headers: {
          'Authorization': accessToken // Include the JWT token in the Authorization header
      },
       }
      );

      // Create a Blob from the PDF Stream
      const file = new Blob([response.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      // Build a URL from the file
      const fileURL = URL.createObjectURL(file);

      // Open the URL on new Window
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "Informe_de_asistencia.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error during file download", error);
    }

  };

  return (
    <Container maxWidth="lg"
      style={{ marginTop: '70px' }}
      backgroundcolor="red"
    >
      {props.open && <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="md" scroll={'paper'} 
       /*fullScreen={isSmallScreen}*/>
        <StyledDialogTitle  >
          <StyledIconButton
            aria-label="back"
            onClick={props.handleClose}
            sx={{
              position: 'absolute',
              left: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            
          </StyledIconButton>
          <StyledIconButton
            aria-label="close"
            onClick={props.handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </StyledIconButton>
        </StyledDialogTitle>
        <StyledDialogContent style={{ minWidth: '500px', width: '100%' }} theme={theme}>
        </StyledDialogContent>
            <TitleContainer>
            <CalendarTitle variant="h4" component="h2">{CALENDAR_TITLE}</CalendarTitle>
          </TitleContainer>
          <CalendarParagraph variant="body1" component="p">{CALENDAR_PARAGRAPH}</CalendarParagraph>
          <br />
          <br />
        <div style={{ marginLeft: '202px'}}>
            <label htmlFor="startDate">Fecha de inicio:</label>
            <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
            />
            &nbsp;
            &nbsp;
        
            <label htmlFor="endDate">Fecha de fin:</label>
            <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
            />

        </div>
        <br />
          <Select 
            labelId="order-label"
            style={{ marginLeft: '200px', marginRight: '200px' }}
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
            style={{ marginLeft: '200px', marginRight: '200px' }}
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
          {<Button
          startIcon={<DescriptionIcon />}
          variant="contained"
          color= "success"
          onClick={handleDownloadClick}
        >
          Generar hoja de asistencia
        </Button>
          }
        </DialogActions>
      </Dialog>}
    </Container>
  );
};
const StyledDialogContent = styled(DialogContent)`
  ${({ theme }) => theme.breakpoints.down("sm")} {
    min-width: 710px;
    overflow-x: auto;
  }
`;

export default InformeAsistencia;
