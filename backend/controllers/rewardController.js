import Reward from '../models/rewardModel.js'
import User from '../models/userModel.js'
import dotenv from 'dotenv'
import { sendTx, getBalance } from '../web3/utilsWeb3.js'
dotenv.config()

const sendRewardToUser = async (req, res) => {
  // if (!req.body.fcmRegistrationToken) {
  //   return res
  //     .status(400)
  //     .json({ message: 'No fcmToken found! Cannot push notification' })
  // }
  const { userId, rewardGRC, userAddress } = req.body

  if (!userId || !rewardGRC || !userAddress) {
    return res.status(400).json({ message: 'Missing required fields.' })
  }

  if (rewardGRC < 0) {
    return res.status(400).json({ message: 'Reward can not be <0!' })
  }

  const user = await User.findOne({ _id: userId })
  if (!user)
    return res.status(400).json({ message: 'User not found by userId' })

  const serverWalletAddress = process.env.WALLET_ADDRESS

  await sendTx(serverWalletAddress, userAddress, rewardGRC)

  try {
    const reward = new Reward({
      userId,
      rewardGRC,
      savedAtDate: new Date(),
    })

    const savedReward = await reward.save()
    res.status(200).json(savedReward)
  } catch (error) {
    res.status(400).json({ error: err.message })
  }
}

const getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ userId: req.params.userId })
    if (rewards.length == 0) {
      res.status(400).json({ message: 'Rewards not found! Please scan a PET!' })
    }
    res.status(200).json(rewards)
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching rewards.',
      error: error.message,
    })
  }
}

const getBalanceOfUser = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findOne({ _id: userId })

    if (!user)
      return res.status(400).json({ message: 'User not found by userId' })

    const balance = await getBalance(user.walletAddress)
    res.status(200).json({ amountGRC: balance })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'An error occurred while fetching the balance.',
      error: error.message,
    })
  }
}
export { sendRewardToUser, getRewards, getBalanceOfUser }
