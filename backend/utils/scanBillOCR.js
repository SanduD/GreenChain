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
      Engie_gaz: /DATA SCADENTĂ\s*\n\s*(\d+,\d+)/,
      EON_curent: /(\d+,\d+)\s*kWh/,
      Hidroelectrica_curent: /(\d+,\d+)\s*kWh/,
      Enel_curent: /Consum energie activă kWh (\d+)/,
    }

    if (patterns[type]) {
      matches = text.match(patterns[type])
    }

    if (matches) {
      console.log(`Cantitatea facturată este: ${matches[0]} kWh`)
      return matches[0]
    } else {
      console.log('Cantitatea nu a putut fi găsită în textul extras.')
      return null
    }
  } catch (error) {
    console.error('Error during OCR processing:', error)
    return null
  }
}

// Testarea funcției - comentează această parte în producție
// const imagePath = path.join(__dirname, './extractData/EngieGaz.png')
// extractDataFromBill(imagePath, 'Engie_gaz')

export { extractDataFromBill }
