import axios from "axios"

export const makeRequest = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
	credentials: 'include',
	headers: { 'Access-Control-Allow-Origin': import.meta.env.VITE_BASE_URL, 'Content-Type': 'application/json' },
})