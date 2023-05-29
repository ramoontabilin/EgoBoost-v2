import axios from "axios"
import Cookies from "universal-cookie"

export const makeRequest = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })

export const authRequest = () => {
	const cookies = new Cookies()
	return axios.create({
		baseURL: import.meta.env.VITE_BASE_URL,
		headers: { 'Authorization': `Bearer ${cookies.get("TOKEN")}` },
	})
}