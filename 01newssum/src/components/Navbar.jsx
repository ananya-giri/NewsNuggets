import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <nav className="glass sticky top-0 z-50 py-4 px-6 border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl">N</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            News<span className="text-brand-primary">Nugget</span>
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-white transition-colors uppercase tracking-widest">Home</Link>
            {user && (
              <Link to="/summaries" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-white transition-colors uppercase tracking-widest">My Nuggets</Link>
            )}
          </div>

          <div className="h-6 w-[1px] bg-slate-500/20 hidden md:block"></div>

          <button 
            onClick={toggleTheme}
            className="p-2.5 glass-card rounded-xl hover:scale-110 transition-all text-brand-primary border-slate-200 dark:border-white/10"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.071 16.071l.707.707M7.757 7.757l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-black/5 dark:bg-white/5 p-1 pr-3 rounded-full border border-black/5 dark:border-white/5">
                <div className="w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center text-[10px] font-black text-white uppercase shadow-lg shadow-brand-primary/30">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hidden sm:inline">{user.name}</span>
              </div>
              <button 
                onClick={logout}
                className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">Login</Link>
              <Link to="/signup" className="px-6 py-2.5 bg-brand-primary text-white text-xs font-black rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all uppercase tracking-widest">
                Start
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
