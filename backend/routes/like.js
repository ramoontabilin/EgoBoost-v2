import express from "express"
import { addLike, deleteLike, getLike } from "../controllers/like.js"

const router = express.Router()

router.route('/').get(getLike)
router.route('/').post(addLike)
router.route('/').delete(deleteLike)

export default router