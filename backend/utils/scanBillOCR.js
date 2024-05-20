import Tesseract from 'tesseract.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Obține calea directorului curent în ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
      console.log(`Quantity extracted: ${matches[0]} kWh`)
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

export { extractDataFromBill }
