const categories = [
  { label: 'General', value: 'general' },
  { label: 'Business', value: 'business' },
  { label: 'Tech', value: 'technology' },
  { label: 'Sports', value: 'sports' },
  { label: 'Health', value: 'health' }
]

export default function Tabs({ setCategory, current }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map(cat => (
        <button
          key={cat.value}
          onClick={() => setCategory(cat.value)}
          className={`px-4 py-2 rounded-full border transition ${
            current === cat.value
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
