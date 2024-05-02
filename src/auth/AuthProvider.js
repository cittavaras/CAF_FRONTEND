import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [alumno, setAlumno] = useState(null);

    const loadSession = () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            // Decode the JWT token to extract user information
            const decodedToken = decodeToken(accessToken);
            if (decodedToken) {
                setAlumno(decodedToken);
            }
        }
    };

    useEffect(() => {
        loadSession();
    }, []);

    const login = async (accessToken, refreshToken) => {
        if (accessToken && refreshToken) {
          try {
            // Store the access token and refresh token in local storage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
      
            // Decode the access token to extract user information
            const decodedToken = decodeToken(accessToken);
            if (decodedToken) {
              setAlumno(decodedToken);
            }
          } catch (error) {
            console.error("Error during login:", error);
          }
        }
      };
      
      

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAlumno(null);
    };

    const isLogged = () => !!alumno;
    const hasRole = (tipoUsuario) => alumno?.tipoUsuario === tipoUsuario;

    const contextValue = {
        alumno,
        isLogged,
        hasRole,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

function decodeToken(accessToken) {
    try {
        const parts = accessToken.split(".");
        if (parts.length !== 3) {
            throw new Error("Invalid token format: missing parts");
        }
        const decodedToken = JSON.parse(atob(parts[1]));
        return decodedToken;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}
