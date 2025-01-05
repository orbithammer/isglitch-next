import Image from 'next/image'

export default function LemmyLink() {
  return (
    <a
      href="https://lemmy.world/c/isglitch"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-6 mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <Image
        src="/socials/lemmy.svg"
        alt="Lemmy logo"
        width={32}
        height={32}
        className="dark:invert"
      />
      <span className="text-lg font-medium hover:text-purple-600 dark:hover:text-green-400">
        Join our Lemmy community!
      </span>
    </a>
  )
}