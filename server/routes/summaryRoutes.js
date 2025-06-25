import express from 'express'
import { saveSummary, getSummaries } from '../controllers/summaryController.js'

const router = express.Router()

router.post('/', saveSummary)
router.get('/', getSummaries)

export default router
