import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db.js'
import summaryRoutes from './routes/summaryRoutes.js'
import newsRoutes from './routes/newsRoutes.js'

// Load env variables first
dotenv.config()

// Create express app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Logging
console.log("✅ Starting server...")

// Connect to MongoDB
connectDB()

// Routes
app.use('/api/summaries', summaryRoutes)
app.use('/api/news', newsRoutes)

// Optional test route
app.get('/', (req, res) => {
  res.send('✅ Backend is up and running!')
})

// Listen on assigned port (important for Render)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
