import { useQuery } from '@tanstack/react-query'

import { makeRequest } from '../../axios'
import Post from '../post/Post'
import './posts.scss'

const Posts = ({ userID }) => {
	const { isLoading, error, data: posts } = useQuery(["posts"], () =>
		makeRequest.get(`/api/v1/post${userID ? `?userID=${userID}` : ''}`).then(res => {
			return res.data.data
		})
	)

	return (
		<div className="posts">
			{isLoading ? "Loading" :
				posts ? posts.map((post) => (
					<Post key={post._id} {...post} />
				)) : "No posts :c"}
		</div>
	)
}

export default Posts