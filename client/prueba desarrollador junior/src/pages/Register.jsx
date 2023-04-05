import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/login.css'
import { useNavigate } from "react-router-dom";

export const Register = () => {

    //se crean estados para almacenar el registro de usuario como nombre, email, informacion, password

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [informacion, setInformacion] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); // utilizavcion de useNavigate para navegar en el DOM


    // esta funcion utiliza axios para enviar una solicitud post a la 
    //ruta del backend que en este caso es /register con los valores de nombre, email, informacion y password
    const handleRegister = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/register", {
            nombre: nombre,
            email: email,
            informacion: informacion,
            password: password,
        }).then(response => {
            // de igual manera se validan los campos del formulario, si falta algun campo por rellenar muestra una alerta
            if (nombre === " " || email === "" || informacion === "" || password === "") {
                alert("Rellene los campos")
            } else {
                alert("Usuario creado correctamente")
                navigate("/")
                console.log(response.data + "usuario anadido correctamente")
            }
        }).catch(error => {
            console.log(error)
        })
    }

    //finalmente cuando el usuario haga click en en el boton registrarse se 
    //llama a la funcion handleregister donde utiliza los valores actuales para registrar al usuario

    return (
        <div className="container">
            <div className="login">
                <form onSubmit={handleRegister}>
                    <label>Ingresa su nombre</label>
                    <input type="text" placeholder="ingrese su nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
                    <label>Email</label>
                    <input type="email" placeholder="ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label>Ingrese información</label>
                    <input type="text" placeholder="ingrese informacion" value={informacion} onChange={(e) => setInformacion(e.target.value)}></input>
                    <label>Ingrese una contraseña</label>
                    <input type="password" placeholder="ingrese password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="submit">Registrarse</button>
                    <a href="./">¿Ya tiene una cuenta? inicie sesión</a>
                </form>
            </div>

        </div>
    )

}