'use client'

import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const pageNumbers = []
  if (currentPage > 2) pageNumbers.push(currentPage - 2)
  if (currentPage > 1) pageNumbers.push(currentPage - 1)
  pageNumbers.push(currentPage)
  if (currentPage < totalPages) pageNumbers.push(currentPage + 1)
  if (currentPage < totalPages - 1) pageNumbers.push(currentPage + 2)
  console.log("basePath", basePath)
  return (
    <div className="flex justify-between items-center p-4 mx-8 mb-8">
      <Link
        href={`${basePath}/1`}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === 1
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-purple-600 dark:hover:bg-green-400'
        }`}
        aria-label="First page"
      >
        {'<<'}
      </Link>

      <Link
        href={currentPage === 1 ? basePath : `${basePath}/${currentPage - 1}`}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === 1
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-purple-600 dark:hover:bg-green-400'
        }`}
        aria-label="Previous page"
      >
        {'<'}
      </Link>

      {pageNumbers.map((number) => (
        <Link
          key={number}
          href={`${basePath}/${number}`}
          className={`px-3 py-2 rounded-md transition-colors ${
            currentPage === number
              ? 'text-purple-600 dark:text-green-400 font-bold'
              : 'hover:bg-purple-600 dark:hover:bg-green-400'
          }`}
        >
          {number}
        </Link>
      ))}

      <Link
        href={`${basePath}/${currentPage + 1}`}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === totalPages
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-purple-600 dark:hover:bg-green-400'
        }`}
        aria-label="Next page"
      >
        {'>'}
      </Link>

      <Link
        href={`${basePath}/${totalPages}`}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === totalPages
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-purple-600 dark:hover:bg-green-400'
        }`}
        aria-label="Last page"
      >
        {'>>'}
      </Link>
    </div>
  )
}