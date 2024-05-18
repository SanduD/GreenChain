import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import homeRoute from './routes/homeRoute.js'
import userRoute from './routes/userRoute.js'
import requireAuth from './middleware/requireAuth.js'
import scanDetailRouter from './routes/scanDetailRoute.js'
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

app.use('/api/user', userRoute)

//protected routes
//app.use(requireAuth)
app.use('/api', homeRoute)
app.use('/api/scandetail', scanDetailRouter)

//app.use('/auth',authRoute);
