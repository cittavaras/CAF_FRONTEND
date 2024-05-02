import { Alert, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import LoopIcon from '@mui/icons-material/Loop';
import RestoreIcon from '@mui/icons-material/Restore';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Swal from 'sweetalert2'
import axios from 'axios'; import useAxiosInterceptors from '../auth/axiosResponse';
import baseURL from '../helpers/rutaBase';

const BoxEjerciciosForm = ({ onHandleEjercicios, ejerciciosFromGet }) => {
  const [ejercicios, setEjercicios] = useState(
    [{
      "numEjer": 1,
      "nombre": "",
      "repeticiones": 0,
      "series": 0,
      "peso": 0,
      "descanso": 0,
    }]
    );
  const [ejerciciosSelect, setEjerciciosSelect] = useState()
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
useAxiosInterceptors();
  useEffect(() => {
    onHandleEjercicios(ejercicios)
    // set states onInfoCargada
  }, [ejercicios])

  useEffect(() => {
    if (ejerciciosFromGet) {
      setEjercicios(ejerciciosFromGet)
    }
  }, [ejerciciosFromGet])
  useEffect(() => {
    onHandleEjercicios(ejercicios);
    // set states onInfoCargada
  }, [ejercicios]);

  async function fetchEjercicios() {
    try {
      const response = await axios.get(baseURL + '/ejercicios',{
        headers: {
            'Authorization': accessToken // Include the JWT token in the Authorization header
        },
        
    });
      setEjerciciosSelect(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    // Cargar ejercicios disponibles desde el backend
    fetchEjercicios();
  }, []);
  
  useEffect(() => {
    // Cargar ejercicios disponibles desde el backend
    // console.log('ejerciciosSelect', ejerciciosSelect)
    
  }, [ejerciciosSelect]);

  const [selectedExercises, setSelectedExercises] = useState();
  const [newExerciseAdded, setNewExerciseAdded] = useState(false);
  const [isDisabled, setIsDisabled] = useState();

  const choiceArray = document.querySelectorAll(".choice")
  const deleteIcon = document.querySelectorAll(".delete-icon")
  const selectCardBody = document.querySelector(".select-card-body")

  const events = ['click','keypress'];
  
  // console.log('selectCardBody', selectCardBody);
  // choiceArray.forEach((card) => {
  //   events.forEach((evt) => {
  //     card.addEventListener(evt, (e) => {
  //       // choiceArray.forEach((element) => {
  //       //   // if(e.key == 'Enter') {
  //       //     element.classList.remove("expand", "unset")
  //       //     element.classList.add('small')
  //       //   // }
  //       // })
  //       if (!e.target.classList) {
  //         choiceArray.forEach((element) => {
  //           element.classList.remove("expand");
  //           element.classList.add('small');
  //         });
  
  //         card.classList.add('expand');
  //         card.classList.remove("small");
  //       }
  //       // setIsDisabled(false)
  //     });
  //   });
  // });
  useEffect(() => {
    const choiceArray = document.querySelectorAll(".choice");
  
    const handleClick = (e) => {
      e.preventDefault();
      // console.log(e.target.classList)
    
      choiceArray.forEach((element) => {
        element.classList.remove("expand");
        element.classList.add('small');
      });

      e.currentTarget.classList.add('expand');
      e.currentTarget.classList.remove("small");
    };
  
    choiceArray.forEach((card) => {
      card.addEventListener("click", handleClick);
      // card.addEventListener("keypress", handleClick);
    });
  
    return () => {
      choiceArray.forEach((card) => {
        card.removeEventListener("click", handleClick);
        // card.removeEventListener("keypress", handleClick);
      });
    };

  }, [ejercicios.length]);
  //help me with a reusable function to change the diferrents the values of the selected exercise using object Assing

  // I need to prevent the user to select the same exercise twice

  const reusableChangeFunction = (value, objPropToChange) => {
    const newEjercicios = ejercicios.map((ejercicio) => {
      // when value is a number parseInt it
      let valueParsed;
      // console.log('objPropToChange', objPropToChange)
      if (ejercicio.numEjer === parseInt(value.target.name.split('-')[1])) {
        //convert value to number if it is a number
        if(objPropToChange != "nombre") { 
          valueParsed = parseInt(value.target.value)
        } else {
          valueParsed = value.target.value
        }
        return { ...ejercicio, [objPropToChange]: valueParsed }
      }
      return ejercicio
    })
    setEjercicios(newEjercicios)
  }

  const handleExerciseChange = (value) => {
    const selectedExerciseName = value.target.value;
    const isExerciseSelected = ejercicios.some(
      (ejercicio) => ejercicio.nombre === selectedExerciseName
    );

    if (!isExerciseSelected) {
      reusableChangeFunction(value, "nombre");
    } else {
      // Reset the select input value
      
      // Display an alert to the user
      // setTimeout(() => {
      //   alert("You have already selected this exercise.");
      // }, 1000);
      setSelectedExercises("")
      value.target.value = "";
    }
  };
  const handleExerciseRepeat = (value, numEjer) => {
    const inputValue = value.target.value;
    const repeticiones = inputValue === ''?'' : parseInt(inputValue);
    if (inputValue !== '' && (repeticiones <0 || repeticiones> 60)){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes hacer mas de 60 repeticiones',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      return;
    }
    const newEjercicios = ejercicios.map((ejercicio)=> {
      if (ejercicio.numEjer===numEjer){
        const repeticiones = value.target.value=== '' ? '' :parseInt(value.target.value);
        return {...ejercicio, repeticiones}
      }
      return ejercicio;
    });
    reusableChangeFunction(value, 'repeticiones')
  }
  const handleExerciseWeight = (value, numEjer) => {
    const inputValue = value.target.value;
    const peso = inputValue === ''?'' : parseFloat(inputValue);
    if (inputValue !== '' && (peso <0 || peso> 500)){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes levantar mas de 500 kg',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      return;
    }
    const newEjercicios = ejercicios.map((ejercicio)=> {
      if (ejercicio.numEjer===numEjer){
        const peso = value.target.value=== '' ? '' :parseFloat(value.target.value);
        return {...ejercicio, peso}
      }
      return ejercicio;
    });
    reusableChangeFunction(value, 'peso')
  }
  const handleExerciseSeries = (value, numEjer) => {
    const inputValue = value.target.value;
    const series = inputValue === ''?'' : parseInt(inputValue);
    if (inputValue !== '' && (series <= 0 || series> 50)){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes hacer mas de 50 series',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      return;
    }
    const newEjercicios = ejercicios.map((ejercicio)=> {
      if (ejercicio.numEjer===numEjer){
        const repeticiones = value.target.value=== '' ? '' :parseInt(value.target.value);
        return {...ejercicio, series}
      }
      return ejercicio;
    });
    reusableChangeFunction(value, 'series')
  }
  const handleExerciseRest = (value, numEjer) => {
    const inputValue = value.target.value;
    const descansos = inputValue === ''?'' : parseFloat(inputValue);
    if (inputValue !== '' && (descansos <0 || descansos> 30)){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes descansar mas de 30 minutos',
        confirmButtonColor: 'rgb(158 173 56)',
      });
      return;
    }
    const newEjercicios = ejercicios.map((ejercicio)=> {
      if (ejercicio.numEjer===numEjer){
        const descansos = value.target.value=== '' ? '' :parseFloat(value.target.value);
        return {...ejercicio, descansos}
      }
      return ejercicio;
    });
    reusableChangeFunction(value, 'descanso')
  }
  // const handleExerciseRepeat = (value) => {
    //   reusableChangeFunction(value, 'repeticiones')
    // }
    // const handleExerciseWeight = (value) => {
      //   reusableChangeFunction(value, 'peso')
      // }
      // const handleExerciseSeries = (value) => {
  //   reusableChangeFunction(value, 'series')
  // }
  // const  handleExerciseRest = (value) => {
  //   reusableChangeFunction(value, 'descanso')
  // }

  // handleAddExercise with incremental id prevent duplicate id
  const handleAddExercise = () => {
    
    // no agregar mas si existen 10 ejercicios
    if (ejercicios.length === 10) {
      return
    }

    const newId = ejercicios[ejercicios.length - 1].numEjer + 1
    const newEjercicios = [...ejercicios, { numEjer: newId, nombre: "Flexiones de brazo apoyo", repeticiones: 0, series: 0, peso: 0, descanso: 0}]
    setEjercicios(newEjercicios)

    if (ejercicios.length > 0) {
      setNewExerciseAdded(newId);
      setTimeout(() => {
        setNewExerciseAdded(null);
      }, 100); 

    }

  }
  //handleDeleteExercise with id 
  const handleDeleteExercise = (id) => {
    //prevent delete all exercises

    if (ejercicios.length === 1) {
      return
    }
    const newEjercicios = ejercicios.filter((ejercicio) => ejercicio.numEjer !== id)

    const inputSelectors = [
      `[name="repeticionesEjercicio-${id}"]`,
      `[name="pesoEjercicio-${id}"]`,
      `[name="seriesEjercicio-${id}"]`,
      `[name="descansoEjercicio-${id}"]`,
    ];

    inputSelectors.forEach((selector) => {
      const input = document.querySelector(selector);
      if (input) {
        input.value = "";
      }
    });

    setEjercicios(newEjercicios)
  }

  useEffect(() => {
    // console.log(ejercicios)
  }, [ejercicios])
    
  return (
    <div>
      <h2 className="text-center text-white">Ejercicios</h2>
      {/* <div style={{ background: '#ddd', padding: '0.75rem', margin: '0.75rem', borderRadius: '3px'}}>
        <FormControl fullWidth sx={{ background: 'white' }}>
          <InputLabel>Ejercicio</InputLabel>
          <Select
            name="rutina"
            type="text"
            value={selectedExercises}
            label="Ejercicio"
            onChange={handleExerciseChange}
            style={{ width: '100%' }}
          >
            {ejercicios.map((ejercicio) => (
              <MenuItem key={ejercicio.id} value={ejercicio.nombre}>
                {ejercicio.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div> */}
      <section className="p-2 w-100 position-static">
        {
          ejercicios.map((ejercicio, index) => (
            <>
              {/* { console.log(ejercicio.numEjer, ejercicio._id) } */}
              <div className={`container horizontal-accordion mb-2 exercise-card ${ejercicio.numEjer === newExerciseAdded ? 'added' : ''}`}>
                <div className="card choice bg text-white mx-1 expand select-card">
                  <div className="card-body select-card-body w-100">
                    <FormControl fullWidth sx={{ width: '100%'}}>
                      <InputLabel>Ejercicio</InputLabel>
                      <Select
                        name={`select-${ejercicio.numEjer}`}
                        type="text"
                        value={ejercicio.nombre}
                        label="Ejercicio"
                        onChange={handleExerciseChange}
                        style={{ width: '100%' }}
                      >
                        {/* hola */}
                        { ejerciciosSelect ? ejerciciosSelect.map((ejercicio) => (
                          <MenuItem key={ejercicio.numEjer} value={ejercicio.nombre}>
                            {ejercicio.nombre}
                          </MenuItem>
                        )): null}
                      </Select>
                    </FormControl>
                  </div>
                  <SportsGymnasticsIcon fontSize='large' sx={{ 
                      color: 'black',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      margin: 'auto',
                  }}/>
                </div>
                <div className="card choice bg text-dark mx-1 small">
                  <div className="card-body w-100">
                    <TextField
                      name={`repeticionesEjercicio-${ejercicio.numEjer}`}
                      type="number"
                      label="repeticiones"
                      variant="outlined"
                      // defaultValue={ejercicio.repeticiones}
                      value={ejercicio.repeticiones===''?'':ejercicio.repeticiones}
                      fullWidth
                      placeholder="Ej: 6"
                      onChange={(value)=>handleExerciseRepeat(value, ejercicio.numEjer)}
                    />
                  </div>
                  <RestoreIcon fontSize='large' sx={{ 
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      margin: 'auto',
                  }}/>
                </div>
                <div className="card choice bg text-white mx-1 small">
                  <div className="card-body w-100">
                    <TextField
                      name={`pesoEjercicio-${ejercicio.numEjer}`}
                      type="number"
                      label="kg"
                      value={ejercicio.peso===''?'':ejercicio.peso}
                      variant="outlined"
                      fullWidth
                      placeholder="Ej: 6"
                      onChange={(value)=>handleExerciseWeight(value, ejercicio.peso)}
                    />
                  </div>
                  <FitnessCenterRoundedIcon fontSize='large' sx={{
                      color: 'black', 
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      margin: 'auto',
                  }}/>
                </div>
                <div className="card choice bg text-dark mx-1 small">
                  <div className="card-body w-100">
                    <TextField
                      name={`seriesEjercicio-${ejercicio.numEjer}`}
                      type="number"
                      label="series"
                      value={ejercicio.series===''?'':ejercicio.series}
                      variant="outlined"
                      onChange={(value)=>handleExerciseSeries(value, ejercicio.series)}
                      fullWidth
                      placeholder="Ej: 6"
                    />
                  </div>
                  <LoopIcon fontSize='large' sx={{
                      color: 'black', 
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      margin: 'auto',
                  }}/>
                </div>
                <div className="card choice bg text-white mx-1 small">
                  <div className="card-body w-100">
                    <TextField
                      name={`descansoEjercicio-${ejercicio.numEjer}`}
                      type="number"
                      label="descanso"
                      value={ejercicio.descanso===''?'':ejercicio.descanso}
                      variant="outlined"
                      fullWidth
                      onChange={(value)=>handleExerciseRest(value, ejercicio.descanso)}
                      placeholder="Ej: 6"
                    />
                  </div>
                  <SelfImprovementRoundedIcon fontSize='large' sx={{
                      color: 'black', 
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      margin: 'auto',
                  }}/>
                </div>
                <div className="mx-1 delete-icon small" onClick={() => handleDeleteExercise(ejercicio.numEjer)}>
                  <DeleteIcon
                    disabled
                    fontSize="medium"
                  />
                </div>
              </div>
            </>
          ))
        }
      </section>
      <div class="hr-droid">
        <div class="hr-line green"></div>
          {/* <AddIcon></AddIcon> */}
          <div>
            <AddCircleOutlineIcon onClick={handleAddExercise} sx={{ color: '#b3b1ad', fontSize: '1.5rem', position: 'relative'}}></AddCircleOutlineIcon>
          </div>
        <div class="hr-line purple"></div>
      </div>
    </div>
  )
}

export default BoxEjerciciosForm