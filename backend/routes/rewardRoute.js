import express from 'express'
import {
  sendRewardToUser,
  getRewards,
} from '../controllers/rewardController.js'

const router = express.Router()

router.get('/', getRewards)
router.post('/', sendRewardToUser)

export default router
