import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-green-400 dark:to-blue-400">
        404
      </h1>
      
      <h2 className="text-3xl font-semibold mb-6">
        Page Not Found
      </h2>
      
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Looks like this page has glitched out of existence. Maybe it was never here, or maybe it is just hiding in another dimension.
      </p>
      
      <Link 
        href="/"
        className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-600 dark:bg-green-500 text-white hover:bg-purple-700 dark:hover:bg-green-600 transition-colors"
      >
        <Home className="w-5 h-5 mr-2" />
        Back to Home
      </Link>
    </div>
  )
}