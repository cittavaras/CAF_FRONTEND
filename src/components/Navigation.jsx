import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import BotonesPerfil from './BotonesPerfil';
import useAuth from '../auth/useAuth';

const settings = ["Perfil", "Cerrar Sesion"];

function ResponsiveAppBar() {

    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { hasRole, isLogged, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleActionButtonClick= (e) => {
        e.preventDefault();
        navigate('/configuracion')

    }
    const handleLogout = (e) => {
        e.preventDefault();
        handleCloseUserMenu();
        logout();
        navigate('/');
    };

  return (
    <> 
        <AppBar position="static" className="bg-dark">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Typography
                variant="h5"
                noWrap
                component="div"
                href=""
                sx={{
                mr: 2,
                display: { xs: "flex", md: "flex", lg: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
                }}
            >
                <Link to="/landing" className="navbar-brand"> CAF </Link>
            </Typography>
            { isLogged() && (
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="" src="/static/images/avatar/2.jpg" />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={setting == 'Cerrar Sesion' ? handleLogout : handleCloseUserMenu || setting == 'Perfil'? handleActionButtonClick: handleActionButtonClick }>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>)}
            </Toolbar>
        </Container>
        </AppBar>
    </>
  );
}
// import { Link, useNavigate } from 'react-router-dom'
// import styled from "styled-components";
// import useAuth from '../auth/useAuth';
// import roles from "../helpers/roles";
// import BotonesPerfil from '../components/BotonesPerfil';
// const Navigation = () => {

//     const navigate = useNavigate();
//     const { hasRole, isLogged, logout } = useAuth();
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleLogout = (e) => {
//         e.preventDefault();
//         logout();
//         navigate('/');
//     };

//     return (
//         <>
//             <div className='nav-container' style={{ position: 'unset', height: '100%' }}>
//                 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//                     <div className="container-fluid">
//                         <Link to='/landing' className="navbar-brand">CAF</Link>
//                         <button className="navbar-toggler" type="button" onClick={toggleMenu}>
//                             <span className="navbar-toggler-icon"></span>
//                         </button>
//                         <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
//                             <ul className="navbar-nav show">
//                                 {!isLogged() && <>
//                                 </>}
//                                 {hasRole(roles.alumno) && <>
//                                 </>}
//                                 {hasRole(roles.admin) && <>
//                                 </>}
//                                 {isLogged() && <>
//                                     <LI1 className="nav-item">
//                                         <Link className="nav-link" to="/configuracion">Configuracion</Link>
//                                     </LI1>
//                                     <LI className="nav-item">
//                                         <Link className="nav-link" onClick={handleLogout}>Cerrar sesion</Link>
//                                     </LI>
//                                 </>}
//                             </ul>
//                         </div>
//                     </div>
//                 </nav>
//             </div>
//             <BotonesPerfil />
//         </>
//     )
// }

// const LI = styled.li`
//     margin-left: auto;
//     right:0 ;
// `;

// const LI1 = styled.li`
//     margin-left: auto;
// `;

export default ResponsiveAppBar;