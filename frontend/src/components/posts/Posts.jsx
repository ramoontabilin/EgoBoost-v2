import { useQuery } from '@tanstack/react-query'
import { Error, ImageNotSupported, Repeat } from '@mui/icons-material'

import { makeRequest } from '../../axios'
import Post from '../post/Post'
import './posts.scss'

const Posts = ({ userID }) => {
	const { isLoading, error, data: posts } = useQuery(["posts", userID], () =>
		makeRequest.get(`/api/v1/post${userID ? `?userID=${userID}` : ''}`).then(res => {
			return res.data.data
		})
	)

	return (
		<div className="posts">
			{isLoading ?
				<div className="message">
					<span>Loading</span>
					<Repeat />
				</div> :
				error ?
					<div className="message">
						<span>Error</span>
						{error.response?.data?.message ?
							<p>{error.response.data.message}</p> :
							<p>{error.message}</p>}
						<Error />
					</div> :
					posts ? posts.map((post) => (
						<Post key={post._id} {...post} />
					)) :
						<div className="message">
							<span>No posts :c</span>
							<ImageNotSupported />
						</div>}
		</div>
	)
}

export default Posts