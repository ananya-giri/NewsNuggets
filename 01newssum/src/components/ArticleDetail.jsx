import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { summarizeArticle } from '../api/geminiAPI' 
import axios from 'axios'


export default function ArticleDetail() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const article = state?.article

  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    setLoading(true)
    const fullText = article.content || article.description || article.title
    const summaryText = await summarizeArticle(fullText)
    setSummary(summaryText)
    setLoading(false)

    // Prepare summary object
  const newSummary = {
    title: article.title,
    source: article.source.name,
    date: new Date(article.publishedAt).toLocaleDateString(),
    url: article.url,
    summary: summaryText,
  }

  // Save to backend 
  try {
    await axios.post('https://newsnuggets-backend.onrender.com/api/summaries', newSummary)
    console.log("✅ Summary saved to MongoDB")
  } catch (err) {
    console.error("❌ Failed to save summary:", err.message)
  }
  }

  if (!article) {
    return (
      <div className="text-center mt-10 text-red-500">
        No article data found.
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <img
        src={article.urlToImage}
        alt="Article"
        className="w-full h-64 object-cover rounded-md"
      />
      <h1 className="text-2xl font-bold mt-4">{article.title}</h1>
      <p className="text-gray-500 text-sm mt-1">
        By {article.author || 'Unknown'} | {article.source.name} |{' '}
        {new Date(article.publishedAt).toLocaleString()}
      </p>
      <p className="mt-4">{article.description}</p>
      <div className="flex gap-4 mt-6">
        <a
          href={article.url}
          target="_blank"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Read Full Article
        </a>
        <button
          onClick={handleSummarize}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? 'Summarizing...' : 'Summarise'}
        </button>
      </div>

      {summary && (
        <div className="mt-6 bg-gray-100 border-l-4 border-green-500 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2 text-green-700">Summary</h3>
          <p className="text-gray-800 whitespace-pre-line">{summary}</p>
        </div>
      )}
    </div>
  )
}
