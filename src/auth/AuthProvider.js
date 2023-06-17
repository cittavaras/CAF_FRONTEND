import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    //const [alumno, setAlumno ] = useState(null);  //useState({ id: 1, role: roles.alumno });
    const [alumno, setAlumno] = useState(sessionStorage.getItem("alumno_sesion"));

    const loadSession = () => {
        const sesion = sessionStorage.getItem("alumno_sesion");
        if (sesion) {
            setAlumno(JSON.parse(sesion));
        }
    };

    useEffect(() => {
        loadSession();
        //return () => clearTimeout(timer);
    }, []);

    const login = (userCredentials) => {
        if (!!userCredentials) {
            const newAlumno = {
                tipoUsuario: userCredentials?.tipoUsuario,
                nombre: userCredentials?.nombre,
                correo: userCredentials?.correo,
                rut: userCredentials?.rut,
                carrera: userCredentials?.carrera,
                jornada: userCredentials?.jornada,
                id: userCredentials?.id//TODO: revisar login
            }
            setAlumno(newAlumno)
            sessionStorage.setItem("alumno_sesion", JSON.stringify(newAlumno));
        }
    }; 

    const logout = () => {
        sessionStorage.setItem("alumno_sesion", null);
        setAlumno(null);
        loadSession();
      };

    const isLogged = () => !!alumno;
    const hasRole = (tipoUsuario) => alumno?.tipoUsuario === tipoUsuario;

    const contextValue = {
        alumno,
        isLogged,
        hasRole,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}