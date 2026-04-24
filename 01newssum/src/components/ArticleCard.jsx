import { useNavigate } from 'react-router-dom'

export default function ArticleCard({ article }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/article', { state: { article } })
  }

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col h-full animate-fade-in border-slate-200 dark:border-white/5"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.urlToImage || 'https://images.unsplash.com/photo-1504711432869-53c20f1bb14a?auto=format&fit=crop&q=80&w=600'}
          alt="thumbnail"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-brand-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
            {article.source.name || 'News'}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
          {article.title}
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 flex-grow">
          {article.description}
        </p>
        
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <button
            className="flex items-center space-x-1 text-xs font-bold text-brand-primary group-hover:text-brand-secondary transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              navigate('/article', { state: { article } })
            }}
          >
            <span>READ & SUMMARISE</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
