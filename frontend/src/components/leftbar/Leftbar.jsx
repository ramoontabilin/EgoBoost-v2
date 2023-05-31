import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Favorite, Groups, Home, Logout, QuestionMark, Restore, Settings, Update } from "@mui/icons-material"
import { AuthContext } from '../../context/authContext'
import noImage from '../../assets/ccclaymoji.svg'
import './leftbar.scss'

const Leftbar = ({ active }) => {
	const { currentUser, setCurrentUser } = useContext(AuthContext)
	const navigate = useNavigate()
	const cookies = new Cookies()
	const handleLogout = async (e) => {
		e.preventDefault()
		try {
			cookies.remove("TOKEN", { path: "/" })
			localStorage.removeItem('user')
			setCurrentUser(false)
			navigate("/login")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={`leftbar ${active}`} >
			<div className="container">
				<div className="menu">
					<Link to={`/profile/${currentUser._id}`}>
						<div className="user">
							<img src={currentUser.image ? currentUser.image : noImage} alt={currentUser.name} />
							<span>{currentUser.name}</span>
						</div>
					</Link>
					<div className="item">
						<Home />
						<span>Feed</span>
					</div>
					<div className="item latest">
						<Restore />
						<span>Latest Activities</span>
					</div>
					<div className="item">
						<Groups />
						<span>Followings</span>
					</div>
					<div className="item">
						<Favorite />
						<span>Liked Posts</span>
					</div>
				</div>
				<hr />
				<div className="menu">
					<span>Other Pages</span>
					<Link to="/updates">
						<div className="item">
							<Update />
							<span>Updates</span>
						</div>
					</Link>
					<Link to="/about">
						<div className="item">
							<QuestionMark />
							<span>About</span>
						</div>
					</Link>
				</div>
				<hr />
				<div className="menu">
					<span>Your Session</span>
					<Link to="/settings">
						<div className="item">
							<Settings />
							<span>Settings</span>
						</div>
					</Link>
					<div className="item" onClick={handleLogout}>
						<Logout />
						<span>Logout</span>
					</div>
				</div>
				<hr />
			</div>
		</div>
	)
}

export default Leftbar