import User from '../models/userModel.js'
import Ticket from '../models/ticketModel.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { sendTx } from '../web3/utilsWeb3.js'

import {
  extractDataFromTicket,
  calculateRewardGRC,
} from '../controllers/utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const addTicket = async (req, res) => {
  const { userId } = req.body
  // console.log('userId:', userId)

  try {
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(400).json({ message: 'User not found by userId' })
    }

    if (!user.walletAddress) {
      return res
        .status(400)
        .json({ message: 'User does not have a wallet address' })
    }

    if (req.file == null) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const imagePath = path.join(__dirname, '../uploads', req.file.filename)
    let result = await extractDataFromTicket(imagePath)
    if (!result) {
      return res
        .status(500)
        .json({ message: 'Unable to extract data from the Ticket' })
    }

    const existingTicket = await Ticket.findOne({ ticketCode: result })
    if (existingTicket) {
      return res
        .status(400)
        .json({ message: 'Ticket with the same ticketCode already exists' })
    }

    const rewardGRC = calculateRewardGRC('Ticket', 1)

    const ticket = new Ticket({
      userId: userId,
      rewardGRC: rewardGRC,
      ticketCode: result,
      savedAtDate: new Date(),
    })

    await sendTx(user.walletAddress, rewardGRC)
    const savedTicket = await ticket.save()
    res.status(200).json({ savedTicket })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUserTickets = async (req, res) => {
  const userId = req.params.userId

  const tickets = await Ticket.find({ userId: userId })

  if (!tickets) res.status(200).json({ tickets: [] })
  else res.status(200).json({ tickets })
}

export { addTicket, getUserTickets }
