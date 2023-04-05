import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import '../styles/edit.css'

export const Editar = () => {

    const [updateUser, setUpdateUser] = useState({
        nombre: "",
        informacion: ""
    });

    const [errorRegister, setErrorRegister] = useState('')

    const userId = location.pathname.split("/")[2];
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUpdateUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    console.log(updateUser)

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:4000/usuarios/" + userId, updateUser)
            if (updateUser.nombre === "" || updateUser.informacion === "") {
                setErrorRegister("FALTA RELLENAR CAMPOS")
            } else {
                alert("Usuario editado correctamente")
                navigate("/inicio")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-edit">
            <form>
                <label>Edita tu nombre</label>
                <input type="text" placeholder="Ingresa un nuevo nombre" name="nombre" onChange={handleChange}></input>
                <label>Edita tu informacion</label>
                <input type="text" placeholder="Ingresa nueva informacion" name="informacion" onChange={handleChange}></input>
                <button onClick={handleClick}>Actualizar</button>
                {
                    errorRegister !== "" && (
                        <p className="error-message">{errorRegister}</p>
                    )
                }
            </form>
        </div>

    )
}