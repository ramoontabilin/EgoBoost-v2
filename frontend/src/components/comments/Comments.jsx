import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext'
import { makeRequest } from '../../axios'
import noImage from '../../assets/ccclaymoji.svg'
import './comments.scss'

const Comments = ({ postDescription, postID }) => {
	const [loading, setLoading] = useState(false)
	const [description, setDescription] = useState('')
	const { currentUser } = useContext(AuthContext)
	const { isLoading: commentLoading, error, data: comments } = useQuery([`comments-${postID}`], () =>
		makeRequest.get(`/api/v1/comment?postID=${postID}`).then(res => {
			return res.data.data
		})
	)

	const queryClient = useQueryClient()
	const mutation = useMutation(async (newComment) => {
		try {
			await makeRequest.post(`${import.meta.env.VITE_BASE_URL}/api/v1/comment`, newComment)
		} catch (error) {
			console.log(error.message)
			if (error.response?.data?.message) {
				console.log(error.response.data.message)
			}
		}
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([`comments-${postID}`])
				.then(() => {
					setDescription("")
					setLoading(false)
				})
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const handleGenerate = async () => {
		try {
			await makeRequest.post(`${import.meta.env.VITE_BASE_URL}/api/v1/generate/comment`, { description: postDescription })
				.then((data) => {
					setLoading(false)
					mutation.mutate({ description: data.data.data, postID })
				})
		} catch (error) {
			setLoading(false)
			console.log(error.message)
			if (error.response?.data?.message) {
				console.log(error.response.data.message)
			}
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		if (description) {
			mutation.mutate({ description, postID })
		} else {
			handleGenerate() 
		}
	}

	return (
		<div className='comments'>
			<div className="write">
				<img src={currentUser.image ? currentUser.image : noImage} alt={currentUser.name} />
				<input
					type="text"
					placeholder='Say something good!'
					value={description}
					onChange={e => { setDescription(e.target.value) }}
				/>
				<button
					type='submit'
					disabled={loading}
					onClick={handleSubmit}
				>
					{loading ? "Sending.." : "Send"}
				</button>
			</div>
			{commentLoading ? "Loading.. " :
				comments ? comments.map((comment) => (
					<div className="comment" key={comment._id}>
						<Link to={`/profile/${comment.user._id}`}>
							<img src={comment.user.image ? comment.user.image : noImage} alt={comment.user.name} />
						</Link>
						<div className="details">
							<Link to={`/profile/${comment.user._id}`}>
								<span>{comment.user.name}</span>
							</Link>
							<span className='date'>
								{formatDistanceToNow(parseISO(comment.createdAt), {
									includeSeconds: true,
									addSuffix: true,
								})}
							</span>
							<p>{comment.description}</p>
						</div>
					</div>
				)) : "No Comments Yet :c"}
		</div>
	)
}

export default Comments