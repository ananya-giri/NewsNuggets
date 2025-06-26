import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db.js'
import summaryRoutes from './routes/summaryRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
app.use('/api', newsRoutes)


console.log("✅ Starting server...")


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// API Routes
app.use('/api/summaries', summaryRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
