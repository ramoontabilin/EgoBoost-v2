import express from "express"
import { addPost, deletePost, getPost } from "../controllers/post.js"

const router = express.Router()

router.route('/').get(getPost)
router.route('/').post(addPost)
router.route('/').delete(deletePost)

export default router