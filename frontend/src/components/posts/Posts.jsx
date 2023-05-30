import { useQuery } from '@tanstack/react-query'
import { Error, FlipCameraAndroid, ImageNotSupported, Repeat } from '@mui/icons-material'

import { authRequest } from '../../axios'
import Suggestions from '../suggestions/Suggestions'
import Post from '../post/Post'
import noImage from '../../assets/ccclaymoji.svg'
import './posts.scss'

const Posts = ({ userID }) => {
	const { isLoading, error, data: posts } = useQuery(["posts", userID], () =>
		authRequest().get(`/api/v1/post${userID ? `?userID=${userID}` : ''}`).then(res => {
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
					posts.length ?
						<>
							{posts.map((post) => (
								<Post key={post._id} {...post} />
							))}
							<div className='end'>
								<div />
								<span>This is the end</span>
								<div />
							</div>
							<Suggestions />
						</>
						:
						<>
							<div className="post start">
								<h1>Welcome to EgoBoost!</h1>
								<p>Use the power of AI to enhance your posts!</p>
								<button className="generate" >
									<FlipCameraAndroid />
									<span>Generate</span>
								</button>
								<p>Available with comments as well!</p>
								<div className="write">
									<img src={noImage} alt="user" />
									<input
										type="text"
										placeholder='Say something good!'
									// value={description}
									// onChange={e => { setDescription(e.target.value) }}
									/>
									<button className="comment">Generate</button>
								</div>
							</div>
							{/* <div className="message">
								<span>No posts :c</span>
								<ImageNotSupported />
							</div> */}
							<hr />
							<Suggestions />
						</>
			}
		</div>
	)
}

export default Posts