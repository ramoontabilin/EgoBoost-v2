import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext'
import { makeRequest } from '../../axios'
import './comments.scss'
import { formatDistanceToNow, parseISO } from 'date-fns'

const Comments = ({ postID }) => {
	const [description, setDescription] = useState('')
	const { currentUser } = useContext(AuthContext)
	const { isLoading, error, data: comments } = useQuery([`comments-${postID}`], () =>
		makeRequest.get(`/api/v1/comment?postID=${postID}`).then(res => {
			return res.data.data
		})
	)

	const queryClient = useQueryClient()
	const mutation = useMutation(async (newComment) => {
		try {
			await makeRequest.post(`${import.meta.env.VITE_BASE_URL}/api/v1/comment`, newComment)
				.then(() => {
					setDescription("")
				})
		} catch (error) {
			console.log(error.message)
			if (error.response?.data?.message) {
				console.log(error.response.data.message)
			}
		}
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([`comments-${postID}`])
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		if (description) {
			mutation.mutate({ description, postID })
		} else {
			console.log("Post is empty")
		}
	}

	return (
		<div className='comments'>
			<div className="write">
				<img src={currentUser.image} alt={currentUser.name} />
				<input
					type="text"
					placeholder='Say something good!'
					value={description}
					onChange={e => { setDescription(e.target.value) }}
				/>
				<button
					type='submit'
					onClick={handleSubmit}
				>
					Send
				</button>
			</div>
			{isLoading ? "Loading.. " :
				comments ? comments.map((comment) => (
					<div className="comment" key={comment._id}>
						<Link to={`/profile/${comment.user._id}`}>
							<img src={comment.user.image} alt={comment.user.name} />
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