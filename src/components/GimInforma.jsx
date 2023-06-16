import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { red, green, blue } from '@mui/material/colors';

const GimInforma = ({ titulo, imagen, texto }) => {

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
      <Card className="m-auto" sx={{
        maxWidth: 345,
        marginBottom: '5rem!important',
        color: 'white',
        bgcolor: 'rgba(0, 0, 0, 0.46)'
      }}>
        <RootDiv>
          <CardMedia
            sx={{ height: "100%" }}
            image={imagen}
            title="gym photo"
          />
        </RootDiv>
        <Typography variant='h2' style={{padding:'0.7rem'}}>
          {titulo}
        </Typography>
        <CardContent sx={{
          color: "white",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}>
          {/* <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography> */}
          <pre variant="body2" color="white" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
            {texto}
          </pre>
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


// export default GimInforma;
// import React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { styled } from '@mui/material/styles';
// import { red, green, blue } from '@mui/material/colors';

// const GimInforma = ({ titulo, imagen, texto }) => {

//   const RootDiv = styled('div')(({ theme }) => ({
//     [theme.breakpoints.down('md')]: {
//       height: 200,
//     },
//     [theme.breakpoints.up('md')]: {
//       height: 200,
//     },
//     [theme.breakpoints.up('lg')]: {
//       height: 300,
//     },
//   }));

//   return (
//     <>
//       <Card className="m-auto" sx={{
//         maxWidth: 345,
//         marginBottom: '5rem!important',
//         color: 'white',
//         bgcolor: 'rgba(0, 0, 0, 0.46)'
//       }}>
//         <RootDiv>
//           <CardMedia
//             sx={{ height: "100%" }}
//             image={imagen}
//             title="gym photo"
//           />
//         </RootDiv>
//         <Typography variant='h2'>
//           {titulo}
//         </Typography>
//         <CardContent sx={{
//           color: "white",
//           boxShadow: 1,
//           borderRadius: 2,
//           p: 2,
//           minWidth: 300,
//         }}>
//           <pre style={{ whiteSpace: 'pre-wrap' }}>{texto}</pre>
//         </CardContent>
//       </Card>
//     </>
//   );
// }

export default GimInforma;
