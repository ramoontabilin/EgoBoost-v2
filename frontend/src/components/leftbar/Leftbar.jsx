import { useContext } from 'react';
import { Collections, FastRewind, Group, Groups, LocalActivity, Message, Movie, OndemandVideo, SportsEsports, Storefront } from "@mui/icons-material"

import { AuthContext } from '../../context/authContext';
import './leftbar.scss'

const Leftbar = () => {
	const { currentUser } = useContext(AuthContext)
	return (
		<div className='leftbar'>
			<div className="container">
				<div className="menu">
					<div className="user">
						<img src={currentUser.image} alt={currentUser.name} />
						<span>{currentUser.name}</span>
					</div>
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