import React, { useState, useEffect } from "react";
import getState from "./flux.js";
import { useNavigate } from "react-router-dom";


export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        const navigate = useNavigate(); // Agrega useNavigate para navegación

        useEffect(() => {
            // Efecto secundario para inicializar el estado o realizar otras acciones si es necesario
        }, []);

        const handleSignUp = async (userData) => {
            try {
                // Realiza la solicitud POST al backend para registrar un nuevo usuario
                const response = await fetch(process.env.REACT_ENV_URL + "/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                // Lógica adicional después de registrar al usuario, como redirigir a otra página
                navigate("/Login");
            } catch (error) {
                console.error("Error submitting form:", error);
                // Manejo de errores
            }
        };

        // Pasar el estado global y las acciones al contexto
        const contextValue = {
            state: state.store,
            actions: state.actions,
            handleSignUp: handleSignUp // Agrega handleSignUp al contexto
        };

        return (
            <Context.Provider value={contextValue}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext; // Exporta el componente de orden superior
