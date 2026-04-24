import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function ArticleDetail() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const article = state?.article

  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(summary)
      utterance.onend = () => setIsPlaying(false)
      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
    }
  }

  const handleSummarize = async () => {
    if (!user) {
      alert('Please log in to use the AI Summarizer')
      navigate('/login')
      return
    }
    setLoading(true)
    const fullText = article.content || article.description || article.title
    
    let summaryText = ''
    try {
      const genRes = await axios.post('http://127.0.0.1:5001/api/summaries/generate', { text: fullText })
      summaryText = genRes.data.summary
    } catch (err) {
      const errorMsg = err.response?.data?.details || err.message
      console.error("❌ Generation failed:", errorMsg)
      summaryText = `Failed to generate summary: ${errorMsg}`
    }

    setSummary(summaryText)
    setLoading(false)

    if (summaryText.startsWith('Failed to')) return

    try {
      await axios.post('http://127.0.0.1:5001/api/summaries', {
        title: article.title,
        source: article.source.name,
        date: new Date(article.publishedAt).toLocaleDateString(),
        url: article.url,
        summary: summaryText,
        isPublic: false
      })
    } catch (err) {
      console.error("❌ Failed to save summary:", err.message)
    }
  }

  const handleAnalyze = async () => {
    if (!user) {
      alert('Please log in for deep analysis')
      return
    }
    setAnalysisLoading(true)
    const fullText = article.content || article.description || article.title
    try {
      const res = await axios.post('http://127.0.0.1:5001/api/summaries/analyze', { text: fullText })
      setAnalysis(res.data)
    } catch (err) {
      console.error("❌ Analysis failed:", err.message)
    } finally {
      setAnalysisLoading(false)
    }
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-red-400 font-bold text-xl mb-4">No article data found.</p>
        <button className="px-6 py-2 bg-brand-primary text-white rounded-xl" onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 animate-fade-in">
      <div className="glass-card rounded-[2.5rem] overflow-hidden border-slate-200 dark:border-white/5 shadow-2xl">
        <div className="relative h-[400px]">
          <img src={article.urlToImage} alt="Article" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
             <span className="px-4 py-1 bg-brand-primary text-white text-xs font-bold rounded-full mb-4 inline-block">{article.source.name}</span>
             <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{article.title}</h1>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-8 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Author</p>
                <p className="text-slate-900 dark:text-white font-semibold">{article.author || 'Anonymous Reporter'}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleSummarize}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-sm font-bold rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? 'Summarizing...' : 'Summarise & Save'}
              </button>
              <button
                onClick={handleAnalyze}
                disabled={analysisLoading}
                className="px-8 py-3 glass bg-white/5 text-slate-700 dark:text-white text-sm font-bold rounded-2xl border border-black/10 dark:border-white/10 hover:bg-brand-primary hover:text-white transition-all disabled:opacity-50"
              >
                {analysisLoading ? 'Analyzing Bias...' : 'Analyze Bias & Tone'}
              </button>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-10">
            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {article.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Summary Section */}
            {summary && (
              <div className="animate-fade-in h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                    <svg className="h-5 w-5 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">AI Summary</h3>
                  <button 
                    onClick={toggleAudio}
                    className={`p-2 rounded-full transition-all ${isPlaying ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-brand-primary/20 text-brand-primary hover:scale-110'}`}
                    title={isPlaying ? 'Stop' : 'Listen to summary'}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.414 4.243 1 1 0 11-1.414-1.414A3.987 3.987 0 0013 10a3.987 3.987 0 00-1.172-2.828a1 1 0 010-1.415z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="p-8 glass-card bg-brand-primary/5 border-brand-primary/10 rounded-3xl h-[calc(100%-3rem)]">
                  <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed whitespace-pre-line">
                    {summary}
                  </p>
                </div>
              </div>
            )}

            {/* Analysis Section */}
            {analysis && (
              <div className="animate-fade-in h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-brand-secondary/20 flex items-center justify-center">
                    <svg className="h-5 w-5 text-brand-secondary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Deep Analysis</h3>
                </div>
                <div className="p-8 glass-card bg-brand-secondary/5 border-brand-secondary/10 rounded-3xl space-y-6 h-[calc(100%-3rem)]">
                  <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Tone</p>
                      <p className="text-brand-primary font-bold">{analysis.tone}</p>
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Sentiment</p>
                      <p className="text-brand-secondary font-bold">{analysis.sentiment}</p>
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Bias Score</p>
                      <p className={`font-bold ${analysis.biasScore > 5 ? 'text-red-500' : 'text-green-500'}`}>{analysis.biasScore}/10</p>
                    </div>
                  </div>
                  <p className="text-slate-800 dark:text-slate-300 leading-relaxed font-medium italic border-l-4 border-brand-secondary/30 pl-4">
                    {analysis.analysis}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
