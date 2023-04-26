import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Like from "../mongodb/models/like.js"

export const getLike = async (req, res) => {
	const { postID } = req.query
	await Like.aggregate([
		{
			$match: { postID: new mongoose.Types.ObjectId(postID) }
		},
	])
		.then((data) => {
			if (data) {
				res.status(200).json({ success: true, data: data.map((like) => like.userID) })
			} else {
				res.status(404).json({ success: false, message: "No posts." })
			}
		})
		.catch((error) => {
			res.status(500).json({ success: false, message: error.message })
		})
}

export const addLike = async (req, res) => {
	const token = req.cookies.accessToken
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, "secretkey", async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { postID } = req.body
		const userID = userInfo.id
		await Like.create({
			userID,
			postID
		})
			.then((data) => {
				res.status(200).json({ success: true, data: data })
			})
			.catch((error) => {
				res.status(500).json({ success: false, message: error.message })
			})
	})
}

export const deleteLike = async (req, res) => {
	const token = req.cookies.accessToken
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, "secretkey", async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { postID } = req.query
		const userID = userInfo.id
		await Like.deleteOne({
			userID,
			postID
		})
			.then((data) => {
				res.status(200).json({ success: true, data: data })
			})
			.catch((error) => {
				res.status(500).json({ success: false, message: error.message })
			})
	})
}