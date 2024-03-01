import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/logIn.css";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
    // Estados para tener inputs controlados
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // URL para hacer la solicitud
    const url = process.env.REACT_ENV_URL;
    const { store, actions } = useContext(Context);

    // Variable para declarar el useNavigate
    const navigate = useNavigate();

    // Estados para los estilos de los alerts
    const [display, setDisplay] = useState({ display: "none" });
    const [displayDanger, setDisplayDanger] = useState({ display: "none" });

    // Objeto para enviar como prop a la funcion handleLogIn
    const data = {
        email: email,
        password: password
    };

    const handleLogIn = async (requestData) => {
        try {
            const response = await fetch(url + "/token", {
                method: "POST",
                body: JSON.stringify(requestData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 201) {
                actions.setIsLoggedIn();
                actions.setUserTypeToUsuario();
            } else {
                setDisplayDanger({ display: "flex", position: "fixed", zIndex: "1", left: "25%", top: "10%" });
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogIn(data);
        setEmail("");
        setPassword("");
    };

    return (
        <div className="d-flex p-5 justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="shadow p-5 logInForm">
                <div className="">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-dark">Submit</button>
                </div>
            </form>
            <div className="w-50 shadow p-5 side-div text-center d-flex flex-column justify-content-evenly">
                <div>
                    <h3>Bienvenido </h3>
                    <h6>inicia sesión para continuar</h6>
                </div>
               
            </div>
        </div>
    );
};
