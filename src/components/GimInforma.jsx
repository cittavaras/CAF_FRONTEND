import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { red, green, blue } from '@mui/material/colors';


const GimInforma = ({ imagen, texto }) => {

  const RootDiv = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      height: 200,                                
    },
    [theme.breakpoints.up('md')]: {
      height: 200,
    },                                                                      
    [theme.breakpoints.up('lg')]: {
      height: 300,
    },
  }));

  return (
    <>
      <Card className="m-auto" sx={{ maxWidth: 345, marginBottom: '5rem!important' }}>
        <RootDiv>
          <CardMedia
            sx={{ height: "100%" }}
            image={imagen}
            title="gym photo"
          />
        </RootDiv>
          <CardContent>
          {/* <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography> */}
          <Typography variant="body2" color="text.secondary">
            {texto}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

// const GimInforma = ({ imagen, texto }) => {
//   return (
//     <div>
//       <div>
//         <img src={imagen} alt="Imagen del gimnasio" />
//       </div>
//       <div>
//         {texto}
//       </div>
//     </div>
//   );
// };


export default GimInforma;
