import { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Image, Delete, FlipCameraAndroid } from '@mui/icons-material'
import { AuthContext } from '../../context/authContext'
import { makeRequest } from '../../axios'
import noImage from '../../assets/ccclaymoji.svg'
import './share.scss'

const Share = () => {
	const [loading, setLoading] = useState(false)
	const [generating, setGenerating] = useState(false)
	const [description, setDescription] = useState('')
	const [image, setImage] = useState(null)
	const { currentUser } = useContext(AuthContext)

	const queryClient = useQueryClient()

	const mutation = useMutation(async (newPost) => {
		try {
			setLoading(true)
			await makeRequest.post(`${import.meta.env.VITE_BASE_URL}/api/v1/post`, newPost)
				.then(() => {
					setLoading(false)
					setDescription("")
					setImage(null)
				})
		} catch (error) {
			setLoading(false)
			console.log(error.message)
			if (error.response?.data?.message) {
				console.log(error.response.data.message)
			}
		}
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(["posts"])
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const handleGenerate = async () => {
		if (description) {
			try {
				setGenerating(true)
				await makeRequest.post(`${import.meta.env.VITE_BASE_URL}/api/v1/generate`, { prompt: description })
					.then((data) => {
						console.log(data.data)
						setGenerating(false)
						setDescription(data.data.data)
					})
			} catch (error) {
				setGenerating(false)
				console.log(error.message)
				if (error.response?.data?.message) {
					console.log(error.response.data.message)
				}
			}
		}
	}

	const handlePhotoChange = (e) => {
		if (e.target.files[0]) {
			const reader = new FileReader()
			reader.addEventListener("load", () => {
				setImage(reader.result)
			})
			reader.readAsDataURL(e.target.files[0])
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (description) {
			mutation.mutate({ description, image })
		} else {
			console.log("Post is empty")
		}
	}

	return (
		<div className="share">
			<div className="container">
				<div className="top">
					<img src={currentUser.image ? currentUser.image : noImage} alt={currentUser.name} />
					<div className="content">
						<textarea
							type="text"
							name="description"
							rows={4}
							maxLength={500}
							wrap='true'
							placeholder={`Share your thoughts ${currentUser.name}!`}
							value={description}
							onChange={e => { setDescription(e.target.value) }}
						/>
						{image && <img src={image} alt="Selected photo" />}
					</div>
				</div>
				<hr />
				<div className="bottom">
					<div className="left">
						<input
							type="file"
							id="image"
							style={{ display: "none" }}
							accept="image/png, image/jpeg"
							onChange={handlePhotoChange}
						/>
						<button className="item" disabled={generating} onClick={handleGenerate}>
							<FlipCameraAndroid />
							<span>{generating ? "Generating.." : "Generate"}</span>
						</button>
						{image
							? <div className='item' onClick={() => setImage(null)}>
								<Delete />
								<span>Remove Image</span>
							</div>
							: <label htmlFor="image">
								<div className="item">
									<Image />
									<span>Add Image</span>
								</div>
							</label>
						}
					</div>
					<div className="right">
						<button
							type='submit'
							disabled={loading}
							onClick={handleSubmit}
						>
							{loading ? "Sharing.." : "Share"}
						</button>
					</div>
				</div>
			</div>
		</div >
	)
}

export default Share