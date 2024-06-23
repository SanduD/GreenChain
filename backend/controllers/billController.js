import User from '../models/userModel.js'
import Bill from '../models/billModel.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendTx } from '../web3/utilsWeb3.js'

import {
  extractDataFromBill,
  calculateRewardGRC,
} from '../controllers/utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const addBill = async (req, res) => {
  const { userId, type } = req.body

  const user = await User.findOne({ _id: userId })
  if (!user)
    return res.status(400).json({ message: 'User not found by userId' })

  if (!user.walletAddress)
    return res
      .status(400)
      .json({ message: 'User does not have a wallet address' })

  if (req.file == null)
    return res.status(400).json({ message: 'No file uploaded' })

  const imagePath = path.join(__dirname, '../uploads', req.file.filename)
  let result = await extractDataFromBill(imagePath, type)
  console.log(result)
  if (!result) {
    return res
      .status(500)
      .json({ message: 'Unable to extract data from the bill' })
  }

  result = parseFloat(result.replace(',', '.')).toFixed(2)
  const rewardGRC = calculateRewardGRC('Bill', result)

  const bill = new Bill({
    userId: userId,
    type: type,
    quantity: result,
    rewardGRC: rewardGRC,
    savedAtDate: new Date(),
  })

  try {
    await sendTx(user.walletAddress, rewardGRC)
    const savedBill = await bill.save()
    res.status(200).json({ savedBill })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUserBills = async (req, res) => {
  const userId = req.params.userId

  // console.log(userId)

  const bills = await Bill.find({ userId: userId })

  if (!bills) res.status(200).json({ bills: [] })
  else res.status(200).json({ bills })
}

export { addBill, getUserBills }
