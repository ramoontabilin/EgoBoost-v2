import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { FacebookTwoTone, LinkedIn, Instagram, Pinterest, Twitter, Place, Language, Email, MoreVert } from '@mui/icons-material'
import { AuthContext } from '../../context/authContext'
import { makeRequest } from '../../axios'
import Posts from '../../components/posts/Posts'
import './profile.scss'

const Profile = () => {
	const { currentUser } = useContext(AuthContext)
	const queryClient = useQueryClient()
	const userID = useLocation().pathname.split('/')[2]
	console.log(`Obtained ID: ${userID}`)
	const { isLoading, error, data: user } = useQuery(["user"], () =>
		makeRequest.get(`/api/v1/user?_id=${userID}`).then(res => {
			console.log(res.data.data._id)
			console.log(`User Loading: ${userID}`)
			return res.data.data
		})
	)
	const { isLoading: commentLoading, error: commentError, data: followed } = useQuery(["follow"], () =>
		makeRequest.get(`/api/v1/follow?followerUserID=${userID}`).then(res => {
			return res.data.data
		})
	)

	const mutation = useMutation(async (followed) => {
		try {
			if (followed) return await makeRequest.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/follow?followerUserID=${userID}`)
			await makeRequest.post(`${import.meta.env.VITE_BASE_URL}/api/v1/follow`, { followerUserID: userID })
		} catch (error) {
			console.log(error.message)
			if (error.response?.data?.message) {
				console.log(error.response.data.message)
			}
		}
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(["follow"])
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const handleFollow = (e) => {
		mutation.mutate(followed)
	}

	useEffect(() => {
		console.log(`UserID Changed: ${userID}`)
		// queryClient.invalidateQueries(["user"])
		queryClient.invalidateQueries(["user"])
	}, [userID])

	return (
		<div className='profile'>
			<div className="images">
				<img src="https://images.unsplash.com/photo-1558980395-2f289089d3ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" alt="" className="cover" />
				<img src={user?.image} alt={user?.name} className="profile" />
			</div>
			<div className="profileContainer">
				<div className="profileDetails">
					<div className="top">
						<Email />
						<MoreVert />
					</div>
					<div className="center">
						<span>{user?.name}</span>
						<div className="info">
							<div className="item">
								<Place />
								Canada
							</div>
							<div className="item">
								<Language />
								<span>ramontabilin.vercel.app</span>
							</div>
						</div>
						<div className="bottom">
							{/* <div className="socials">
								<a href="www.google.com">
									<FacebookTwoTone fontSize='large' />
								</a>
								<a href="www.google.com">
									<Instagram fontSize='large' />
								</a>
								<a href="www.google.com">
									<Twitter fontSize='large' />
								</a>
								<a href="www.google.com">
									<LinkedIn fontSize='large' />
								</a>
								<a href="www.google.com">
									<Pinterest fontSize='large' />
								</a>
							</div> */}
							{userID === currentUser._id ? <button>Edit</button> : <button onClick={handleFollow}>{followed ? "Unfollow" : "Follow"}</button>}
						</div>
					</div>
				</div>
				<Posts userID={userID} />
			</div>
		</div>
	)
}

export default Profile