import { useContext, useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { FavoriteBorderOutlined, FavoriteOutlined, TextsmsOutlined, ShareOutlined, MoreHorizOutlined, Delete, Close } from '@mui/icons-material'

import { AuthContext } from '../../context/authContext'
import { authRequest, makeRequest } from '../../axios'
import Comments from '../comments/Comments'
import noImage from '../../assets/ccclaymoji.svg'
import './post.scss'

const Post = ({ _id, user, image, description, createdAt }) => {
	const [commentOpen, setCommentOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const { currentUser } = useContext(AuthContext)
	const { isLoading: likeLoading, error: likeError, data: likes } = useQuery([`likes-${_id}`], () =>
		makeRequest.get(`/api/v1/like?postID=${_id}`).then(res => {
			return res.data.data
		})
	)
	const { isLoading: commentLoading, error: commentError, data: comments } = useQuery([`comments-${_id}`], () =>
		makeRequest.get(`/api/v1/comment?postID=${_id}`).then(res => {
			return res.data.data
		})
	)

	const queryClient = useQueryClient()
	const likeMutation = useMutation(async (liked) => {
		try {
			if (liked) return await authRequest().delete(`${import.meta.env.VITE_BASE_URL}/api/v1/like?postID=${_id}`)
			await authRequest().post(`${import.meta.env.VITE_BASE_URL}/api/v1/like`, { postID: _id })
		} catch (error) {
			console.log(error.message)
			if (error.response?.data?.message) {
				console.log(error.response.data.message)
			}
		}
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([`likes-${_id}`])
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const postMutation = useMutation(async () => {
		try {
			await authRequest().delete(`${import.meta.env.VITE_BASE_URL}/api/v1/post?_id=${_id}`)
		} catch (error) {
			console.log(error.message)
			if (error.response?.data?.message) {
				console.log(error.response.data.message)
			}
		}
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const handleDelete = async (e) => {
		postMutation.mutate()
	}

	const handleLike = async (e) => {
		likeMutation.mutate(likes?.includes(currentUser._id))
	}

	return (
		<div className="post">
			<div className="container">
				<div className="user">
					<Link to={`/profile/${user._id}`}>
						<div className="userInfo">
							<img src={user.image ? user.image : noImage} alt={user.name} />
							<div className="details">
								<span className='name'>{user.name}</span>
								<span className='date'>
									{formatDistanceToNow(parseISO(createdAt), {
										includeSeconds: true,
										addSuffix: true,
									})}
								</span>
							</div>
						</div>
					</Link>
					<div onClick={handleDelete} className={`delete ${editOpen ? 'active' : ''}`}>
						Delete post
						<Delete />
					</div>
					{
						user._id === currentUser._id &&
						(editOpen ? <Close onClick={() => setEditOpen(!editOpen)} /> : <MoreHorizOutlined onClick={() => setEditOpen(!editOpen)} />)
					}
				</div>
				<div className="content">
					<p>{description}</p>
					{image && (
						<img src={image} alt='Post image' />
					)}
				</div>
				<div className="info">
					<div className="item">
						{likes?.includes(currentUser._id) ? <FavoriteOutlined htmlColor='hotPink' onClick={handleLike} /> : <FavoriteBorderOutlined onClick={handleLike} />}
						{`${likes?.length} like${likes?.length == 1 ? "" : "s"}`}
					</div>
					<div className="item">
						<TextsmsOutlined onClick={() => setCommentOpen(!commentOpen)} />
						{`${comments?.length} comment${comments?.length == 1 ? "" : "s"}`}
					</div>
					<div className="item">
						<ShareOutlined />
						Share
					</div>
				</div>
				{commentOpen && <Comments postDescription={description} postID={_id} />}

			</div>
		</div>
	)
}

export default Post