import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeOutlined, DarkModeOutlined, GridViewOutlined, WbSunnyOutlined, NotificationsOutlined, MessageOutlined, PersonOutlined, SearchOutlined, Menu } from '@mui/icons-material'

import { DarkModeContext } from '../../context/darkModeContext'
import { AuthContext } from '../../context/authContext'
import noImage from '../../assets/ccclaymoji.svg'
import './navbar.scss'

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	const { currentUser } = useContext(AuthContext)

	return (
		<div className='navbar'>
			<div className="left">
				<Menu className='menu' onClick={() => setMenuOpen(!menuOpen)} />
				<Link to='/' style={{ textDecoration: 'none' }}>
					<span>EgoBoost</span>
				</Link>
				<div className="search">
					<SearchOutlined />
					<input type="text" placeholder='Search' />
				</div>
			</div>
			<div className="right">
				<NotificationsOutlined />
				<MessageOutlined />
				<Link to={`/profile/${currentUser._id}`}>
					<div className="user">
						<img src={currentUser.image ? currentUser.image : noImage} alt={currentUser.name} />
						<span>{currentUser.name}</span>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Navbar