import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import Post from "../mongodb/models/post.js"
import Like from "../mongodb/models/like.js"
import Comment from "../mongodb/models/comment.js"

dotenv.config()

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
	api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
})

export const getPost = async (req, res) => {
	const token = await req.headers.authorization.split(" ")[1]
	console.log("Here you go: ", token)
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, process.env.JWT_SECRET, async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { userID } = req.query
		const userArray = [{ $match: { userID: new mongoose.Types.ObjectId(userID) } }]
		const followArray = [
			{
				$lookup:
				{
					from: "follows",
					localField: "userID",
					foreignField: "followerUserID",
					as: "result"
				}
			},
			{
				$match: {
					$or: [
						{ "result.followedUserID": new mongoose.Types.ObjectId(userInfo.id) },
						{ "userID": new mongoose.Types.ObjectId(userInfo.id) },
					]
				}
			},
			{
				$unset: "result"
			},
		]
		Post.aggregate([
			...(userID ? userArray : followArray),
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
			},
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
	const token = await req.headers.authorization.split(" ")[1]
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, process.env.JWT_SECRET, async (error, userInfo) => {
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

export const deletePost = async (req, res) => {
	const token = await req.headers.authorization.split(" ")[1]
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, process.env.JWT_SECRET, async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { _id } = req.query
		const userID = userInfo.id

		const deleteLikes = async (postID) => {
			await Like.deleteMany({ postID })
				.then((data) => {
					return
				})
				.catch((error) => {
					res.status(500).json({ success: false, message: error.message })
				})
		}

		const deleteComments = async (postID) => {
			await Comment.deleteMany({ postID })
				.then((data) => {
					return
				})
				.catch((error) => {
					res.status(500).json({ success: false, message: error.message })
				})
		}

		const deletePhoto = async (url) => {
			const publicID = url.split("/").at(-1).split(".")[0]
			return cloudinary.uploader.destroy(publicID)
				.then(() => {
					return
				})
				.catch((error) => {
					console.log(error)
					res.status(500).json({ success: false, message: error.message })
				})
		}

		await Post.findOne({
			_id,
			userID,
		})
			.then((data) => {
				const { image, _id } = data
				const promises = [deleteLikes(_id), deleteComments(_id), image && deletePhoto(image)]
				Promise.allSettled(promises)
					.then((data) => {
						Post.deleteOne({
							_id,
							userID
						})
							.then((data) => {
								res.status(200).json({ success: true, data: data })
							})
							.catch((error) => {
								res.status(500).json({ success: false, message: error.message })
							})
					})
					.catch((error) => {
						res.status(500).json({ success: false, message: error.message })
					})
			})
			.catch((error) => {
				res.status(500).json({ success: false, message: error.message })
			})

	})
}