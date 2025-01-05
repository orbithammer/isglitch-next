'use client'

// import { useContext } from 'react'
import Image from 'next/image'
// import ThemeContext from '@/lib/theme/ThemeContext'

const socialLinks = [
  {
    name: 'BlueSky',
    url: 'https://bsky.app/profile/isglitch.com',
    icon: '/socials/bluesky.svg'
  },
  {
    name: 'Mastodon',
    url: 'https://mastodon.world/@EtAl',
    icon: '/socials/mastodon.svg'
  },
  {
    name: 'Twitter',
    url: 'https://x.com/EtAl19820625',
    icon: '/socials/twitter.svg'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61564773646719',
    icon: '/socials/facebook.svg'
  },
  {
    name: 'Threads',
    url: 'https://www.threads.net/@etal_isglitch?invite=0',
    icon: '/socials/threads.svg'
  },
  {
    name: 'Pinterest',
    url: 'https://pin.it/6HXJoffF4',
    icon: '/socials/pinterest.svg'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/etal_isglitch/',
    icon: '/socials/instagram.svg'
  }
]

export default function SocialLinks() {
//   const { isDarkMode } = useContext(ThemeContext)

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md mt-4 flex justify-between">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Socials</h3>
      <div className="flex flex-wrap gap-4 mx-auto">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <Image
              src={link.icon}
              alt={`${link.name} Icon`}
              width={24}
              height={24}
              className="w-6 h-6 transition-colors invert dark:invert-0  hover:fill-red-500"
            />
          </a>
        ))}
      </div>
    </div>
  )
}