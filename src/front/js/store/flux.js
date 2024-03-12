const getState = ({ getStore, getActions, setStore }) => {


	const url = process.env.BACKEND_URL

	return {
		store: {
			usuario: null,

		},
		actions: {
			//funcion para obtener la data del usuario una vez haya iniciado session
			 getUserData: async () => {
				try {
					const response = await fetch(url + "/user", {
			 			headers: {
			 				"Content-Type": "application/json",
			 			}
			 		});

			 		const responseToJson = await response.json()
					if (response.status == 200) {
			 			setStore({
			 				usuario: responseToJson
			 			});
						return responseToJson
			 		} else {
						return console.log("error status code: ", response.status)
					}

			 	} catch (error) {
			 		console.log(error);
			 	}
			 },
			 signUp: async (data) => {
				console.log(data)
				const response = await fetch(url + "/user", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				})
				// if (!response.ok) {
				// 	throw new Error(`HTTP error! Status: ${response.status}`);
				// }
		
				const res = await response.json()
				console.log(res);
				return res 
			 },
			 login: async (data) => {
				console.log(data)
				const response = await fetch(url + "/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				})
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
		
				const res = await response.json()
				localStorage.setItem("accessToken", res.access_token)
				console.log(res);
				return res 
			 },
			 isAuth: async () => {
				const token = localStorage.getItem("accessToken")
				const response = await fetch(url + "/private", {
					headers: {
						"Authorization": "Bearer " + token
					}
				});

				const responseToJson = await response.json()
				if (response.status == 200) {
					setStore({
						usuario: responseToJson
					});
					return responseToJson
				} else {
					setStore({
						usuario: false
					});
					return console.log("error status code: ", response.status)
				}
		},
	}
		};
	};
export default getState;