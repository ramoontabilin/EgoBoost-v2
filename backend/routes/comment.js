import express from "express"
import { addComment, getComment } from "../controllers/comment.js"

const router = express.Router()

router.route('/').get(getComment)
router.route('/').post(addComment)

export default router