import { useEffect, useState } from 'react'
import ArticleCard from '../components/ArticleCard'
import Tabs from '../components/Tabs'
import { getNewsByCategory } from '../api/newsAPI'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState('general')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)
      const data = await getNewsByCategory(category)
      setArticles(data || [])
      setLoading(false)
    }
    fetchNews()
  }, [category])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">
          Stay Informed with <br />
          <span className="text-gradient">AI-Powered Insights</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Get the latest global news summarized in seconds. Pure facts, no fluff.
        </p>
      </div>

      <div className="mb-10">
        <Tabs setCategory={setCategory} current={category} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl h-[400px] animate-pulse bg-black/5 dark:bg-white/5"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 glass-card rounded-3xl border-red-500/20">
          <p className="text-red-400 font-medium text-lg">{error}</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl">
          <p className="text-slate-500 font-medium text-lg">No articles found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {articles.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
