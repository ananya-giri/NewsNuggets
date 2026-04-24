const categories = [
  { label: 'General', value: 'general' },
  { label: 'Business', value: 'business' },
  { label: 'Technology', value: 'technology' },
  { label: 'Sports', value: 'sports' },
  { label: 'Science', value: 'science' },
  { label: 'Health', value: 'health' }
]

export default function Tabs({ setCategory, current }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-1.5 glass rounded-2xl w-fit mx-auto">
      {categories.map(cat => (
        <button
          key={cat.value}
          onClick={() => setCategory(cat.value)}
          className={`px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
            current === cat.value
              ? 'bg-brand-primary text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
