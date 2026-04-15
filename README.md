# Mindloop — Meaningful Content Platform

A dark monochrome landing page built with React, Vite, TypeScript, Tailwind CSS v4, and Framer Motion.

## 🎨 Design System

- **Theme**: Pure black (#000) background with white foreground
- **Fonts**:
  - Inter (sans-serif) for body text
  - Instrument Serif (serif) for italic accent words
- **Effects**: Custom liquid glass effect with gradient borders
- **Animations**: Scroll-driven reveals and fade-up animations
- **Responsive**: Fully responsive design for mobile, tablet, and desktop

## 📱 Responsive Design

The landing page is **fully responsive** across all devices:

- **Mobile**: 320px - 639px (iPhone SE to large phones)
- **Tablet**: 640px - 1023px (iPad, Android tablets)
- **Desktop**: 1024px+ (Laptops, desktops, large screens)

**Key Features:**

- ✅ Adaptive typography (12px to 96px)
- ✅ Flexible grid layouts (1-4 columns)
- ✅ Stacked to horizontal layouts
- ✅ Touch-optimized buttons
- ✅ Optimized video loading

📖 See [RESPONSIVE_DESIGN.md](./RESPONSIVE_DESIGN.md) for detailed documentation.

## 🚀 Tech Stack

- **React 19** - UI library
- **Vite 8** - Build tool
- **TypeScript 6** - Type safety
- **Tailwind CSS v4** - Utility-first CSS with new @theme syntax
- **Framer Motion** - Animation library
- **HLS.js** - Video streaming for the CTA section
- **@fontsource** - Self-hosted fonts

## 📦 Installation

```bash
npm install
```

## 🎬 Required Assets

Before running the project, add these image files to the `public/` directory:

### Avatar Images (Hero Section)

- `public/avatar-1.png` - User avatar 1 (circular, ~100x100px)
- `public/avatar-2.png` - User avatar 2 (circular, ~100x100px)
- `public/avatar-3.png` - User avatar 3 (circular, ~100x100px)

### Platform Icons (Search Changed Section)

- `public/icon-chatgpt.png` - ChatGPT logo (200x200px, transparent background)
- `public/icon-perplexity.png` - Perplexity logo (200x200px, transparent background)
- `public/icon-google.png` - Google AI logo (200x200px, transparent background)

**Note**: Placeholder text files have been created. Replace them with actual PNG images.

## 🎥 Video Assets

All videos are loaded from CDN and configured in the components:

1. **Hero Background** - Autoplay looping video
2. **Mission Section** - 800x800 video with scroll-driven text reveal
3. **Solution Section** - Wide aspect ratio (3:1) video
4. **CTA Background** - HLS streaming video via Mux

## 🏃 Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

## 📁 Project Structure

```
mindloop-promote/
├── public/
│   ├── avatar-1.png          # Replace with actual image
│   ├── avatar-2.png          # Replace with actual image
│   ├── avatar-3.png          # Replace with actual image
│   ├── icon-chatgpt.png      # Replace with actual image
│   ├── icon-perplexity.png   # Replace with actual image
│   └── icon-google.png       # Replace with actual image
├── src/
│   ├── lib/
│   │   └── utils.ts          # Utility functions (cn helper)
│   ├── App.tsx               # Main application component
│   ├── index.css             # Global styles with Tailwind v4
│   └── main.tsx              # Application entry point
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── package.json
```

## 🎯 Page Sections

1. **Navbar** - Fixed transparent navigation with logo and social icons
2. **Hero Section** - Full viewport height with video background and email signup
3. **Search Changed Section** - Platform comparison (ChatGPT, Perplexity, Google AI)
4. **Mission Section** - Scroll-driven word-by-word text reveal with video
5. **Solution Section** - Feature grid with video showcase
6. **CTA Section** - HLS video background with call-to-action buttons
7. **Footer** - Simple footer with links

## 🎨 Key Features

### Liquid Glass Effect

Custom CSS class `.liquid-glass` creates a frosted glass effect with gradient borders:

- Subtle backdrop blur
- Gradient border animation
- Transparent background with luminosity blend

### Scroll-Driven Animations

- Word-by-word opacity reveal in Mission section
- Fade-up animations with staggered delays
- Viewport-based triggers with Framer Motion

### Video Integration

- Native HTML5 video for most sections
- HLS.js for adaptive streaming in CTA section
- Safari fallback for native HLS support

## 🔧 Customization

### Colors

Edit the `@theme` block in `src/index.css`:

```css
@theme {
  --color-background: oklch(0% 0 0);
  --color-foreground: oklch(100% 0 0);
  /* ... more colors */
}
```

### Fonts

Fonts are imported from @fontsource in `src/index.css`. To change fonts:

1. Install new font package: `npm install @fontsource/your-font`
2. Import in `src/index.css`
3. Update `@theme` font variables

### Animations

Adjust the `fadeUp` helper in `src/App.tsx`:

```typescript
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  } as Transition,
});
```

## 📝 License

All rights reserved © 2026 Mindloop

## 🤝 Contributing

This is a promotional landing page. For inquiries, please contact the Mindloop team.
