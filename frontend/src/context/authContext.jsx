import { useState, useEffect, createContext } from "react"
import axios from "axios"
import { makeRequest } from "../axios"


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || false)

	const login = async (form) => {
		const response = await makeRequest.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, form)
		setCurrentUser(response.data.data)
		// TEMP
		// setCurrentUser({
		// 	id: 1,
		// 	name: 'Jared Mathews',
		// 	img: 'https://images.unsplash.com/photo-1595875708571-854a3492c245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2444&q=80'
		// })
		// setCurrentUser(user)
		// console.log(user)
	}

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser))
	}, [currentUser])

	return <AuthContext.Provider value={{ currentUser, login }}>{children}</AuthContext.Provider>
}