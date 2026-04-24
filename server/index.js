import express from 'express'
import dotenv from 'dotenv'
dotenv.config() // Load variables immediately
import cors from 'cors'
import connectDB from './db.js'
import summaryRoutes from './routes/summaryRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { apiLimiter } from './middlewares/rateLimiter.js'

// Create express app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(apiLimiter)

// Simple request logger
app.use((req, res, next) => {
  console.log(`📡 ${req.method} request to ${req.url}`)
  next()
})

// Logging
console.log("✅ Starting server...")

// Connect to MongoDB
connectDB()

// Routes
app.use('/api/summaries', summaryRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/auth', authRoutes)

// Optional test route
app.get('/', (req, res) => {
  res.send('✅ Backend is up and running!')
})

// Listen on assigned port (important for Render)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
