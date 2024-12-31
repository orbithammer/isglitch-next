import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="p-4">
      <Link href="/" className="mr-4">Home</Link>
      <Link href="/tech/1" className="mr-4">Tech</Link>
      <Link href="/reviews/1" className="mr-4">Reviews</Link>
      <Link href="/entertainment/1" className="mr-4">Entertainment</Link>
      <Link href="/ai/1" className="mr-4">AI</Link>
      <Link href="/search/1" className="mr-4">Search</Link>
    </nav>
  )
}