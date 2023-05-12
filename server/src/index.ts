import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8000
const db_url = process.env.DATABASE || ''

// routes
import presaleRoutes from './routes/presale'

// DB Connection
mongoose.connect(db_url, {}).then(() => {
  console.log('DB CONNECTED')
})

// middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// routes
app.use('/api', presaleRoutes)
app.use('/', (_req: Request, res: Response) => {
  res.json({ message: 'ok' })
})

// starting a server
app.listen(port, () => {
  console.log(`⚡️ Server is running at http://localhost:${port}`)
})
