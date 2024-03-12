import React, { useState, useEffect, useContext } from "react";
import "../../styles/signUp.css";
import { Context } from "../store/appContext";

export const SignUp = () => {
    const { actions } = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [terminos, setTerminos] = useState("")

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
            name: nombre,
            surname: apellido,
            terms: terminos,
        }
        const response =  await actions.signUp(data)
        if (response) {
            setNombre("");
            setApellido("");
            setEmail("");
            setPassword("");
            setTerminos(false)
        }
      
      
    };

    return (
        <div className="SignUp">
    
            <h1 className="TitleSignUp">
                Registro para Usuarios
            </h1>
            <form className="formularioRegistro">
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="Name" onChange={(e) => setNombre(e.target.value)}
                        value={nombre} name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="lastName" onChange={(e) => setApellido(e.target.value)}
                        value={apellido} />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" name="email" onChange={(e) => setEmail(e.target.value)}
                        value={email} />
                    <div id="emailHelp" className="form-text">Nosotros nunca compartiremos tu correo con nadie</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="InputPassword" onChange={(e) => setPassword(e.target.value)}
                        value={password} />
                </div>
                <div className="mb-3 form-check CheckBoxContainer">
                    <input type="checkbox" className="form-check-input" id="exampleCheck" onChange={(e) => setTerminos(true)}
                        value={terminos} />
                    <label className="form-check-label" htmlFor="exampleCheck">Acepto términos y condiciones</label>
                </div>
                <button type="submit" className="btn btn-primary SubmitButtonSignUp" onClick={handleSubmit}>Enviar</button>
            </form>
        </div>
    );
};