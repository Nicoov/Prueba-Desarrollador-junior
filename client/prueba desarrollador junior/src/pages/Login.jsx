import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";


import '../styles/login.css'


export const Login = () => {

    const { registerUser } = useAuth();  // se importa la funcion useauth para utilizar el contexto de autenticacion del usuario

    //se declaran 2 estados email y usuarios 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    //handlelogin se llama en el formulario de inicio de sesion donde obtiene los valores actuales de email y password 
    const handleLogin = async (e) => {
        e.preventDefault();
        await registerUser(email, password);
    }


    return (
        <div className="container">
            <div className="login">
                <form onSubmit={handleLogin}>
                    <label>Correo</label>
                    <input type="email" placeholder="ingrese su correo" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                    <label>Contraseña</label>
                    <input type="password" placeholder="Ingrese su contrasena" value={password} autoComplete="on" onChange={(e) => { setPassword(e.target.value) }}></input>
                    <button type="submit">Ingresar</button>
                </form>
                <a href="./registro">Regístrate aquí </a>
            </div>

        </div>
    )
}