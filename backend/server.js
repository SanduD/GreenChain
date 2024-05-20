import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import homeRoute from './routes/homeRoute.js'
import userRoute from './routes/userRoute.js'
import requireAuth from './middleware/requireAuth.js'
import billRoute from './routes/billRoute.js'
import ticketRoute from './routes/ticketRoute.js'
import bottleRoute from './routes/bottleRoute.js'
import barcodeRoute from './routes/barcodeRoute.js'
import { swaggerSpec, swaggerUi } from './swaggerConfig.js'

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/users', userRoute)

//protected routes
//app.use(requireAuth)
app.use('/api', homeRoute)
app.use('/api/bills', billRoute)
app.use('/api/tickets', ticketRoute)
app.use('/api/bottles', bottleRoute)
app.use('/api/barcodes', barcodeRoute)

//app.use('/auth',authRoute);
