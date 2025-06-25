import { NewspaperIcon, ScissorsIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function BrieflyIcon() {
  return (
    <div className="flex items-center space-x-2">
      {/* Newspaper icon */}
      <NewspaperIcon className="h-8 w-8 text-blue-600" />
      
      {/* Scissors icon */}
      <ScissorsIcon className="h-8 w-8 text-green-600" />
      
      {/* Clock icon */}
      <ClockIcon className="h-8 w-8 text-gray-600" />
    </div>
  )
}
