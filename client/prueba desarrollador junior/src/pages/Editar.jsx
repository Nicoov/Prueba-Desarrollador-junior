import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import '../styles/edit.css'

export const Editar = () => {


    //Estado que permite actualizar nombre e informacion 
    const [updateUser, setUpdateUser] = useState({
        nombre: "",
        informacion: ""
    });

    //Estado para almacenar loe errores 
    const [errorRegister, setErrorRegister] = useState('')


    //con location.pathname.split permite obtener el id del usuario
    const userId = location.pathname.split("/")[2];
    const navigate = useNavigate();

    //HandleChange permite controlar los input cuando el usuario escriba
    const handleChange = (e) => {
        setUpdateUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //HandleClick se activa cuando el usuario le da al boton editar
    //Esta funcion utiliza axios para enviar una solicitud put a la api utilizando los nuevos valoraes userId y updateUser
    // si algunos de los valores nombre o informacion estan vacios se establecen en el estado de setErrorRegister para mostrar un mensaje de error.
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