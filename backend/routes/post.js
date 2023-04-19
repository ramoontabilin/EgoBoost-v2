import express from "express"
import { addPost, getPost } from "../controllers/post.js"

const router = express.Router()

router.route('/').get(getPost)
router.route('/').post(addPost)

export default router