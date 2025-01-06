'use client'

import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'

export default function Contact() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    const formData = new FormData(event.currentTarget)
    
    // Honeypot check
    if (formData.get('family-name')) {
      return
    }
    
    formData.append('access_key', process.env.NEXT_PUBLIC_CONTACT_FORM_KEY || '')
    
    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })

      const res = await response.json()
      
      if (res.success) {
        router.push('/thank-you')
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('An error occurred while submitting the form. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <form onSubmit={onSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your first name"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 dark:focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Honeypot field */}
        <div className="hidden">
          <label htmlFor="family-name">Family Name</label>
          <input
            type="text"
            id="family-name"
            name="family-name"
            placeholder="Enter your family name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 dark:focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            required
            rows={5}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 dark:focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Send Message
        </button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}