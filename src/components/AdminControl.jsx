import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Input, InputLabel, FormHelperText } from '@mui/material';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';

const AdminControl = ({ onInfoCargada }) => {

  const [titulo, setTitulo] = useState("CAF IVARAS")
  const [imagen, setImagen] = useState("https://e1.pxfuel.com/desktop-wallpaper/554/24/desktop-wallpaper-best-4-fitness-on-hip-gym-boy.jpg")
  const [texto, setTexto] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
 
  useEffect(() => {
    onInfoCargada({titulo: titulo, imagen: imagen, texto: texto})
  }, [texto, titulo])
  
  const handleCargarImagen = (event) => {
    const imagenCargada = event.target.files[0];
    setImagen(URL.createObjectURL(imagenCargada));
  };


    const handleModificarTexto = (e) => {
    if (e.target.id === 'titulo') {
      setTitulo(e.target.value);
    } else if (e.target.id === 'desc') {
      console.log(e.which)
      if (e.key === 'Enter') {
        e.preventDefault(); // Evita que se agregue una nueva línea en el campo de descripción
        setTexto((prevTexto) => prevTexto + '\n'); // Agrega un salto de línea al texto
      } else {
        setTexto(e.target.value);
      }
    } else {
      // img aquí
    }
  };
  
  // const handleModificarTexto = (e) => {
  //   if(e.target.id === 'titulo') {
  //     console.log(e.target.value)
  //     setTitulo(e.target.value);
  //   } else if(e.target.id === 'desc') {
  //     console.log(e.target.value)
  //     setTexto(e.target.value);
  //   } else {
  //     //img aqui
  //   }
  // };
  const handleGuardarInfo = () => {
    // Aquí puedes realizar cualquier lógica adicional antes de enviar la información al componente padre
    onInfoCargada({ imagen, texto });
  };

  return (
    <div className='d-grid gap-4'>
      <FormControl>
        <TextField id="titulo" value={titulo} label="Titulo" variant="outlined" onChange={handleModificarTexto}/>
      </FormControl>
      <FormControl>
        <TextField type="file" id="img" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <TextField
          id="desc"
          value={texto}
          onChange={handleModificarTexto}
          label="Descripcion"
          variant="outlined"
          multiline={true}
          rows={10}
        />
      </FormControl>
      {/* <form>
        <textarea value={texto} onChange={handleModificarTexto} />k
        <input type="file" accept="image/*" onChange={handleCargarImagen} />
        <button onClick={handleGuardarInfo}>Guardar Información</button>
      </form> */}
    </div>
  );
};

export default AdminControl;
