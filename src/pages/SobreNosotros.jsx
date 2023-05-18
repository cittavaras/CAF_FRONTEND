import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import Chip from '@mui/material/Chip';
import { textAlign } from '@mui/system';





const SobreNosotros = () => {
    const participantes = [
        {
            nombre: "Javier Díaz Iturra",
            descripcion: "Habilidades técnicas: Desarrollo web con React, Node.js y Express. MongoDB y ODM. Python para scripts y aplicaciones. Git y metodología de control de versiones.Proyectos: Aplicación web con React, Node.js y MongoDB. Automatización con Python y Git. API REST con Node.js, Express y MongoDB.",
            tiempoPractica: "02/03/2023 hasta 19/05/2023",
            linkedin: "https://www.linkedin.com/in/javierdiaziturra/",
            instagram: "https://www.instagram.com/aliensutro/",
            github: "https://github.com/GhostXJD"
        },
        {
            nombre: "Byron Gonzalez Oyarce",
            descripcion: "Habilidades técnicas:Javascript,  React, Node.js, Express, ODM, MongoDB,Git Proyectos: Desarrollo web, creación de API REST, control de versiones con Git.",
            tiempoPractica: "02/03/2023 hasta 19/05/2023",
            linkedin: "https://www.linkedin.com/in/byron-gonzalez-oyarce/",
            instagram: "https://www.instagram.com/byron.yikes/",
            github: "https://github.com/ByronDein"
        },
        {
            nombre: "Camila Morales",
            descripcion: "Habilidades técnicas:Javascript,  React, Node.js, Express, Git Proyectos: Desarrollo web, creación de API REST, control de versiones con Git.",
            tiempoPractica: "02/03/2023 hasta 26/04/2023 ",
            linkedin: "https://www.linkedin.com/in/camila-moralesm",
        },
        {
            nombre: "Diego Peña González",
            descripcion: "Desarrollador junior especializado en React, Nodejs, MySQL, MongoDB y Python. Hábil en el desarrollo de aplicaciones web y servicios backend, apasionado por construir soluciones innovadoras y escalables.",
            tiempoPractica: "26/04/2023 hasta la actualidad",
            linkedin: "https://www.linkedin.com/in/diego-pe%C3%B1a-gonz%C3%A1lez-ba01071ba/",
            instagram: "https://www.instagram.com/__0_3_____",
            github: "https://github.com/penadie"
        },
        {
            nombre: "Giovanni González Herrera",
            descripcion: "Desarrollador en NodeJS, React, manejo en MongoDB, GitHub, Pull Request, diversos Frameworks, trabajo en equipo,  disfruto retos y evito estancamiento",
            tiempoPractica: "26/04/2023 hasta la actualidad",
            linkedin: "https://www.linkedin.com/in/giovanni-gonzalez13719062001/",
            instagram: "https://www.instagram.com/_gyogon/",
            github: "https://github.com/GyoGon"
        },


        // {
        //     nombre: "",
        //     descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        //     tiempoPractica: "Practicante",
        //     linkedin: "https://www.linkedin.com/in/javier-ignacio-ramirez-ramirez-7b1b3a1b3/",
        //     instagram: "https://www.instagram.com/javierignacioramirez/",
        //     github: ""
        // },
        // {
        //     nombre: "",
        //     descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        //     tiempoPractica: "Practicante",
        //     linkedin: "https://www.linkedin.com/in/javier-ignacio-ramirez-ramirez-7b1b3a1b3/",
        //     instagram: "https://www.instagram.com/javierignacioramirez/",
        //     github: ""
        // },

    ]
    return (

        <Container maxWidth="xl" >
            <Grid container spacing={1} justifyContent="center" style={{ minHeight: '80vh', marginTop: 100 }}>
                <Grid item xs={12} >
                    <Typography gutterBottom variant="h2" component="div" style={{ color: "white", textAlign: "center" }}>
                        Sobre Nosotros
                        <Typography gutterBottom variant="h5" component="div">
                            Somos el equipo de desarrollo de CAF y estamos felices de que estés aquí y nos conozcas.
                        </Typography>
                    </Typography>
                </Grid>
                {participantes.map(({ nombre, descripcion, tiempoPractica, linkedin, instagram, github }) => (
                    <Grid xs={12} md={6} lg={4} stlye={{ height: "100%" }}>
                        <Participante nombre={nombre} descripcion={descripcion} tiempoPractica={tiempoPractica} linkedin={linkedin} instagram={instagram} github={github} />
                    </Grid>
                ))
                }
            </Grid>



        </Container>
    )
}

export default SobreNosotros;







const Participante = ({ nombre, descripcion, tiempoPractica, linkedin, instagram, github }) => {
    return (


        <Card sx={{ maxWidth: "90%", minHeight: '250px', display: "flex", flexDirection: "column" }} raised={true}  >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {descripcion}
                </Typography>
                <Typography variant="button" display="block" color="text.secondary">
                    {tiempoPractica}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ mt: "auto", mx: "auto", justifyContent: "space-evenly", width: "100%" }}>
                {linkedin && <Chip color="primary" avatar={<LinkedInIcon />} label="Linkedin" onClick={() => window.location.replace(linkedin)} />}
                {instagram && <Chip style={{ backgroundColor: "#c52661", color: "white" }} avatar={<InstagramIcon style={{ color: "white" }} />} label="Instagram" onClick={() => window.location.replace(instagram)} />}
                {github && <Chip color="secondary" avatar={<GitHubIcon />} label="GitHub" onClick={() => window.location.replace(github)} />}
            </CardActions>
        </Card>
    )
};



