import express from "express"
import { addFollow, deleteFollow, getFollow, getFollowList, getFollowSuggestList } from "../controllers/follow.js"

const router = express.Router()

router.route('/').get(getFollow)
router.route('/list').get(getFollowList)
router.route('/suggest').get(getFollowSuggestList)
router.route('/').post(addFollow)
router.route('/').delete(deleteFollow)

export default router