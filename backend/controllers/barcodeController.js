import axios from 'axios'
import Barcode from '../models/barcodeModel.js'
import dotenv from 'dotenv'

dotenv.config()
const API_KEY = process.env.UPC_API_KEY

const saveScannedBarcode = async barcodeValue => {
  try {
    const barcode = new Barcode({
      barcode: barcodeValue,
    })

    await barcode.save()
  } catch (error) {
    if (error.code === 11000) {
      console.log('Barcode already exists:', barcodeValue)
    } else {
      console.error('Error saving barcode:', error)
    }
  }
}

const verifyBarcode = async (req, res) => {
  const { barcode } = req.params

  try {
    const existingBarcode = await Barcode.findOne({ barcode })
    if (existingBarcode) {
      return res.status(200).json({ message: 'Valid' })
    }

    const response = await axios.get(
      `https://go-upc.com/api/v1/code/${barcode}?key=${API_KEY}`
    )

    if (response.data && response.data.product) {
      const { name, categoryPath } = response.data.product

      const nameRegex = /Apa/
      const categoryRegex = /Beverages/

      const isValid =
        nameRegex.test(name) ||
        categoryPath.some(category => categoryRegex.test(category))

      if (isValid) {
        await saveScannedBarcode(barcode)
        return res.status(200).json({ message: 'Valid' })
      } else {
        return res
          .status(404)
          .json({ message: 'Invalid. The barcode may not be from a bottle!' })
      }
    } else {
      return res
        .status(404)
        .json({ message: 'Invalid. The barcode may not be from a bottle!' })
    }
  } catch (error) {
    return res.status(404).json({
      message: 'Invalid. The barcode may not be from a bottle!',
      error: error.message,
    })
  }
}

const getAllBarcodes = async (req, res) => {
  try {
    const barcodes = await Barcode.find({})
    res.status(200).json(barcodes)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching barcodes', error: error.message })
  }
}

export { saveScannedBarcode, verifyBarcode, getAllBarcodes }
