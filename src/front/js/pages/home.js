import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="container">
				<Link to="logIn">
					<h1>INICIAR SESION</h1>
				</Link>
				<h3><span>¿No tienes una cuenta?</span> </h3>
				<br></br>
					<span><Link to="signUp" >Haz click aqui!</Link></span>
				
			</div>
		</div>
	);
};
