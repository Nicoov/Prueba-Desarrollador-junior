import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
import '../styles/edit.css'

export const Editar = () => {

    const [updateUser, setUpdateUser] = useState({
        nombre: "",
        informacion: ""
    });

    const userId = location.pathname.split("/")[2];
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUpdateUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:4000/usuarios/" + userId, updateUser)
            navigate("/inicio")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-edit">
            <form>
                <label>Ingresa nombre</label>
                <input type="text" placeholder="Ingresa un nuevo nombre" name="nombre" onChange={handleChange}></input>
                <label>Ingresa Informacion</label>
                <input type="text" placeholder="Ingresa nueva informacion" name="informacion" onChange={handleChange}></input>
                <button onClick={handleClick}>Actualizar</button>
            </form>
        </div>

    )
}