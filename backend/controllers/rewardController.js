import rewardSchema from '../models/rewardModel.js'
import User from '../models/userModel.js'

const sendRewardToUser = async (req, res) => {
  try {
    if (!req.body.fcmRegistrationToken) {
      return res
        .status(400)
        .json({ message: 'No fckToken found! Cannot push notification' })
    }
  } catch (error) {
    res.status(400).json({ error: err.message })
  }
}

const getRewards = async (req, res) => {}

export { sendRewardToUser, getRewards }
