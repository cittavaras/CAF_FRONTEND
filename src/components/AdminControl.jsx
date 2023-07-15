import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Input, InputLabel, FormHelperText } from '@mui/material';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';

const AdminControl = ({ onInfoCargada, infoCargada}) => {

  const [titulo, setTitulo] = useState(infoCargada.titulo)
  const [imagen, setImagen] = useState()
  const [texto, setTexto] = useState(infoCargada.descripcion)

  useEffect(() => {
    onInfoCargada({ titulo: titulo, imagenBase64: imagen, descripcion: texto })
    // set states onInfoCargada
  }, [titulo ,imagen, texto ])
  
  useEffect(() => {
    //console.log('IMAGEN', imagen);
  }, [imagen])

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

  const convertToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  const handleFileChange = async (e) => {
    if (e.target.files) {

      let imagenCargada = e.target.files[0];

      if(imagenCargada){
        const blob = new Blob([imagenCargada], { type: "image/webp"});
        imagenCargada = await convertToBase64(blob);
        setImagen(imagenCargada);
      }

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
    // onInfoCargada({ imagen, texto });
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
