import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Collections, FastRewind, Group, Groups, LocalActivity, Message, Movie, OndemandVideo, SportsEsports, Storefront } from "@mui/icons-material"

import { AuthContext } from '../../context/authContext';
import noImage from '../../assets/ccclaymoji.svg'
import './leftbar.scss'

const Leftbar = () => {
	const { currentUser } = useContext(AuthContext)
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
					<div className="item">
						<LocalActivity />
						<span>Events</span>
					</div>
					<div className="item">
						<SportsEsports />
						<span>Gaming</span>
					</div>
					<div className="item">
						<Collections />
						<span>Gallery</span>
					</div>
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
			</div>
		</div>
	)
}

export default Leftbar