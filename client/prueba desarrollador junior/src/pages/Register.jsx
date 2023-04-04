import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/login.css'

export const Register = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [informacion, setInformacion] = useState("");
    const [password, setPassword] = useState("");


    const handleRegister = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/register", {
            nombre: nombre,
            email: email,
            informacion: informacion,
            password: password,
        }).then(response => {
            alert("Usuario creado correctamente")
            console.log(response.data + "usuario anadido correctamente")
        }).catch(error => {
            console.log(error)
        })
    }
  

    return (
        <div className="container">
            <div className="login">
                <form onSubmit={handleRegister}>
                    <label>Ingresa su nombre</label>
                    <input type="text" placeholder="ingrese su nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
                    <label>Email</label>
                    <input type="email" placeholder="ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label>Ingrese informacion</label>
                    <input type="text" placeholder="ingrese informacion" value={informacion} onChange={(e) => setInformacion(e.target.value)}></input>
                    <label>Ingrese una contraseña</label>
                    <input type="password" placeholder="ingrese password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="submit">Registrarse</button>
                    <a href="./">Ya tiene una cuenta? inicie sesion</a>
                </form>
            </div>

        </div>
    )

}