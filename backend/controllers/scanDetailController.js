import User from '../models/userModel.js'
import Reward from '../models/rewardModel.js'
import ScanDetail from '../models/scanDetailModel.js'

const saveScanDetail = async (req, res) => {
  const { rewardId, userId, scanType, quantity } = req.body

  const user = await User.findOne({ _id: userId })
  if (!user)
    return res.status(400).json({ message: 'User not found by userId' })

  const reward = await Reward.findOne({ _id: rewardId })
  if (!reward)
    return res.status(400).json({ message: 'Reward not found by id' })

  const scanDetail = new ScanDetail({
    rewardId: rewardId,
    userId: userId,
    scanType: scanType,
    quantity: quantity,
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
export { saveScanDetail, getScanDetail }
