import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Thank You | isGlitch.com",
  description: "Thank you for your message. We will get back to you soon.",
}

export default function ThankYouPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Thank You!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Your message has been received. We will get back to you as soon as possible.
      </p>
    </div>
  )
}