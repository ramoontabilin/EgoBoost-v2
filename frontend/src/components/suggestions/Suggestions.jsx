import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authRequest } from '../../axios'
import noImage from '../../assets/ccclaymoji.svg'
import './suggestions.scss'

const Suggestions = () => {
	const [users, setUsers] = useState([])
	const queryClient = useQueryClient()

	const followMutation = useMutation(async (userID) => {
		try {
			await authRequest().post(`${import.meta.env.VITE_BASE_URL}/api/v1/follow`, { followerUserID: userID })
				.then(() => {
					setUsers(users.filter((user) => user._id !== userID))
				})
		} catch (error) {
			console.log(error.message)
			if (error.response?.data?.message) {
				console.log(error.response.data.message)
			}
		}
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(["follow"])
			queryClient.invalidateQueries(["posts"])
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const handleFollow = (userID) => {
		followMutation.mutate(userID)
	}

	const handleIgnore = (userID) => {
		setUsers(users.filter((user) => user._id !== userID))
	}

	useEffect(() => {
		authRequest().get(`api/v1/follow/suggest`).then(res => {
			setUsers(res.data.data[0].result)
		})
	}, [])

	return (
		<>
			{users.length !== 0 &&
				<div className="suggestions">
					<span>Suggestions For You</span>
					{users.map((user) => (
						<div className="user" key={user._id}>
							<div className="userInfo">
								<Link to={`/profile/${user._id}`}>
									<img src={user.image ? user.image : noImage} alt={user.name} />
								</Link>
								<span>{user.name}</span>
							</div>
							<div className="buttons">
								<button onClick={() => handleFollow(user._id)}>Follow</button>
								<button onClick={() => handleIgnore(user._id)}>Ignore</button>
							</div>
						</div>
					))
					}
				</div>
			}
		</>
	)
}

export default Suggestions