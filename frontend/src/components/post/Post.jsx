import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FavoriteBorderOutlined, FavoriteOutlined, TextsmsOutlined, ShareOutlined, MoreHoriz, MoreHorizOutlined } from '@mui/icons-material'
import Comments from '../comments/Comments'

import './post.scss'

const Post = ({ user, image, description }) => {
	const [commentOpen, setCommentOpen] = useState(false)

	const liked = false

	return (
		<div className="post">
			<div className="container">
				<div className="user">
					<div className="userInfo">
						<img src={user.image} alt={user.name} />
						<div className="details">
							<Link to={`/profile/${user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
								<span className='name'>{user.name}</span>
							</Link>
							<span className='date'>1 min ago</span>
						</div>
					</div>
					<MoreHorizOutlined />
				</div>
				<div className="content">
					<p>{description}</p>
					{image && (
						<img src={image} alt='Post image' />
					)}
				</div>
				<div className="info">
					<div className="item">
						{liked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
						18 likes
					</div>
					<div className="item">
						<TextsmsOutlined onClick={() => setCommentOpen(!commentOpen)} />
						18 comments
					</div>
					<div className="item">
						<ShareOutlined />
						Share
					</div>
				</div>
				{commentOpen && <Comments />}

			</div>
		</div>
	)
}

export default Post