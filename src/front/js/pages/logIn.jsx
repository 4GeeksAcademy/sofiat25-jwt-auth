import React, { useState, useEffect, useContext } from "react";
import "../../styles/logIn.css"
import { Context } from "../store/appContext";



export const LogIn = () => {

    //estados para tener imputs controlados
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const { actions } = useContext(Context);




    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        
        }
        const response =  await actions.login(data)
        if (response) {
            setEmail("");
            setPassword("");

        }
        const logIn = await actions.isAuth()
            if (logIn) {
                setEmail("");
                setPassword("");
            }
        
    } 



    return (
        <div className="d-flex p-5 justify-content-center align-items-center">
            <form
                onSubmit={handleSubmit}
                className="shadow p-5 logInForm"
            >
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
                    <button type="submit" className="btn btn-dark">Submit</button>
                </div>
            </form>
            <div className="w-50 shadow p-5 side-div text-center d-flex flex-column justify-content-evenly">
                <div>
                    <h3>Bienvenido a Runnest</h3>
                    <h6>inicia sesión de usuario para continuar</h6>
                </div>
                {/* <div>
                    <h3 className="pt-5">No tienes cuenta?</h3>
                    <Link to ="/signUp" button type="submit" className="btn btn-light">Regístrate</button></Link>
                </div> */}
            </div>
        </div>
    )
};