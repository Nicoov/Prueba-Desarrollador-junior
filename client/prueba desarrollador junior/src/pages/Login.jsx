import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios"

import '../styles/login.css'


export const Login = () => {

    const { registerUser } = useAuth();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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
                <a href="./registro">Registrate aqui</a>
            </div>

        </div>
    )
}