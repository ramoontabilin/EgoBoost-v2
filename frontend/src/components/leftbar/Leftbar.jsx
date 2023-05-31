import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Collections, FastRewind, Favorite, Group, Groups, LocalActivity, Logout, Message, Movie, OndemandVideo, QuestionMark, Settings, SportsEsports, Storefront, Update } from "@mui/icons-material"
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
					{/* <div className="item">
						<Group />
						<span>Friends</span>
					</div> */}
					<div className="item">
						<Groups />
						<span>Followings</span>
					</div>
					{/* <div className="item">
						<Storefront />
						<span>Marketplace</span>
					</div> */}
					{/* <div className="item">
						<OndemandVideo />
						<span>Watch</span>
					</div> */}
					{/* <div className="item">
						<FastRewind />
						<span>Liked</span>
					</div> */}
					<div className="item">
						<Favorite />
						<span>Liked Posts</span>
					</div>
				</div>
				<hr />
				<div className="menu">
					<span>Your Shortcuts</span>
					{/* <div className="item">
						<LocalActivity />
						<span>Events</span>
					</div> */}
					{/* <div className="item">
						<SportsEsports />
						<span>Gaming</span>
					</div> */}
					{/* <div className="item">
						<Collections />
						<span>Gallery</span>
					</div> */}
					<Link to="/updates">
						<div className="item">
							<Update />
							<span>Updates</span>
						</div>
					</Link>
					<div className="item">
						<Message />
						<span>Contact</span>
					</div>
					<div className="item">
						<QuestionMark />
						<span>About</span>
					</div>
				</div>
				<hr />
				<div className="menu">
					<span>Your Session</span>
					{/* <div className="item">
						<LocalActivity />
						<span>Events</span>
					</div> */}
					{/* <div className="item">
						<SportsEsports />
						<span>Gaming</span>
					</div> */}
					{/* <div className="item">
						<Collections />
						<span>Gallery</span>
					</div> */}
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