import express from 'express'
import {
  sendRewardToUser,
  getRewards,
  getBalanceOfUser,
} from '../controllers/rewardController.js'

const router = express.Router()

//get amount of GRC for userId
router.get('/amount/:userId', getBalanceOfUser)

//get all reward for one user
router.get('/:userId', getRewards)

//POST /reward
router.post('/', sendRewardToUser)

export default router
