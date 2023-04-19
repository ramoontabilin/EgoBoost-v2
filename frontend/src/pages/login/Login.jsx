import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

import './login.scss'

const Login = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [form, setForm] = useState({
		email: "",
		password: "",
	})
	const { login } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()
		if (form.email && form.password) {
			setLoading(true)
			try {
				await login(form)
				setLoading(false)
				navigate("/")
			} catch (error) {
				setLoading(false)
				setError(error.message)
				if (error.response.data.message) {
					setError(error.response.data.message)
				}
			}
			// console.log("it's passing")
			// setLoading(true)
			// try {
			// 	const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, {
			// 		method: 'POST',
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 		body: JSON.stringify(form)
			// 	})
			// 	await response.json()
			// 		.then((data) => {
			// 			if (data.success) {
			// 				console.log('Success! Navigate home.')
			// 				console.log(data.data)
			// 				login(data.data)
			// 				// navigate('/')
			// 			} else { 
			// 				console.log(data.message)
			// 			}
			// 		})
			// 		.catch((error) => {
			// 			console.log(error)
			// 		})
			// 	setLoading(false)
			// } catch (error) {
			// 	console.log(error)
			// 	setLoading(false)
			// }
		} else {
			setError(`Fill out your ${form.email ? "password" : "email"}`)
		}
	}

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	return (
		<div className='login'>
			<div className="card">
				<div className="left">
					<h1>Give me attention.</h1>
					<p>An inflated ego refers to an exaggerated sense of self-importance, often accompanied by arrogance and a lack of empathy towards others. It can lead to behavior that is self-centered, dismissive of others' opinions, and a disregard for rules or societal norms.</p>
					<span></span>
					<p>Inflate your ego</p>
					<Link to='/register'>
						<button>Register</button>
					</Link>
				</div>
				<div className="right">
					<h1>Login</h1>
					<form
						action=""
					>
						<input
							type="email"
							name="email"
							placeholder='Email'
							onChange={handleChange}
						/>
						<input
							type="password"
							name="password"
							placeholder='Password'
							onChange={handleChange}
						/>
						<p className='error'>{error}</p>
						<button
							type="submit"
							disabled={loading}
							onClick={handleLogin}
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login