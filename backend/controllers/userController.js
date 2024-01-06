import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createToken = _id => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '364d' });
};

const registerUser = async (req, res) => {
  const user = new User({
    email: req.body.email,
  });
};

const userAuth = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    registerUser(req, res);
    return;
  }
};

export { loginUser, signupUser };
