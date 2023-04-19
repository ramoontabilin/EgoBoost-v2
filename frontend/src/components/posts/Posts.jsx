import { useQuery } from '@tanstack/react-query'

import { makeRequest } from '../../axios'
import Post from '../post/Post'
import './posts.scss'

const Posts = () => {
	const { isLoading, error, data } = useQuery(["posts"], () =>
		makeRequest.get("/api/v1/post").then(res => {
			return res.data.data
		})
	)

	return (
		<div className="posts">
			{isLoading ? "Loading" : data.map((post) => (
				<Post key={post._id} {...post} />
			))}
		</div>
	)
}

export default Posts