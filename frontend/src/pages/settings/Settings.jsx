import { useContext, useState } from 'react'
import { DarkModeOutlined, WbSunnyOutlined } from '@mui/icons-material'

import { DarkModeContext } from '../../context/darkModeContext'
import { authRequest } from '../../axios'
import './settings.scss'

const Settings = () => {
	const [emailSaving, setEmailSaving] = useState(false)
	const [passwordSaving, setPasswordSaving] = useState(false)
	const [emailMessage, setEmailMessage] = useState(null)
	const [passwordMessage, setPasswordMessage] = useState(null)
	const [form, setForm] = useState({
		email: '',
		oldPassword: '',
		newPassword: '',
	})
	const { toggle, darkMode } = useContext(DarkModeContext)

	const handleEmail = async (e) => {
		e.preventDefault()
		if (form.email) {
			setEmailSaving(true)
			try {
				await authRequest().put(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/update`, { email: form.email })
					.then((data) => {
						setEmailMessage("Email changed!")
						setEmailSaving(false)
						setForm({
							...form,
							email: '',
						})
					})
			} catch (error) {
				setEmailSaving(false)
				setEmailMessage(error.message)
				if (error.response?.data?.message) {
					setEmailMessage(error.response.data.message)
				}
			}
		}
	}

	const handlePassword = async (e) => {
		e.preventDefault()
		if (form.newPassword && form.oldPassword) {
			setPasswordSaving(true)
			try {
				await authRequest().put(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/update`, { password: form.newPassword, passwordOld: form.oldPassword })
					.then((data) => {
						setPasswordMessage("Password changed!")
						setPasswordSaving(false)
						setForm({
							...form,
							oldPassword: '',
							newPassword: '',
						})
					})
			} catch (error) {
				setPasswordSaving(false)
				setPasswordMessage(error.message)
				if (error.response?.data?.message) {
					setPasswordMessage(error.response.data.message)
				}
			}
		} else {
			setPasswordMessage("Fill out all fields")
		}
	}

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	return (
		<div className='settings'>
			<div className='container'>
				<div className='item'>
					<span>Current theme</span>
					{darkMode ? <WbSunnyOutlined onClick={toggle} /> : <DarkModeOutlined onClick={toggle} />}
				</div>
				<hr />
				<div className='item'>
					<form action="">
						<span>Change email</span>
						<input
							type="email"
							name="email"
							placeholder='New Email'
							value={form.email}
							onChange={handleChange}
						/>
						<button
							disabled={emailSaving}
							onClick={handleEmail}
						>
							Save Email
						</button>
						{emailMessage && (
							<div className="message">{emailMessage}</div>
						)}
					</form>
				</div>
				<hr />
				<div className='item'>
					<form action="">
						<span>Change password</span>
						<input
							type="password"
							name="oldPassword"
							placeholder='Old Password'
							value={form.oldPassword}
							onChange={handleChange}
						/>
						<input
							type="password"
							name="newPassword"
							placeholder='New Password'
							value={form.newPassword}
							onChange={handleChange}
						/>
						<button
							disabled={passwordSaving}
							onClick={handlePassword}
						>
							Save Password
						</button>
						{passwordMessage && (
							<div className="message">{passwordMessage}</div>
						)}
					</form>
				</div>
				<hr />
				<div className="item">
					<button>Delete Account</button>
				</div>
			</div>
		</div>
	)
}

export default Settings