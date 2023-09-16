import React from 'react'
import { useState } from 'react';
import baseURL from '../helpers/rutaBase';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function GestionarBloques() {
    const [formData, setFormData] = useState({horaIni: "",horaFin: "", cantidadUsuarios: 20, dia: "Lunes", desactivado: false});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${baseURL}/sesiones`, formData).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Bloque creado con exito',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.error,
            })
        });
        //alert(`horaIni: ${formData.horaIni}, horaFin: ${formData.horaFin}, cantidadUsuarios: ${formData.cantidadUsuarios}, dia: ${formData.dia}, desactivado: ${formData.desactivado}`);
    }
    useEffect(() => {
        console.log(formData);
    }, [formData])

  return (
    <main className="rounded p-4 m-auto d-flex justify-content-center" style={{  width: '80%'}}>  
        {/* Form with 5 inputs */}
        <section className="rounded" style={{ background: '#ffffffbd', padding: '26px'}}>
            <h1 style={{ fontSize: '1.4rem' }}> Crear nuevo bloque </h1>
            <form className="mt-4 d-flex flex-column gap-2" onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Dia</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        name='dia'
                        id="demo-simple-select"
                        value={formData.dia}
                        label="Dia"
                        onChange={handleChange}
                    >
                        <MenuItem value={'Lunes'}>Lunes</MenuItem>
                        <MenuItem value={'Martes'}>Martes</MenuItem>
                        <MenuItem value={'Miercoles'}>Miercoles</MenuItem>
                        <MenuItem value={'Jueves'}>Jueves</MenuItem>
                        <MenuItem value={'Viernes'}>Viernes</MenuItem>
                        <MenuItem value={'Sabado'}>Sabado</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name='cantidadUsuarios'
                        type="number"
                        defaultValue={formData.cantidadUsuarios}
                        focused={formData.cantidadUsuarios  ? true : false}
                        onChange={handleChange}
                        label="Cantidad de usuarios"
                        variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name='horaIni'
                        type="text"
                        label="Hora inicio"
                        variant="outlined"
                        placeholder='10:00'
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name='horaFin'
                        type="text"
                        label="Hora fin"
                        placeholder='10:00'
                        variant="outlined"
                        onChange={handleChange}
                    />
                </FormControl>
                {/* <FormControl fullWidth>
                    <TextField
                        type="text"
                        label="Attribute"
                        variant="outlined"
                    />
                </FormControl> */}
                {/* <TextField
                    type="text"
                    label="goal stage"
                    variant="outlined"
                />
                <br />
                <TextField
                    type="number"
                    label="job id"
                    variant="outlined"
                />
                <br />
                <TextField
                    type="text"
                    label="job region"
                    variant="outlined"
                /> */}
                <Button type="submit" variant="contained">
                    save
                </Button>
            </form>
        </section>
    </main>
  )
}

export default GestionarBloques