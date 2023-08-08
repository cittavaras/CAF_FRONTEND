import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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

const BoxEjerciciosForm = () => {
  const [ejercicios, setEjercicios] = useState(
    [{
      "id": 1,
      "nombre": "",
      "repeticiones": 10,
      "series": 3,
      "peso": 0,
      "descanso": 30,
    }]
    );
  const [selectedExercises, setSelectedExercises] = useState();
  const [newExerciseAdded, setNewExerciseAdded] = useState(false);
  const [isDisabled, setIsDisabled] = useState();
  const getEjercicios = [
    { id: 1, nombre: "Flexiones de brazo apoyo" },
    { id: 2, nombre: "Rodillas" },
    { id: 3, nombre: "Elevaciones de hombro" },
    { id: 4, nombre: "Frontales con disco" },
    { id: 5, nombre: "Dorsalera" },
    { id: 6, nombre: "Remo polea" },
    { id: 7, nombre: "Pall off press" },
    { id: 8, nombre: "Prensa 45°" },
    { id: 9, nombre: "Extensión de rodilla" },
    { id: 10, nombre: "Máquina Cuadríceps" },
    { id: 11, nombre: "Puente isquiotibiales" },
    { id: 12, nombre: "Press banca" },
    { id: 13, nombre: "Press de hombros" },
    { id: 14, nombre: "Mancuernas" },
    { id: 15, nombre: "Dorsalera polea" },
    { id: 16, nombre: "Remo mancuernas" },
    { id: 17, nombre: "Estocadas" },
    { id: 18, nombre: "Peso muerto Rumano" },
    { id: 19, nombre: "Búlgaras" },
    { id: 20, nombre: "Hip Thrust" },
    { id: 21, nombre: "Elevaciones de talones" },
    { id: 22, nombre: "Smith" },
    { id: 23, nombre: "Crunch Abdominal" },
    { id: 24, nombre: "Puente isquiotibiales" }
  ];

  const choiceArray = document.querySelectorAll(".choice")
  const deleteIcon = document.querySelectorAll(".delete-icon")
  const selectCardBody = document.querySelector(".select-card-body")

  const events = ['click','keypress'];
  
  console.log('selectCardBody', selectCardBody);
  choiceArray.forEach((card) => {
    events.forEach((evt) => {
      card.addEventListener(evt, (e) => {
        choiceArray.forEach((element) => {
          // if(e.key == 'Enter') {
            element.classList.remove("expand", "unset")
            element.classList.add('small')
          // }
        })
        if (e.target != deleteIcon[0]) {
          card.classList.add('expand')
          card.classList.remove("small")
        }
        // setIsDisabled(false)
      });
    });
  });

  const handleExerciseChange = (value) => {
    setSelectedExercises(value);
  };

  const handleExerciseRepeat = (value) => {
    console.log(value)
  }

  const handleExerciseWeight = (value) => {
    console.log(value)
  }

  // handleAddExercise with incremental id prevent duplicate id
  const handleAddExercise = () => {
    const newId = ejercicios[ejercicios.length - 1].id + 1
    const newEjercicios = [...ejercicios, { id: newId, nombre: "Flexiones de brazo apoyo", repeticiones: 10, series: 3, peso: 0, descanso: 30 }]
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
    const newEjercicios = ejercicios.filter((ejercicio) => ejercicio.id !== id)
    setEjercicios(newEjercicios)
  }
  
  useEffect(() => {
    console.log(ejercicios)
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
              <div className={`container horizontal-accordion mb-2 exercise-card ${ejercicio.id === newExerciseAdded ? 'added' : ''}`}>
                <div className="card choice bg text-white mx-1 expand select-card">
                  <div className="card-body select-card-body w-100">
                    <FormControl fullWidth sx={{ width: '100%'}}>
                      <InputLabel>Ejercicio</InputLabel>
                      <Select
                        name={`select-${ejercicio.id}`}
                        type="text"
                        value={selectedExercises}
                        label="Ejercicio"
                        onChange={handleExerciseChange}
                        style={{ width: '100%' }}
                      >
                        {getEjercicios.map((ejercicio) => (
                          <MenuItem key={ejercicio.id} value={ejercicio.nombre}>
                            {ejercicio.nombre}
                          </MenuItem>
                        ))}
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
                      type="number"
                      label="repeticiones"
                      variant="outlined"
                      fullWidth
                      placeholder="Ej: 6"
                      onChange={(e) => {handleExerciseRepeat(e.target.value)}}
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
                      type="number"
                      label="kg"
                      variant="outlined"
                      fullWidth
                      placeholder="Ej: 6"
                      onChange={(e) => {handleExerciseWeight(e.target.value)}}
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
                      type="number"
                      label="series"
                      variant="outlined"
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
                      type="number"
                      label="descanso"
                      variant="outlined"
                      fullWidth
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
                <button className="card choice mx-1 delete-icon small" onClick={() => handleDeleteExercise(ejercicio.id)}>
                  <DeleteIcon
                    disabled
                    fontSize="medium"
                  />
                </button>
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