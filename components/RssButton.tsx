import React from 'react';
import { Rss } from 'lucide-react';

const RssButton = () => {
  return (
    <a
      href="/feed"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 z-50 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 dark:bg-green-500 text-white hover:bg-purple-700 dark:hover:bg-green-600 transition-colors"
      title="Subscribe to RSS Feed"
    >
      <Rss className="w-4 h-4" />
      <span>RSS</span>
    </a>
  );
};

export default RssButton;