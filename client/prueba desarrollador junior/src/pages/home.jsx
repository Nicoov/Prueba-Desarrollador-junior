import React, { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import '../styles/home.css'
import axios from "axios"


export const Home = () => {

    const [userData, setUserData] = useState([]);
    const [currentData, setCurrentData] = useState();

    const navigate = useNavigate();

    // Este useeffect sirve para obtener cargar los datos del 
    // usuario conectado utilizando localstorage y se guardan en el estado currendata
    useEffect(() => {
        const res = JSON.parse(localStorage.getItem("user"))
        setCurrentData(res)
    }, [])


    //Este useeffect permite cargar los datos de los usuarios con axios desde /usuarios y se almacenan en userdata  
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/usuarios`);
                setUserData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [])


   
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:4000/usuarios/${id}`);
          setUserData(userData.filter((user) => user.id !== id)); // Actualizar el estado después de eliminar el usuario
        } catch (error) {
          console.log(error);
        }
      };

    //Esta funcion cierra la sesion del usuario actual, eliminando el objeto de localstorage. 
    const logoutUser = () => {
        localStorage.removeItem("user");
        navigate("/");
        setCurrentData(null); // Actualizar el estado para eliminar la información del usuario actual
      };

      
    //Aca busco al usuario actual del array, si el usuario existe se almacena en el currentUser.
    const currentUser = userData?.find((e) => e?.email === currentData?.email)


    //Con currentUser hago una validacion si el usuario conectado es administrador puede eliminar e editar a todo y si es usuario normal solo se puede editar 
    return (
        <>
            <h2>Bienvenido: {currentUser?.email}</h2>
            {
                currentUser?.tipo_usuario === "administrador" ? (
                    <div className="usuarios-container">
                        <div className="usuarios">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Informacion</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userData?.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{e?.nombre}</td>
                                                        <td>{e?.email}</td>
                                                        <td>{e?.informacion}</td>
                                                        <button onClick={() => handleDelete(e?.id)}>Eliminar</button>
                                                        <Link to={`/editar/${e?.id}`}><button className="button-editar">Editar</button></Link>
                                                    </tr >
                                                </>

                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div >
                ) : (
                    <div className="usuarios-container">
                        <div className="usuarios">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Informacion</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userData?.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{e?.nombre}</td>
                                                        <td>{e?.email}</td>
                                                        <td>{e?.informacion}</td>
                                                        {currentUser?.id === e?.id && <Link to={`/editar/${e?.id}`}><button className="button-editar">Editar</button></Link>}
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
            <button className="button-home" onClick={logoutUser}>Salir</button>
        </>
    )

}


