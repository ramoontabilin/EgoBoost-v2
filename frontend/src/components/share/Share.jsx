import { useContext, useState } from 'react'
import { Image } from '@mui/icons-material'
import { AuthContext } from '../../context/authContext'
import './share.scss'
import { makeRequest } from '../../axios'

const Share = () => {
	const [loading, setLoading] = useState(false)
	const [description, setDescription] = useState('')
	const [image, setImage] = useState(null)
	const { currentUser } = useContext(AuthContext)

	const handleDescription = (e) => {
		setDescription(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (description) {
			console.log("it's passing")
			setLoading(true)
			try {
				await makeRequest.post(`${import.meta.env.VITE_BASE_URL}/api/v1/post`, {
					description,
					image,
					createdAt: Date(),
					userID: currentUser._id,
				})
				setLoading(false)
			} catch (error) {
				setLoading(false)
				console.log(error.message)
				if (error.response.data.message) {
					console.log(error.response.data.message)
				}
			}
		} else {
			console.log("Post is empty")
		}
	}

	return (
		<div className="share">
			<div className="container">
				<div className="top">
					<img src={currentUser.image} alt={currentUser.name} />
					<textarea
						type="text"
						name="description"
						rows={4}
						maxLength={500}
						wrap='true'
						placeholder={`Share your thoughts ${currentUser.name}!`}
						onChange={handleDescription}
					/>
				</div>
				<hr />
				<div className="bottom">
					<div className="left">
						<input type="image" id="image" style={{ display: "none" }} />
						<label htmlFor="image">
							<div className="item">
								{/* <img src={image} alt="Image" /> */}
								<Image />
								<span>Add Image</span>
							</div>
						</label>
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