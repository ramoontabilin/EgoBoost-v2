import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../mongodb/models/user.js"

export const register = async (req, res) => {
	const { email, password, name, cover, city, website } = req.body
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
					image: "https://res.cloudinary.com/dfj09rce1/image/upload/v1680833182/kfjnf8azvi42frzibf15.png",
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
							sameSite: false
						})
						.status(200)
						.json({ success: true, data: others })
				} else {
					res.status(400).json({ success: false, message: "Wrong password" })
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
	res.clearCookie("accessToken", {
		secure: true,
		sameSite: false
	}).status(200).json({ success: true, message: "User has been logged out" })
}