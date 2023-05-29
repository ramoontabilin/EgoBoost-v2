import { useState, useEffect, createContext } from "react"
import axios from "axios"
import Cookies from "universal-cookie"


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || false)
	const cookies = new Cookies()
	const login = async (form) => {
		await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, form)
			.then((data) => {
				cookies.set("TOKEN", data.data.token, {
					path: "/",
					sameSite: "none",
					// httpOnly: true,
					// secure: false,
				})
				localStorage.setItem('user', JSON.stringify(data.data.data))
				setCurrentUser(data.data.data)
			})
	}

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser))
	}, [currentUser])

	return <AuthContext.Provider value={{ currentUser, setCurrentUser, login }}>{children}</AuthContext.Provider>
}