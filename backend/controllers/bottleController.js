import Bottle from '../models/bottleModel.js'
import User from '../models/userModel.js'
import { calculateRewardGRC } from './utils.js'
import { sendTx } from '../web3/utilsWeb3.js'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const getUserBottles = async (req, res) => {
  const userId = req.params.userId

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const bottles = await Bottle.find({ userId: userId })
    if (!bottles) res.status(200).json({ bottles: [] })
    else res.status(200).json({ bottles })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const addScannedBottles = async (req, res) => {
  const { userId, quantity } = req.body

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!user.walletAddress)
      return res
        .status(400)
        .json({ message: 'User does not have a wallet address' })

    const rewardGRC = calculateRewardGRC('PET', quantity)

    const newBottle = new Bottle({
      userId: userId,
      quantity: quantity,
      rewardGRC: rewardGRC,
    })
    await sendTx(user.walletAddress, rewardGRC)

    const savedBottle = await newBottle.save()
    res.status(201).json({ bottle: savedBottle })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { getUserBottles, addScannedBottles }
