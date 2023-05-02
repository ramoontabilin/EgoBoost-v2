import { useContext, useEffect, useState } from 'react'
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
	const { login, currentUser } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogin = async (e) => {
		e.preventDefault()
		if (form.email && form.password) {
			setLoading(true)
			try {
				await login(form)
					.then(() => {
						setLoading(false)
					})
			} catch (error) {
				setLoading(false)
				setError(error.message)
				console.log(error)
				if (error.response.data.message) {
					setError(error.response.data.message)
				}
			}
		} else {
			setError(`Fill out your ${form.email ? "password" : "email"}`)
		}
	}

	useEffect(() => {
		if (currentUser) navigate("/")
	}, [currentUser])

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	return (
		<div className='login'>
			<div className="card">
				<div className="left">
					<h1>Give me attention.</h1>
					<p>Someone needs absurd amounts of attention because they have an extreme need for validation and affection. They may also be insecure and seeking attention in order to mask their true feelings. People with this need often find themselves overwhelmed and in need of a constant supply of attention.</p>
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