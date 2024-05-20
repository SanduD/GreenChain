import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    default: null,
  },
  photo: {
    type: String,
    required: true,
    default: null,
  },
  walletAddress: {
    type: String,
    required: false,
    default: null,
  },
  fcmRegistrationToken: {
    type: String,
    required: true,
    default: null,
  },
  activeDays: {
    type: [Date],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', userSchema)
export default User
