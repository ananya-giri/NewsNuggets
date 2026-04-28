import axios from 'axios'
import { useEffect, useState } from 'react'

export default function MySummaries() {
  const [summaries, setSummaries] = useState([])
  const [loadingId, setLoadingId] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const limit = 5

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5001/api/summaries?type=mine&page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummaries(res.data.summaries || [])
        setTotalPages(res.data.totalPages || 1)
        setTotalItems(res.data.totalSummaries || 0)
      } catch (err) {
        console.error("❌ Failed to fetch summaries:", err.message)
      }
    }
    
    fetchSummaries()
  }, [page])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this nugget?')) return
    try {
      await axios.delete(`http://127.0.0.1:5001/api/summaries/${id}`)
      setSummaries(summaries.filter(s => s._id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete summary')
    }
  }

  const handleRefine = async (id) => {
    const instruction = prompt('How would you like to refine this summary? (e.g., "Make it shorter", "Explain like I am 5")')
    if (!instruction) return

    setLoadingId(id)
    try {
      const res = await axios.put(`http://127.0.0.1:5001/api/summaries/${id}/refine`, { instruction })
      setSummaries(summaries.map(s => s._id === id ? res.data : s))
    } catch (err) {
      console.error(err)
      alert('Failed to refine summary')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            My <span className="text-gradient">Nuggets</span>
          </h2>
          <p className="text-slate-400 mt-2 font-medium">Your personal library of AI-distilled knowledge</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
          <span className="w-8 h-[1px] bg-white/10"></span>
          <span>{totalItems} Saved Items</span>
        </div>
      </div>

      {summaries.length === 0 ? (
        <div className="text-center py-32 glass-card rounded-[3rem] border-dashed border-white/5">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-slate-500 font-bold text-xl">No nuggets saved yet.</p>
          <p className="text-slate-600 mt-2">Start exploring news and summarizing to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10">
          {summaries.map((item) => (
            <div key={item._id} className="glass-card rounded-[2.5rem] p-8 md:p-10 relative group overflow-hidden">
              {/* Highlight Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 relative z-10">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-brand-primary/20">
                        #{tag}
                      </span>
                    ))}
                    {item.isPublic && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-500/20">
                        Public
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight hover:text-brand-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-sm font-bold text-slate-500">
                    <span className="text-brand-secondary">{item.source}</span>
                    <span>•</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(item._id)}
                  className="p-3 bg-white/5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all border border-white/5 hover:border-red-400/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="p-8 glass bg-white/5 border-white/5 rounded-3xl mb-8 relative z-10">
                <p className="whitespace-pre-line text-slate-300 leading-relaxed text-lg font-medium italic">
                  "{item.summary}"
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6 relative z-10 pt-4 border-t border-white/5">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                >
                  <span>View Original Article</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                
                <button
                  onClick={() => handleRefine(item._id)}
                  disabled={loadingId === item._id}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/5 text-white rounded-2xl hover:bg-brand-primary transition-all font-bold text-sm border border-white/10"
                >
                  {loadingId === item._id ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Refining...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>AI Magic Refine</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="flex justify-center space-x-4 mt-8">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className={`px-6 py-3 rounded-2xl font-bold transition-all border ${page === 1 ? 'bg-white/5 text-slate-500 border-white/5 cursor-not-allowed' : 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/20'}`}
              >
                Previous
              </button>
              <div className="flex items-center px-4 font-bold text-slate-400">
                Page {page} of {totalPages}
              </div>
              <button 
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className={`px-6 py-3 rounded-2xl font-bold transition-all border ${page === totalPages ? 'bg-white/5 text-slate-500 border-white/5 cursor-not-allowed' : 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/20'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
