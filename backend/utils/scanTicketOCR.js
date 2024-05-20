import Tesseract from 'tesseract.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const extractDataFromTicket = async imagePath => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, 'ron')

    // console.log('Text extras:', text)
    const match = text.match(/\b\d{12}\b/)

    if (match) {
      console.log(`Number found: ${match[0]}`)
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
export { extractDataFromTicket }
