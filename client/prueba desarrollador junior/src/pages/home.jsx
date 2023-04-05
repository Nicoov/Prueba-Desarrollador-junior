import React, { useEffect, useReducer, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Modal from "react-modal"
import '../styles/home.css'
import axios from "axios"
import Cookies from "js-cookie";


export const Home = () => {

    const [userData, setUserData] = useState([]);
    const [currentData, setCurrentData] = useState();

    const navigate = useNavigate();


    useEffect(() => {
        const res = JSON.parse(localStorage.getItem("user"))
        setCurrentData(res)
    }, [])


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/usuarios`);
                setUserData(res)
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [])


    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:4000/usuarios/" + id)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const logoutUser = () => {
        localStorage.removeItem("user");
        navigate('/')
        window.location.reload();
    }



    const currentUser = userData?.data?.find((e) => e?.email === currentData?.email)
 


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
                                        userData?.data?.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{e?.nombre}</td>
                                                        <td>{e?.email}</td>
                                                        <td>{e?.informacion}</td>
                                                        <button onClick={() => handleDelete(e?.id)}>Eliminar</button>
                                                        <button><Link to={`/editar/${e?.id}`}>Editar</Link></button>
                                                    </tr>
                                                </>

                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
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
                                        userData?.data?.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{e?.nombre}</td>
                                                        <td>{e?.email}</td>
                                                        <td>{e?.informacion}</td>
                                                        {currentUser?.id === e?.id && <button> <Link to={`/editar/${e?.id}`}>Editar</Link></button>}
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

            <button onClick={logoutUser}>SALIR</button>
        </>

    )



}

const customModal = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        border: "none",
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.75)",
    },
};
