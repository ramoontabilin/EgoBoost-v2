import { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Image, Close, Delete } from '@mui/icons-material'
import { AuthContext } from '../../context/authContext'
import { makeRequest } from '../../axios'
import noImage from '../../assets/ccclaymoji.svg'
import './share.scss'

const Share = () => {
	const [loading, setLoading] = useState(false)
	const [description, setDescription] = useState('')
	const [image, setImage] = useState(null)
	const { currentUser } = useContext(AuthContext)

	const queryClient = useQueryClient()

	const mutation = useMutation(async (newPost) => {
		try {
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
						<label htmlFor="image">
							<div className="item">
								<Image />
								<span>{image ? "Replace" : "Add"} Image</span>
							</div>
						</label>
						{image &&
							<div className='item' onClick={() => setImage(null)}>
								<span>or Remove</span>
								<Delete />
							</div>
						}
					</div>
					<div className="right">
						<button
							type='submit'
							disabled={loading}
							onClick={handleSubmit}
						>
							Share
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Share