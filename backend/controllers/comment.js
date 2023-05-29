import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import Comment from "../mongodb/models/comment.js"

export const getComment = async (req, res) => {
	const { postID } = req.query
	await Comment.aggregate([
		{
			$match: { postID: new mongoose.Types.ObjectId(postID) }
		},
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
}

export const addComment = async (req, res) => {
	const token = await req.headers.authorization.split(" ")[1]
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, process.env.JWT_SECRET, async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { description, postID } = req.body
		const userID = userInfo.id
		const createdAt = Date()
		await Comment.create({
			description,
			createdAt,
			userID,
			postID,
		})
			.then((data) => {
				res.status(201).json({ success: true, data: data })
			})
			.catch((error) => {
				res.status(500).json({ success: false, message: error.message })
			})
	})
}