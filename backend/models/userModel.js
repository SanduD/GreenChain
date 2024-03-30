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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fcmRegistrationToken: {
    type: String,
    required: true,
    default: null,
  },
})

const User = mongoose.model('User', userSchema)
export default User
