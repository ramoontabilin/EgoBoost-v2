import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import User from "../mongodb/models/user.js"

dotenv.config()

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
	api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
})

export const register = async (req, res) => {
	const { email, password, name, image, cover, city, website } = req.body
	// try {
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(password, salt)

	// Search then if email is unique, create account with hashed password
	// TODO: Change default photo
	await User.findOne({ email })
		.then((data) => {
			if (data) {
				res.status(409).json({ success: false, message: "Email is taken" })
			} else {
				User.create({
					email,
					password: hash,
					name,
					image,
					cover,
					city,
					website,
				})
					.then((data) => {
						res.status(201).json({ success: true, data: data })
					})
					.catch((error) => {
						res.status(500).json({ success: false, message: error.message })
					})
			}
		})
		.catch((error) => {
			res.status(500).json({ success: false, message: error.message })
		})

	// }
}

export const login = async (req, res) => {
	const { email, password } = req.body
	await User.findOne({ email })
		.then((data) => {
			if (data) {
				// User found! Now compare the passwords
				const checkPass = bcrypt.compareSync(password, data.password)
				if (checkPass) {
					// Deconstruct the data to get the real object and might as get the id here
					const { _id, ...doc } = data
					const token = jwt.sign({ id: _id }, "secretkey")
					// Deconstruct again to return object without password
					const { password, ...others } = doc._doc
					res
						.cookie("accessToken", token, {
							httpOnly: true,
							sameSite: 'none',
							secure: true,
						})
						.status(200)
						.json({ success: true, data: others })
				} else {
					res.status(400).json({ success: false, message: "Wrong username or password" })
				}
			} else {
				// User not found
				res.status(404).json({ success: false, message: "Wrong username or password" })
			}
		})
		.catch((error) => {
			// Something went wrong
			res.status(500).json({ success: false, message: error.message })
		})
}

export const logout = async (req, res) => {
	res
		.clearCookie("accessToken")
		.status(200)
		.json({ success: true, message: "User has been logged out" })
}

export const update = async (req, res) => {
	const token = req.cookies.accessToken
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, "secretkey", async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { email, password, passwordOld, name, image, cover, city, website, imageOld, coverOld } = req.body
		const _id = userInfo.id

		const uploadPhoto = async (image) => {
			return cloudinary.uploader.upload(image)
				.then((data) => {
					return data.secure_url
				})
				.catch((error) => {
					console.log(error)
					res.status(500).json({ success: false, message: error.message })
				})
		}

		const replacePhoto = async (image, url) => {
			if (url) {
				const publicID = url.split("/").at(-1).split(".")[0]
				return cloudinary.uploader.destroy(publicID)
					.then(async () => {
						const url = await uploadPhoto(image)
						return url
					})
					.catch((error) => {
						console.log(error)
						res.status(500).json({ success: false, message: error.message })
					})
			} else {
				return uploadPhoto(image)
					.then((url) => {
						return url
					})
			}
		}

		const updateUserProfile = async (image, cover) => {
			await User.findOneAndUpdate(
				{
					_id
				},
				{
					name,
					image,
					cover,
					city,
					website,
				}
			)
				.then((data) => {
					res.status(200).json({ success: true, data: data })
				})
				.catch((error) => {
					res.status(500).json({ success: false, message: error.message })
				})
		}

		const updateUserEmail = async () => {
			await User.findOne({ email })
				.then((data) => {
					if (data) {
						res.status(409).json({ success: false, message: "Email is taken" })
					} else {
						User.findOneAndUpdate({ _id }, { email, })
							.then((data) => {
								res.status(200).json({ success: true, data: data })
							})
							.catch((error) => {
								res.status(500).json({ success: false, message: error.message })
							})
					}
				})
				.catch((error) => {
					res.status(500).json({ success: false, message: error.message })
				})
		}

		const updateUserPassword = async () => {
			await User.findOne({ _id })
				.then((data) => {
					if (data) {
						// User found! Now compare the passwords
						const checkPass = bcrypt.compareSync(passwordOld, data.password)
						if (checkPass) {
							const salt = bcrypt.genSaltSync(10)
							const hash = bcrypt.hashSync(password, salt)

							User.findOneAndUpdate({ _id }, { password: hash, })
								.then((data) => {
									// Deconstruct the data to get the real object and might as get the id here
									const { _id, ...doc } = data
									const token = jwt.sign({ id: _id }, "secretkey")
									// Deconstruct again to return object without password
									const { password, ...others } = doc._doc
									res
										.cookie("accessToken", token, {
											secure: true,
											sameSite: 'none',
										})
										.status(200)
										.json({ success: true, data: others })
								})
								.catch((error) => {
									res.status(500).json({ success: false, message: error.message })
								})
						} else {
							res.status(400).json({ success: false, message: "Wrong password" })
						}
					} else {
						// User not found
						res.status(404).json({ success: false, message: "User doesn't exist" })
					}
				})
				.catch((error) => {
					// Something went wrong
					res.status(500).json({ success: false, message: error.message })
				})
		}

		if (email) updateUserEmail()
		else if (password && passwordOld) updateUserPassword()
		else updateUserProfile((image ? await replacePhoto(image, imageOld) : imageOld), (cover ? await replacePhoto(cover, coverOld) : coverOld))
	})
}

// Delete the user