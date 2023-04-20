import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { FavoriteBorderOutlined, FavoriteOutlined, TextsmsOutlined, ShareOutlined, MoreHorizOutlined } from '@mui/icons-material'
import Comments from '../comments/Comments'

import { AuthContext } from '../../context/authContext'
import './post.scss'

const Post = ({ _id, user, image, description, createdAt }) => {
	const [commentOpen, setCommentOpen] = useState(false)
	const { currentUser } = useContext(AuthContext)
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
							<span className='date'>
								{formatDistanceToNow(parseISO(createdAt), {
									includeSeconds: true,
									addSuffix: true,
								})}
							</span>
						</div>
					</div>
					{user._id === currentUser._id && <MoreHorizOutlined />}
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
				{commentOpen && <Comments postID={_id} />}

			</div>
		</div>
	)
}

export default Post