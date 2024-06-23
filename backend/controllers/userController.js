import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { getAllTransactions, getBalance } from '../web3/utilsWeb3.js'
dotenv.config()

const createToken = _id => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const registerUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    fcmRegistrationToken: req.body.fcmRegistrationToken,
  })

  try {
    const savedUser = await newUser.save()
    // const token = createToken(savedUser._id)
    res.status(200).json({ message: 'SUCCESS' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  // console.log(user)

  if (!user) {
    registerUser(req, res)
    return
  }

  await User.updateOne(
    { _id: user._id },
    {
      photo: req.body.photo,
      fcmRegistrationToken: req.body.fcmRegistrationToken,
    }
  )

  // const token = createToken(user._id)
  res.status(200).json({ message: 'SUCCESS' })
}

const walletAuth = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(500).json({ message: 'User not found!' })

  const walletAddress = req.body.walletAddress

  if (!walletAddress)
    return res.status(500).json({ message: 'Wallet address not provided!' })

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      { walletAddress: walletAddress },
      { new: true }
    )
    const token = createToken(user._id)
    res.status(200).json({ user: updatedUser, jwt: token })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating wallet address', error: error.message })
  }
}

const addActiveDay = async (req, res) => {
  const userId = req.body.userId

  console.log('active day', userId)

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const currentDay = new Date()
    const dayAlreadyActive = user.activeDays.some(
      day => day.toDateString() === currentDay.toDateString()
    )
    console.log('dayAlreadyActive', dayAlreadyActive)

    if (!dayAlreadyActive) {
      user.activeDays.push(currentDay)
      await user.save()
      return res.status(200).json({ message: 'Active day added', user })
    } else {
      console.log('here')
      return res.status(304).json({
        message: 'Active day already recorded for today',
        user,
      })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getUserWalletBalance = async (req, res) => {
  const userId = req.params.userId
  const user = await User.findById(userId)

  if (!user) return res.status(500).json({ message: 'User not found!' })

  const walletAddress = user.walletAddress

  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address not provided' })
  }
  const balance = await getBalance(walletAddress)

  try {
    res.status(200).json({ balance: balance })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUserTransactions = async (req, res) => {
  const { userId } = req.params

  const user = await User.findById(userId)

  if (!user) return res.status(500).json({ message: 'User not found!' })

  const walletAddress = user.walletAddress

  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address not provided' })
  }
  try {
    const transactions = await getAllTransactions(walletAddress)
    res.status(200).json({ transactions })
  } catch (error) {
    console.error('Error retrieving transactions:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving transactions' })
  }
}

export {
  loginUser,
  registerUser,
  walletAuth,
  addActiveDay,
  getUserWalletBalance,
  getUserTransactions,
}
