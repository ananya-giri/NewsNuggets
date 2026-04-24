import express from 'express'
import { saveSummary, getSummaries, generateSummary, refineSummary, deleteSummary, analyzeArticle } from '../controllers/summaryController.js'
import { aiLimiter } from '../middlewares/rateLimiter.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', protect, saveSummary)
router.get('/', protect, getSummaries)
router.post('/generate', protect, aiLimiter, generateSummary)
router.post('/analyze', protect, aiLimiter, analyzeArticle)
router.put('/:id/refine', protect, aiLimiter, refineSummary)
router.delete('/:id', protect, deleteSummary)

export default router
