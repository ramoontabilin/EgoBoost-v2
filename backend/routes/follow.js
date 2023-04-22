import express from "express"
import { addFollow, deleteFollow, getFollow } from "../controllers/follow.js"

const router = express.Router()

router.route('/').get(getFollow)
router.route('/').post(addFollow)
router.route('/').delete(deleteFollow)

export default router