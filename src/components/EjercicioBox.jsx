import styled from 'styled-components';
import LoopIcon from '@mui/icons-material/Loop';
import RestoreIcon from '@mui/icons-material/Restore';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';

const EjercicioBox = ({ props }) => {

    return (
        <div
            style={{
                color: 'white',
                margin: '10px'
            }}
        >
            <h3 className="text-center"
                style={{
                    background: 'rgba(200, 223, 50, 0.5)',
                    borderRadius: '5px',
                    padding: '5px',
                    fontSize: '1.2rem',
                }}>{props.ejercicio.nombre || 'Nombre del Ejercicio'}</h3>
            <EjerciciosProps className="d-flex justify-content-center gap-2">
                <div>
                    <AccessAlarmsIcon fontSize='large' />
                    <h4>Series:</h4>
                    <p>{props.ejercicio.series}</p>
                </div>
                <div>
                    {<LoopIcon fontSize='large' />}
                    <br />
                    <h4> Repeticiones:</h4>
                    <p>{props.ejercicio.repeticiones} series.</p>
                </div>
                <div>
                    <FitnessCenterRoundedIcon fontSize='large' />
                    <h4>Peso:</h4>
                    <p>{props.ejercicio.kg} kg.</p>
                </div>
                <div>
                    <SelfImprovementRoundedIcon fontSize='large' />
                    <h4>Descanso:</h4>
                    <p>{props.ejercicio.descanso} min.</p>
                </div>
            </EjerciciosProps>
        </div>
    )
}

const EjerciciosProps = styled.div`
  h4 {
    font-size: .8rem;
  },
  div {
    img {
        max-width: 40px;
        max-height: 40px
    }
    div {
        text-align: center;
        width: 100%;
        font-size: .8rem;
        color: white;
        background-color: rgba(200, 223, 50, 0.5);
        border: 2px solid #C0D437;
        border-radius: 19px;
    }
  }
`;

export default EjercicioBox