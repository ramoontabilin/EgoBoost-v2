import mongoose from "mongoose"

const Comment = new mongoose.Schema({
	description: { type: String, required: true },
	createdAt: { type: Date, required: true },
	userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	postID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
})

const CommentSchema = mongoose.model('Comment', Comment)

export default CommentSchema