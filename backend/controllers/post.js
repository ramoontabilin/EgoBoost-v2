import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import Post from "../mongodb/models/post.js"

dotenv.config()

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
	api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
})

export const getPost = async (req, res) => {
	const token = req.cookies.accessToken
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, "secretkey", async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		Post.aggregate([
			// {
			// 	$match: { userID: new mongoose.Types.ObjectId(userInfo.id) }
			// },
			{
				$lookup:
				{
					from: "users",
					localField: "userID",
					foreignField: "_id",
					as: "user"
				}
			},
			{
				$unwind: "$user"
			},
			{
				$unset: "user.password"
			},
			{
				$sort: { "createdAt": -1 }
			}
		])
			.then((data) => {
				if (data) {
					res.status(200).json({ success: true, data: data })
				} else {
					res.status(404).json({ success: false, message: "No posts." })
				}
			})
			.catch((error) => {
				res.status(500).json({ success: false, message: error.message })
			})
	})
}

export const addPost = async (req, res) => {
	const token = req.cookies.accessToken
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, "secretkey", async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { description, image } = req.body
		const userID = userInfo.id
		const createdAt = Date()
		if (image) {
			await cloudinary.uploader.upload(image)
				.then((data) => {
					Post.create({
						description,
						image: data.secure_url,
						createdAt,
						userID,
					})
						.then((data) => {
							res.status(201).json({ success: true, data: data })
						})
						.catch((error) => {
							console.log(error)
							res.status(500).json({ success: false, message: error.message })
						})
				})
				.catch((error) => {
					console.log(error)
					res.status(500).json({ success: false, message: error.message })
				})
		} else {
			await Post.create({
				description,
				image,
				createdAt,
				userID,
			})
				.then((data) => {
					res.status(201).json({ success: true, data: data })
				})
				.catch((error) => {
					res.status(500).json({ success: false, message: error.message })
				})
		}
	})
}