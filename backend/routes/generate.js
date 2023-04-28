import express from "express"
import { postComment, postPrompt } from "../controllers/generate.js"

const router = express.Router()

router.route('/post').post(postPrompt)
router.route('/comment').post(postComment)

export default router