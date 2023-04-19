import mongoose from "mongoose"

const Follow = new mongoose.Schema({
	followerUserID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	followedUserID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
})

const FollowSchema = mongoose.model('Follow', Follow)

export default FollowSchema