import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'

import './register.scss'

const Register = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [form, setForm] = useState({
		email: '',
		password: '',
		name: '',
	})
	const { login, currentUser } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (form.email && form.password && form.name) {
			setLoading(true)
			try {
				const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`, form)
				await login(form)
					.then(() => {
						setLoading(false)
					})
			} catch (error) {
				setLoading(false)
				setError(error.message)
				if (error.response.data.message) {
					setError(error.response.data.message)
				}
			}
		} else {
			setError("Missing fields")
		}
	}

	useEffect(() => {
		if (currentUser) navigate("/")
	}, [currentUser])

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	return (
		<div className='register'>
			<div className="card">
				<div className="left">
					<h1>EgoBoost</h1>
					<p>An inflated ego refers to an exaggerated sense of self-importance, often accompanied by arrogance and a lack of empathy towards others. It can lead to behavior that is self-centered, dismissive of others' opinions, and a disregard for rules or societal norms.</p>
					<span></span>
					<p>Already inflated?</p>
					<Link to='/login'>
						<button>Login</button>
					</Link>
				</div>
				<div className="right">
					<h1>Register</h1>
					<form
						action=""
						onSubmit={handleSubmit}
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
							placeholder="Password"
							onChange={handleChange}
						/>
						<input
							type="name"
							name="name"
							placeholder="Name"
							onChange={handleChange}
						/>
						<p className='error'>{error}</p>
						<button
							type="submit"
							disabled={loading}
							onClick={handleSubmit}
						>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register