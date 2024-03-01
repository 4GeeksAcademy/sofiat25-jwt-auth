import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/signUp.css";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [terminos, setTerminos] = useState(false);
    const [display, setDisplay] = useState({ display: "none" });
    const [displayDanger, setDisplayDanger] = useState({ display: "none" });
    const navigate = useNavigate();

    const data = {
        email: email,
        password: password,
        nombre: nombre,
        apellido: apellido,
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_ENV_URL + "/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setNombre("");
                setApellido("");
                setEmail("");
                setPassword("");
                setTerminos(false);
                setDisplay({ display: "flex", position: "fixed", zIndex: "1", left: "25%", top: "10%" });
                setTimeout(() => { setDisplay({ display: "none" }) }, 3500);
                setTimeout(() => { navigate("/LoginUsers") }, 3500);
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                setDisplayDanger({ display: "flex", position: "fixed", zIndex: "1", left: "25%", top: "10%" });
            });
    };

    return (
        <div className="SignUpForOrganizersContainer">
            <h1 className="TitleSignUpForOrganizers">
                Registro para Usuarios
            </h1>
            <form className="formularioRegistro">
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="Name" onChange={(e) => setNombre(e.target.value)} value={nombre} name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="lastName" onChange={(e) => setApellido(e.target.value)} value={apellido} />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <div id="emailHelp" className="form-text">Nosotros nunca compartiremos tu correo con nadie</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="InputPassword" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div className="mb-3 form-check CheckBoxContainer">
                    <input type="checkbox" className="form-check-input" id="exampleCheck" onChange={(e) => setTerminos(e.target.checked)} checked={terminos} />
                    <label className="form-check-label" htmlFor="exampleCheck">Acepto términos y condiciones</label>
                </div>
                <button type="submit" className="btn btn-primary SubmitButtonForOrganizersSignUp" onClick={handleSubmit}>Enviar</button>
            </form>
        </div>
    );
};
