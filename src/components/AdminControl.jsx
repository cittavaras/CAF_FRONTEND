import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Input, InputLabel, FormHelperText } from '@mui/material';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';

const AdminControl = ({ onInfoCargada }) => {

  const [titulo, setTitulo] = useState("CAF")
  const [imagen, setImagen] = useState("https://e1.pxfuel.com/desktop-wallpaper/554/24/desktop-wallpaper-best-4-fitness-on-hip-gym-boy.jpg")
  const [texto, setTexto] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
  const [file, setFile] = useState();

  useEffect(() => {
    onInfoCargada({ titulo: titulo, imagen: imagen, texto: texto })
  }, [texto, titulo, imagen])

  useEffect(() => {
    if(file) {
      setImagen(URL.createObjectURL(file))
    }
  }, [file])
  
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
        setTexto((prevTexto) => prevTexto, '\n'); // Agrega un salto de línea al texto
      } else {
        setTexto(e.target.value);
      }
    } else {
      // img aquí
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
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
    <div className="m-auto" style={{ maxWidth: '345px'}}>
      <div className='d-grid gap-4'>
        <FormControl >
          <Typography style={{ color: 'white' }}>
            Cambie el titulo del panel
          </Typography>
          <TextField style={{ borderRadius: '4px', color: 'White', fontSize: '1rem' }}
            id="titulo"
            value={titulo}
            label="Titulo"
            variant="standard"
            onChange={handleModificarTexto}
            sx={{
              '& input': {
                color: 'white',
                padding: '0.5rem',
              },
              '& label': {
                color: 'white',
                padding: '0.5rem',
              },
              '& *:after': {
                borderBottom: '2px solid #FCB32E!important'
              },
              '&': {
                fontSize: '1.4rem',
                background: 'rgba(0, 0, 0, 0.46)',
                border: '2px solid rgb(5 16 24)',
              },
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.46)',
              },
              '& label.Mui-focused': {
                color: '#FCB32E',
                borderColor: '#FCB32E',
                background: '',
                borderBottom: 'none!important',
              },
            }}
          />
        </FormControl>
        <FormControl>
          <Typography style={{ color: 'white' }}>
            Cambie la imagen del panel
          </Typography>
          <TextField style={{ borderRadius: '4px', color: 'White', fontSize: '1rem' }}
            sx={{
              '& input': {
                color: 'white',
              },
              '& *:after': {
                borderBottom: '2px solid #FCB32E!important'
              },
              '&': {
                color: 'white',
                fontSize: '1.3rem',
                background: 'rgba(0, 0, 0, 0.46)',
                border: '2px solid rgb(5 16 24)',
              },
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.46)',
                color: 'white',
              },
              '& input.Mui-focused': {
                color: '#FCB32E',
                borderColor: '#FCB32E',
              },
            }}
            type="file" 
            onChange={handleFileChange}
            id="img" 
            aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl className='formulario-informativo' style={{ color: 'White', fontSize: '1rem' }} >
          <Typography style={{ color: 'white' }}>
            Modifique el texto del panel
          </Typography>
          <TextField style={{ borderRadius: '4px', color: 'White', fontSize: '1rem' }}
            id="desc"
            value={texto}
            onChange={handleModificarTexto}
            label="Descripcion"
            variant="standard"
            multiline={true}
            rows={11}
            sx={{
              '& textarea': {
                padding: '0.5rem',
                color: 'white',
              },
              '& label': {
                color: 'white',
                padding: '0.5rem',
              },
              '& *:after': {
                borderBottom: '2px solid #FCB32E!important'
              },
              '&': {
                fontSize: '1.4rem',
                background: 'rgba(0, 0, 0, 0.46)',
                border: '2px solid rgb(5 16 24)',
              },
              '&': {
                fontSize: '1.3rem',
                background: 'rgba(0, 0, 0, 0.46)',
                border: '2px solid rgb(5 16 24)',
              },
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.46)',
                color: 'white',
              },
              '& label.Mui-focused': {
                color: '#FCB32E',
                borderColor: '#FCB32E',
                background: '',
                borderBottom: 'none!important',
              },
            }}
          />
        </FormControl>
        {/* <form>
          <textarea value={texto} onChange={handleModificarTexto} />k
          <input type="file" accept="image/*" onChange={handleCargarImagen} />
          <button onClick={handleGuardarInfo}>Guardar Información</button>
        </form> */}
      </div>
    </div>
  );
};

export default AdminControl;
