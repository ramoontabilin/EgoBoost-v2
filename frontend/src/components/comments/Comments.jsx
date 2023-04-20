import { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext'
import { makeRequest } from '../../axios'
import './comments.scss'
import { formatDistanceToNow, parseISO } from 'date-fns'

const Comments = ({ postID }) => {
	const [description, setDescription] = useState('')
	const { currentUser } = useContext(AuthContext)
	const { isLoading, error, data } = useQuery([`comments-${postID}`], () =>
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

	console.log(data)

	const comments = [
		{
			_id: 1,
			user: {
				name: 'Sam Sharbot',
				_id: 6,
				image: 'https://images.unsplash.com/photo-1491243658503-56c102aab1a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
			},
			description: "I love seeing all of the beautiful places you're discovering on your hikes! Your photos always make me feel like I'm right there with you. Can't wait to see where you explore next!"
		},
		{
			_id: 2,
			user: {
				name: 'Ian Halberd',
				_id: 3,
				image: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80',
			},
			description: "Wow, those views are absolutely breathtaking! It's inspiring to see you pushing yourself to new heights (literally and figuratively) on your hikes. Keep up the great work!"
		},
	]

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
				data ? data.map((comment) => (
					<div className="comment" key={comment._id}>
						<img src={comment.user.image} alt={comment.user.name} />
						<div className="details">
							<span>{comment.user.name}</span>
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