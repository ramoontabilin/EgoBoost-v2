import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Collections, FastRewind, Group, Groups, LocalActivity, Logout, Message, Movie, OndemandVideo, Settings, SportsEsports, Storefront } from "@mui/icons-material"
import { AuthContext } from '../../context/authContext'
import { makeRequest } from '../../axios'
import noImage from '../../assets/ccclaymoji.svg'
import './leftbar.scss'

const Leftbar = () => {
	const { currentUser } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = async (e) => {
		e.preventDefault()
		try {
			await makeRequest.post('/api/v1/auth/logout')
				.then(res => {
					localStorage.removeItem('user')
					navigate("/login")
				})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='leftbar'>
			<div className="container">
				<div className="menu">
					<Link to={`/profile/${currentUser._id}`}>
						<div className="user">
							<img src={currentUser.image ? currentUser.image : noImage} alt={currentUser.name} />
							<span>{currentUser.name}</span>
						</div>
					</Link>
					<div className="item">
						<Group />
						<span>Friends</span>
					</div>
					<div className="item">
						<Groups />
						<span>Groups</span>
					</div>
					<div className="item">
						<Storefront />
						<span>Marketplace</span>
					</div>
					<div className="item">
						<OndemandVideo />
						<span>Watch</span>
					</div>
					<div className="item">
						<FastRewind />
						<span>Memories</span>
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
					<div className="item">
						<Movie />
						<span>Videos</span>
					</div>
					<div className="item">
						<Message />
						<span>Messages</span>
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
					<div className="item">
						<Settings />
						<span>Settings</span>
					</div>
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