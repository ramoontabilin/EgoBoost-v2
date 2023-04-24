import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { FacebookTwoTone, LinkedIn, Instagram, Pinterest, Twitter, Place, Language, Email, MoreVert, Image } from '@mui/icons-material'
import { AuthContext } from '../../context/authContext'
import { makeRequest } from '../../axios'
import Posts from '../../components/posts/Posts'
import noCover from '../../assets/sssquiggly.svg'
import noImage from '../../assets/ccclaymoji.svg'
import './profile.scss'

const Profile = () => {
	const [edit, setEdit] = useState(false)
	const [image, setImage] = useState(null)
	const [cover, setCover] = useState(null)
	const [form, setForm] = useState({
		name: '',
		city: '',
		website: '',
	})
	const { currentUser, setCurrentUser } = useContext(AuthContext)
	const queryClient = useQueryClient()
	const userID = useLocation().pathname.split('/')[2]
	console.log(`Obtained ID: ${userID}`)
	const { isLoading, error, data: user } = useQuery(["user"], () =>
		makeRequest.get(`/api/v1/user?_id=${userID}`).then(res => {
			console.log(res.data.data._id)
			console.log(`User Loading: ${userID}`)
			return res.data.data
		})
		, {
			staleTime: 0,
			cacheTime: 0,
		})
	const { isLoading: commentLoading, error: commentError, data: followed } = useQuery(["follow"], () =>
		makeRequest.get(`/api/v1/follow?followerUserID=${userID}`).then(res => {
			return res.data.data
		})
	)

	const followMutation = useMutation(async (followed) => {
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

	const profileMutation = useMutation(async (updatedUser) => {
		try {
			await makeRequest.put(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/update`, updatedUser)
		} catch (error) {
			console.log(error.message)
			if (error.response?.data?.message) {
				console.log(error.response.data.message)
			}
		}
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(["user"])
				.then(() => {
					// setCurrentUser(user)
					setEdit(!edit)
				})
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const handleFollow = (e) => {
		e.preventDefault()
		followMutation.mutate(followed)
	}

	const handleEdit = (e) => {
		e.preventDefault()
		setEdit(!edit)
		if (!edit) {
			setForm({
				name: user?.name,
				city: user?.city,
				website: user?.website,
			})
		}
	}

	const handlePhotoChange = (e) => {
		if (e.target.files[0]) {
			const reader = new FileReader()
			reader.addEventListener("load", () => {
				console.log(e.target)
				e.target.id === "profile" ? setImage(reader.result) : setCover(reader.result)
			})
			reader.readAsDataURL(e.target.files[0])
		}
	}

	const handleCancel = async (e) => {
		e.preventDefault()
		setCover(null)
		setImage(null)
		setEdit(!edit)
	}

	const handleSave = async (e) => {
		e.preventDefault()
		if (form.name) {
			profileMutation.mutate({
				name: form.name,
				image,
				cover,
				city: form.city,
				website: form.website,
				imageOld: user?.image,
				coverOld: user?.cover,
			})
		} else {
			console.log('missing name')
		}
	}

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	useEffect(() => {
		console.log(`UserID Changed: ${userID}`)
		queryClient.invalidateQueries(["user"])
			.then(() => {
				setEdit(false)
			})
	}, [userID])

	return (
		<div className='profile'>
			<div className="images">
				<div className="cover">
					<img src={(edit && cover) ? cover : user?.cover ? user?.cover : noCover} alt="User Cover" />
					{
						edit && <>
							<label htmlFor="cover">
								<div>
									<Image />
								</div>
							</label>
							<input
								type="file"
								id="cover"
								style={{ display: "none" }}
								accept="image/png, image/jpeg"
								onChange={handlePhotoChange}
							/>
						</>
					}
				</div>
				<div className="profile">
					<img src={(edit && image) ? image : user?.image ? user?.image : noImage} alt={user?.name} />
					{
						edit && <>
							<label htmlFor="profile">
								<div>
									<Image />
								</div>
							</label>
							<input
								type="file"
								id="profile"
								style={{ display: "none" }}
								accept="image/png, image/jpeg"
								onChange={handlePhotoChange}
							/>
						</>
					}
				</div>
			</div>
			<div className="profileContainer">
				<div className="profileDetails">
					<form action="">
						<div className="top">
							<Email />
							<MoreVert />
						</div>
						<div className="center">
							{
								edit
									? <input
										type="name"
										name="name"
										className="name"
										placeholder="Name"
										value={form.name}
										onChange={handleChange}
									/>
									: <span>{user?.name}</span>
							}

							<div className="info">
								{
									edit
										? <div className="item">
											<Place />
											<input
												type="text"
												name="city"
												placeholder="City"
												value={form.city}
												onChange={handleChange}
											/>
										</div>
										: user?.city &&
										<div className="item">
											<Place />
											{user?.city}
										</div>
								}
								{
									edit
										? <div className="item">
											<Language />
											<input
												type="text"
												name="website"
												placeholder="Website"
												value={form.website}
												onChange={handleChange}
											/>
										</div>
										: user?.website &&
										<div className="item">
											<Language />
											<span>{user?.website}</span>
										</div>
								}
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
								<div className="buttons">
									{
										userID === currentUser._id
											?
											edit
												? <>
													<button onClick={handleSave}>Save</button>
													<button onClick={handleCancel} style={{ backgroundColor: 'red' }}>Cancel</button>
												</>
												: <button onClick={handleEdit}>Edit</button>
											: <button onClick={handleFollow}>{followed ? "Unfollow" : "Follow"}</button>
									}
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<Posts userID={userID} />
		</div>
	)
}

export default Profile