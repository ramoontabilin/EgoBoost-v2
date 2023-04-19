import jwt from "jsonwebtoken"
import Post from "../mongodb/models/post.js"
import mongoose from "mongoose"

export const getPost = async (req, res) => {
	const token = req.cookies.accessToken
	console.log("Getting post: ", req.cookies.accessToken)
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
	console.log("Request token: ", req.cookies.accessToken)
	if (!token) return res.status(401).json({ success: false, message: "Not logged in." })
	jwt.verify(token, "secretkey", async (error, userInfo) => {
		if (error) return res.status(403).json({ success: false, message: "Token is not valid." })
		const { description, image, createdAt, userID } = req.body
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
	})
}