import axios from "axios"

export const makeRequest = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
	headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
})