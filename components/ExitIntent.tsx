'use client'

import React, { useState, useEffect } from 'react';
import { useExitIntent } from 'use-exit-intent';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const ExitIntent = () => {
  const [shown, setShown] = useState(true);
  const [cookieConsent, setCookieConsent] = useState<{marketing: boolean} | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('/api/exit-intent-images');
        const imageList = await response.json();
        setImages(imageList);
      } catch (error) {
        console.error('Error loading exit intent images:', error);
      }
    };
    
    loadImages();
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

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

  if (!shown || !cookieConsent?.marketing || images.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-xl relative">
        <button 
          onClick={() => setShown(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Before You Go!</h2>
        
        <div className="relative w-full aspect-[4/3] mb-6">
          <Image
            src={images[currentImage]}
            alt="Store preview"
            fill
            priority
            className="object-contain rounded-lg"
          />
          
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentImage === idx ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

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