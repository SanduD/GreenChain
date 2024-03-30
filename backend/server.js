import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import homeRoute from './routes/homeRoute.js'
import userRoute from './routes/userRoute.js'
import rewardRoute from './routes/rewardRoute.js'

dotenv.config()
const app = express()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`listening on port ${process.env.PORT}!`)
    )
  })
  .catch(err => {
    console.log(err)
  })

//Middlewares
app.use(express.json())
app.use(cors())

//Routes
app.use('/user', userRoute)

//protected routes
app.use(requireAuth)
app.use('/', homeRoute)
app.use('/reward', rewardRoute)

//app.use('/auth',authRoute);
