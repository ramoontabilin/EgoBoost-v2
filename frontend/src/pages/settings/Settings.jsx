import { useContext, useState } from 'react'
import { DarkModeOutlined, WbSunnyOutlined } from '@mui/icons-material'

import { DarkModeContext } from '../../context/darkModeContext'
import { AuthContext } from '../../context/authContext'
import './settings.scss'

const Settings = () => {
	const { currentUser } = useContext(AuthContext)
	const { toggle, darkMode } = useContext(DarkModeContext)
	const [form, setForm] = useState({
		email: '',
		oldPassword: '',
		newPassword: '',
	})

	const handleChange = (e) => {
		console.log(e.target.name)
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
						<button>Save Email</button>
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
							onChange={handleChange}
						/>
						<input
							type="password"
							name="password"
							placeholder='New Password'
							onChange={handleChange}
						/>
						<button>Save Password</button>
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