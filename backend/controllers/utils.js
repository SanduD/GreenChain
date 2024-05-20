import Tesseract from 'tesseract.js'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const AVERAGE_CONSUMPTION = 200
const PET_REWARD = 0.5
const TICKET_REWARD = 0.25
const BILL_REWARD_PER_KWH = 0.2

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

const extractDataFromBill = async (imagePath, type) => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, 'ron')

    let matches

    const patterns = {
      Engie_gas: /DATA SCADENTĂ\s*\n\s*(\d{1,3}(?:,\d{3})*(?:,\d{2})?)/,
      EON_gas: /(\d+,\d+)\s*kWh/,
      Hidroelectrica_energy: /(\d+,\d+)\s*kWh/,
      Enel_energy: /kWh (\d+)/,
    }

    if (patterns[type]) {
      matches = text.match(patterns[type])
    }

    if (matches) {
      // console.log(`Quantity extracted: ${matches[0]} kWh`)
      if (type === 'Engie_gas') {
        matches[0] = matches[0].split('\n')[1]
      }
      if (type === 'EON_gas' || type === 'Hidroelectrica_energy') {
        matches[0] = matches[0].split(' ')[0]
      }
      if (type === 'Enel_energy') {
        matches[0] = matches[0].split(' ')[1]
      }
      return matches[0]
    } else {
      console.log('Can t find the quantity of kwh.')
      return null
    }
  } catch (error) {
    console.error('Error during OCR processing:', error)
    return null
  }
}

const extractDataFromTicket = async imagePath => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, 'ron')

    // console.log('Text extras:', text)
    const match = text.match(/\b\d{12}\b/)

    if (match) {
      // console.log(`Number found: ${match[0]}`)
      return match[0]
    } else {
      console.error('Can t find a 12 digits number.')
      return null
    }
  } catch (error) {
    console.error('Error during OCR processing:', error)
    return null
  }
}

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
      const savedKwh = quantity - AVERAGE_CONSUMPTION
      rewardGRC = savedKwh > 0 ? savedKwh * BILL_REWARD_PER_KWH : 0
      break
    default:
      throw new Error('Invalid scan type')
  }

  return rewardGRC
}

export {
  extractDataFromBill,
  extractDataFromTicket,
  calculateRewardGRC,
  upload,
}
