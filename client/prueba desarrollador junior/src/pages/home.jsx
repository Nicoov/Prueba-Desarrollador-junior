import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal"
import '../styles/home.css'
import axios from "axios"


export const Home = () => {

    const [userData, setUserData] = useState([]);



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


  


    console.log(userData.data)





    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:4000/usuarios/" + id)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>

            <h1>Bienvenido</h1>
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
