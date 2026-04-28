import axios from 'axios'
import Summary from '../models/Summary.js'

// 🟢 CREATE: Save with Automatic AI Tagging
export const saveSummary = async (req, res) => {
  try {
    const { title, summary, source, date, url, isPublic } = req.body
    const key = process.env.GEMINI_API_KEY
    console.log(`🔑 Using Key: ${key?.substring(0, 7)}...${key?.substring(key.length - 4)}`)


    let tags = []
    try {
      // Innovation: Use AI to generate tags (If it fails, we just save without tags)
      const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`
      const tagResponse = await axios.post(GEMINI_URL, {
        contents: [{
          parts: [{ text: `Generate 3 single-word tags (comma separated) for this news summary: ${summary}` }]
        }],
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ]
      })

      if (tagResponse.data.candidates && tagResponse.data.candidates.length > 0) {
        tags = tagResponse.data.candidates[0].content.parts[0].text.split(',').map(tag => tag.trim())
      } else {
        console.warn('⚠️ AI Tagging returned no candidates, using default.')
        tags = ['News']
      }
    } catch (tagError) {
      console.warn('⚠️ AI Tagging failed, saving without tags:', tagError.response?.data || tagError.message)
      tags = ['News'] // Default tag
    }

    const newSummary = new Summary({
      user: req.user.id,
      title,
      summary,
      source,
      date,
      url,
      isPublic,
      tags
    })

    await newSummary.save()
    res.status(201).json(newSummary)
  } catch (error) {
    console.error('❌ Save Summary Error:', error.message)
    res.status(500).json({ error: error.message, details: error.response?.data || 'No extra details' })
  }
}

// 🔵 READ: Get Personal Summaries vs Global Feed
export const getSummaries = async (req, res) => {
  try {
    const { type, page = 1, limit = 10 } = req.query
    let query = {}

    if (type === 'public') {
      query = { isPublic: true }
    } else {
      query = { user: req.user.id }
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalSummaries = await Summary.countDocuments(query);
    const totalPages = Math.ceil(totalSummaries / limitNumber);

    const summaries = await Summary.find(query)
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    res.json({
      summaries,
      currentPage: pageNumber,
      totalPages,
      totalSummaries
    });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// 🟠 UPDATE: "AI-Refine" (Update via AI Prompt)
export const refineSummary = async (req, res) => {
  try {
    const { id } = req.params
    const { instruction } = req.body
    const key = process.env.GEMINI_API_KEY

    const summary = await Summary.findById(id)
    if (!summary) return res.status(404).json({ error: 'Summary not found' })
    if (summary.user.toString() !== req.user.id) return res.status(401).json({ error: 'Not authorized' })

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`
    const refineResponse = await axios.post(GEMINI_URL, {
      contents: [{
        parts: [{ text: `Original summary: ${summary.summary}\n\nInstruction: ${instruction}\n\nRefine the summary accordingly.` }]
      }]
    })

    const refinedText = refineResponse.data.candidates[0].content.parts[0].text
    summary.summary = refinedText
    await summary.save()

    res.json(summary)
  } catch (error) {
    console.error('❌ Refine Summary Error:', error.response?.data || error.message)
    res.status(500).json({ error: error.message })
  }
}

// 🔴 DELETE: Remove Summary
export const deleteSummary = async (req, res) => {
  try {
    const summary = await Summary.findById(req.params.id)
    if (!summary) return res.status(404).json({ error: 'Summary not found' })
    if (summary.user.toString() !== req.user.id) return res.status(401).json({ error: 'Not authorized' })

    await summary.deleteOne()
    res.json({ message: 'Summary removed' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Generate initial summary
export const generateSummary = async (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'Text is required' })

  try {
    const key = process.env.GEMINI_API_KEY
    console.log(`🤖 AI Request started for text length: ${text.length}`)

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`

    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: `Summarize this news article in 3 short bullet points. Be objective:\n\n${text}` }] }],
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
      ]
    })

    if (!response.data.candidates || response.data.candidates.length === 0) {
      console.error('❌ Google AI returned no candidates. Full Response:', JSON.stringify(response.data, null, 2))
      return res.status(500).json({ error: 'AI blocked the content or failed to generate' })
    }

    console.log('✅ AI Response received successfully')
    res.json({ summary: response.data.candidates[0].content.parts[0].text })
  } catch (error) {
    console.error('❌ AI GENERATION FAILED!')
    if (error.response) {
      console.error('Status:', error.response.status)
      console.error('Data:', JSON.stringify(error.response.data, null, 2))
    } else {
      console.error('Error Message:', error.message)
    }
    res.status(500).json({ 
      error: 'Failed to generate', 
      details: error.response?.data?.error?.message || error.message 
    })
  }
}

// Analyze Tone, Sentiment, and Bias
export const analyzeArticle = async (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'Text is required' })

  try {
    const key = process.env.GEMINI_API_KEY
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`

    const prompt = `Analyze this news article text for Tone, Sentiment, and potential Bias. 
    Return the result in plain JSON format with these exact keys: 
    "tone" (e.g. Neutral, Professional, Sarcastic), 
    "sentiment" (e.g. Positive, Negative, Neutral), 
    "biasScore" (A number from 0 to 10 where 0 is purely objective and 10 is extremely biased), 
    "analysis" (A 2-sentence explanation of the analysis). 
    Do NOT include markdown formatting or backticks in your response. Just the raw JSON.
    
    Article Text: ${text}`

    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    })

    if (!response.data.candidates || response.data.candidates.length === 0) {
      return res.status(500).json({ error: 'AI failed to analyze' })
    }

    const rawText = response.data.candidates[0].content.parts[0].text
    // Clean potential markdown if AI ignored the "no markdown" instruction
    const cleanedJson = rawText.replace(/```json|```/g, '').trim()
    const analysisData = JSON.parse(cleanedJson)

    res.json(analysisData)
  } catch (error) {
    console.error('❌ AI ANALYSIS FAILED:', error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to analyze article', details: error.message })
  }
}
