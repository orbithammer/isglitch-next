import Image from 'next/image'
import type { Author } from './types'

export default function AuthorProfile({ author }: { author: Author }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-6 mb-6" id={author.id}>
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src={author.image}
            alt={author.imageAlt}
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 96px, 128px"
          />
        </div>
        <h2 className="text-3xl font-bold">{author.name}</h2>
      </div>
      <div className="space-y-4">
        {author.bio.map((paragraph, index) => (
          <p key={index} className="text-gray-800 dark:text-gray-200">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}