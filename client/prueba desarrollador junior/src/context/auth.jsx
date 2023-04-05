import React, { Children, createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


export const authContext = createContext(); //Crear contexto

export const useAuth = () => {
    const contexto = useContext(authContext); // utilizando el hook de useContext
    return (
        contexto // Retorna el uso de authcontext
    )
}

export const Auth = ({ children }) => {

    const [usuario, setUsuario] = useState(null);


    const navigate = useNavigate();



    //la funcion register user funciona con axios para hacer el login llamando a la base de datos en el endpoint /login, donde se trae email y password

    const registerUser = (email, password) => {
        axios.post("http://localhost:4000/login", {
            email: email,
            password: password,
        }).then((response) => {
            if (response.data === "Inicio de sesión exitoso.") {
                navigate("/inicio")
                localStorage.setItem('user', response.config.data)
                setUsuario(response.config.data) //Se almacena el response del login en el estado usuario
            } else {
                alert("Error al iniciar")
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <authContext.Provider
            value={{ registerUser, usuario }}

        >{children}</authContext.Provider>
    )
}