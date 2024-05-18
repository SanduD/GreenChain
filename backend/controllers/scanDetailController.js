import User from '../models/userModel.js'
import ScanDetail from '../models/scanDetailModel.js'
import multer from 'multer'
import { extractDataFromBill } from '../utils/scanBillOCR.js'
import path from 'path'
import { fileURLToPath } from 'url'

const AVERAGE_CONSUMPTION = 300
const PET_REWARD = 0.5
const TICKET_REWARD = 0.25
const BILL_REWARD_PER_KWH = 0.2

const calculateRewardGRC = (scanType, quantity) => {
  let rewardGRC = 0

  switch (scanType) {
    case 'PET':
      rewardGRC = PET_REWARD * quantity
      break
    case 'Ticket':
      rewardGRC = TICKET_REWARD * quantity
      break
    case 'Bill':
      const savedKwh = AVERAGE_CONSUMPTION - quantity
      rewardGRC = savedKwh > 0 ? savedKwh * BILL_REWARD_PER_KWH : 0
      break
    default:
      throw new Error('Invalid scan type')
  }

  return rewardGRC
}
const saveScanDetail = async (req, res) => {
  const { userId, scanType, quantity } = req.body

  const user = await User.findOne({ _id: userId })
  if (!user)
    return res.status(400).json({ message: 'User not found by userId' })

  const rewardGRC = calculateRewardGRC(scanType, quantity)

  const scanDetail = new ScanDetail({
    userId: userId,
    scanType: scanType,
    quantity: quantity,
    rewardGRC: rewardGRC,
    savedAtDate: new Date(),
  })

  try {
    const savedScanDetail = await scanDetail.save()
    res.status(200).json({ savedScanDetail })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getScanDetail = async (req, res) => {
  const userId = req.body.userId

  const scanDetail = await ScanDetail.find({ userId: userId })

  if (!scanDetail) res.status(200).json({ message: 'No scanDetail for you!' })
  else res.status(200).json({ scanDetail })
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

const scanBill = async (req, res) => {
  const { type } = req.body
  const imagePath = path.join(__dirname, '../uploads', req.file.filename)

  const result = await extractDataFromBill(imagePath, type)
  if (result) {
    res.status(200).json({ message: 'Scan successful', data: result })
  } else {
    res.status(500).json({ message: 'Unable to extract data from the image' })
  }
}

const scanTicket = async (req, res) => {}

export { saveScanDetail, getScanDetail, scanTicket, scanBill, upload }
