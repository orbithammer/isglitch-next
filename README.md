# isGlitch.com

> Where satire meets silicon and the truth isn't binary.

A satirical tech news website built with Next.js 15, featuring modern web technologies and a focus on performance, accessibility, and user experience.

## 🚀 Features

- **Modern Next.js 15** with App Router and TypeScript
- **Responsive Design** with Tailwind CSS and dark/light theme support
- **Dynamic Article Management** with tag-based filtering and search
- **RSS Feed** with automatic caching and New York timezone handling
- **SEO Optimized** with Open Graph and Twitter Card support
- **Social Integration** with share buttons and social media links
- **E-commerce Integration** with Etsy store promotion
- **Cookie Consent Management** with granular preferences
- **Exit Intent Marketing** with image carousel
- **Contact Form** with Web3Forms integration
- **Performance Optimized** with Next.js Image optimization and caching

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with React 19
- **Styling:** Tailwind CSS with custom dark mode
- **Typography:** Tailwind Typography plugin
- **Icons:** Lucide React
- **Markdown:** React Markdown

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/isglitch-next.git
cd isglitch-next
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_CONTACT_FORM_KEY` - Web3Forms API key for contact form

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── article/           # Individual article pages
│   ├── author/            # Author profile pages
│   ├── search/            # Search results pages
│   └── [category]/        # Category pages
├── components/            # React components
├── data/                  # Static data (articles, authors)
├── lib/                   # Utility functions and configurations
│   └── theme/            # Theme management
├── public/               # Static assets
└── tests/                # Test files
```

## 🎨 Key Components

### Article Management
- Dynamic article fetching with timezone-aware publishing
- Tag-based categorization and search functionality
- Author profiles with biographical information
- SEO-optimized metadata generation

### Theme System
- System preference detection with manual override
- Smooth transitions between light and dark modes
- Tailwind CSS integration with custom color schemes

### Navigation
- Responsive sidebar with category dropdowns
- Tag-based navigation with dynamic tag loading
- Pagination for article listings

### Marketing Features
- Exit intent detection with image carousel
- Cookie consent management with granular controls
- Social media integration and sharing
- Etsy store integration with product rotation

## 🧪 Testing

Run the test suite:
```bash
npm run test
# or
npm run test:watch    # Watch mode
npm run test:ui       # UI mode
npm run test:coverage # Coverage report
```

## 📈 Performance Features

- **Image Optimization:** Next.js Image component with responsive sizing
- **Caching Strategy:** RSS feed caching based on publication schedule
- **Static Generation:** Pre-generated static pages for articles and authors
- **Code Splitting:** Automatic code splitting with Next.js
- **Lazy Loading:** Components and images loaded on demand

## 🔧 Configuration

### Tailwind CSS
Custom configuration with:
- Dark mode support (`class` strategy)
- Custom color palette for light/dark themes
- Typography plugin for article content
- Responsive breakpoints

### ESLint
Next.js recommended configuration with TypeScript support.

### TypeScript
Strict mode enabled with:
- Path aliases (`@/*` pointing to root)
- Next.js plugin integration
- Comprehensive type definitions

## 🚀 Deployment

The site is optimized for Vercel deployment:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

For other platforms, build the production version:
```bash
npm run build
npm start
```

## 📊 Analytics

The site includes:
- Metricool tracking integration
- RSS feed analytics
- Performance monitoring ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Content Management

Articles and authors are managed through static data files:
- `data/articles.ts` - Article content and metadata
- `data/authors.ts` - Author profiles and biographies

New York timezone is used for all publication scheduling.

## 🔒 Privacy & Security

- GDPR-compliant cookie consent management
- Honeypot protection on contact forms
- Secure external link handling
- Content Security Policy ready

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For support, email us through the contact form on the website or open an issue in this repository.

---

**isGlitch.com** - The online-est of tech rags. 🤖✨