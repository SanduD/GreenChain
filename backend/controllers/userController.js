import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const createToken = _id => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

const registerUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    fcmRegistrationToken: req.body.fcmRegistrationToken,
  })

  try {
    const savedUser = await user.save()
    const token = createToken(savedUser._id)
    res.status(200).json({ user: savedUser, jwt: token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

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

  const token = createToken(user._id)
  res.status(200).json({ user: user, jwt: token })
}

const walletAuth = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) return res.status(500).json({ message: 'user not found!' })
  const walletAddress = req.body.walletAddress

  if (!walletAddress)
    return res.status(500).json({ message: 'wallet address not provided!' })

  await User.updateOne(
    { email: user.email },
    {
      walletAddress: walletAddress,
    }
  )
  res.status(200).json({ message: 'wallet connected!' })
}

export { loginUser, registerUser, walletAuth }
