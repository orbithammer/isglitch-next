'use client'

import React, { useState, useEffect } from 'react';
import { useExitIntent } from 'use-exit-intent';
import { X } from 'lucide-react';

const ExitIntent = () => {
  const [shown, setShown] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<{marketing: boolean} | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      setCookieConsent(JSON.parse(consent));
    }
  }, []);

  const { registerHandler } = useExitIntent({
    cookie: {
      key: 'exit-intent-modal',
      daysToExpire: 7
    },
    desktop: {
      triggerOnMouseLeave: true,
      delayInSecondsToTrigger: 1
    },
    mobile: {
      triggerOnIdle: true,
      delayInSecondsToTrigger: 10
    }
  });

  useEffect(() => {
    if (cookieConsent?.marketing) {
      const lastShown = localStorage.getItem('exit-intent-shown');
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      if (!lastShown || new Date(lastShown) < thirtyDaysAgo) {
        registerHandler({
          id: 'store-modal',
          handler: () => {
            setShown(true);
            localStorage.setItem('exit-intent-shown', new Date().toISOString());
          }
        });
      }
    }
  }, [registerHandler, cookieConsent]);

  if (!shown || !cookieConsent?.marketing) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md mx-4 relative">
        <button 
          onClick={() => setShown(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Before You Go!</h2>
        <p className="mb-6">Check out our merch store for exclusive isGlitch.com gear!</p>
        
        <a 
          href="https://www.etsy.com/shop/isGlitch"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-purple-600 dark:bg-green-500 text-white text-center py-3 px-4 rounded-lg hover:bg-purple-700 dark:hover:bg-green-600 transition-colors"
        >
          Visit Store
        </a>
      </div>
    </div>
  );
};

export default ExitIntent;