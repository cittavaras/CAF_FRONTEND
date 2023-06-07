import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components";
import useAuth from '../auth/useAuth';
import roles from "../helpers/roles";
import BotonesPerfil from '../components/BotonesPerfil';

const Navigation = () => {

    const navigate = useNavigate();
    const { hasRole, isLogged, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/');
    };

    return (
        <>
            <div className='nav-container'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand">CAF Ivaras</Link>
                        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                            <ul className="navbar-nav show">
                                {!isLogged() && <>
                                </>}
                                {hasRole(roles.alumno) && <>
                                </>}
                                {hasRole(roles.admin) && <>
                                </>}
                                {isLogged() && <>
                                    <LI1 className="nav-item">
                                        <Link className="nav-link" to="/configuracion">Configuracion</Link>
                                    </LI1>
                                    <LI className="nav-item">
                                        <Link className="nav-link" onClick={handleLogout}>Cerrar sesion</Link>
                                    </LI>
                                </>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <BotonesPerfil/>
        </>
    )
}

const LI = styled.li`
    margin-left: auto;
    right:0 ;
`;

const LI1 = styled.li`
    margin-left: auto;
`;

export default Navigation;