'use client'

import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  // Add this to allow external components to show the banner
  useEffect(() => {
    const handleShowBanner = () => setShowBanner(true);
    window.addEventListener('SHOW_COOKIE_SETTINGS', handleShowBanner);
    return () => window.removeEventListener('SHOW_COOKIE_SETTINGS', handleShowBanner);
  }, []);

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true
    });
    
    // Save all consent preferences
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true
    }));
    
    // Initialize marketing cookie
    localStorage.setItem('marketingCookie', JSON.stringify({
      lastExitIntent: null
    }));
    
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    // Save consent preferences
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    
    // If marketing is enabled, initialize or update marketing cookie
    if (preferences.marketing) {
      const marketingData = localStorage.getItem('marketingCookie') 
        ? JSON.parse(localStorage.getItem('marketingCookie')!)
        : { lastExitIntent: null };
      
      localStorage.setItem('marketingCookie', JSON.stringify(marketingData));
    } else {
      localStorage.removeItem('marketingCookie');
    }
    
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
      {!showPreferences ? (
        <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreferences(true)}
              className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm bg-purple-600 dark:bg-green-500 text-white rounded hover:bg-purple-700 dark:hover:bg-green-600"
            >
              Accept All
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-4">
          <h3 className="text-lg font-semibold mb-4">Cookie Preferences</h3>
          <div className="space-y-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <p className="font-medium">Necessary Cookies</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Required for the website to function properly</p>
              </div>
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="w-5 h-5 rounded border-gray-300"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <p className="font-medium">Analytics Cookies</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Help us improve our website by collecting usage information</p>
              </div>
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <p className="font-medium">Marketing Cookies</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Used to deliver personalized advertisements</p>
              </div>
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowPreferences(false)}
              className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Back
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 text-sm bg-purple-600 dark:bg-green-500 text-white rounded hover:bg-purple-700 dark:hover:bg-green-600"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieConsent;