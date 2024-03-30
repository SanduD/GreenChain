import mongoose from 'mongoose'

const rewardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rewardGRC: {
    type: Number,
    required: true,
    min: 0,
  },
  scanType: {
    type: String,
    required: true,
    enum: ['PET', 'Ticket', 'Invoice'], //allow only this types
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  savedAtDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const Reward = mongoose.model('Reward', rewardSchema)
export default Reward