import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, type Transition } from 'framer-motion'
import Hls from 'hls.js'

// Animation helper
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as const
  } as Transition,
})

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <SearchChangedSection />
      <MissionSection />
      <SolutionSection />
      <CTASection />
      <Footer />
    </div>
  )
}

// Navbar Component - Fully Responsive
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-3 md:py-4 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-foreground/60 flex items-center justify-center shrink-0">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-foreground/60" />
          </div>
          <span className="font-bold text-base md:text-lg whitespace-nowrap">Mindloop</span>
        </div>

        {/* Nav Links - Hidden on mobile and tablet */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm text-muted-foreground">
          <a href="#home" className="hover:text-foreground transition-colors whitespace-nowrap">Home</a>
          <span className="text-muted-foreground/40">•</span>
          <a href="#how-it-works" className="hover:text-foreground transition-colors whitespace-nowrap">How It Works</a>
          <span className="text-muted-foreground/40">•</span>
          <a href="#philosophy" className="hover:text-foreground transition-colors whitespace-nowrap">Philosophy</a>
          <span className="text-muted-foreground/40">•</span>
          <a href="#use-cases" className="hover:text-foreground transition-colors whitespace-nowrap">Use Cases</a>
        </div>

        {/* Social Icons - Responsive sizing */}
        <div className="flex items-center gap-2 md:gap-3">
          <button className="liquid-glass w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors shrink-0" aria-label="Instagram">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </button>
          <button className="liquid-glass w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors shrink-0" aria-label="LinkedIn">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
          <button className="liquid-glass w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors shrink-0" aria-label="Twitter">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

// Hero Section - Fully Responsive
function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4" type="video/mp4" />
      </video>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 md:h-64 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32 w-full max-w-6xl mx-auto">
        <motion.div {...fadeUp(0)} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span className="px-3 py-1 rounded-xl text-background font-semibold bg-foreground text-xs sm:text-sm">New</span>
          <span className="text-xs sm:text-sm text-muted-foreground">7,000+ people already subscribed</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-[-1.5px] md:tracking-[-2px] mb-4 sm:mb-6 leading-tight"
        >
          Get <span className="font-serif italic font-normal">Inspired</span> with Us
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4"
          style={{ color: 'hsl(var(--color-hero-subtitle))' }}
        >
          Join our feed for meaningful updates, news around technology and a shared journey toward depth and direction.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="liquid-glass rounded-full p-1.5 sm:p-2 max-w-sm sm:max-w-md md:max-w-lg mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-transparent border-none outline-none px-4 sm:px-6 py-2 sm:py-0 text-xs sm:text-sm placeholder:text-muted-foreground text-center sm:text-left"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-foreground text-background rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm whitespace-nowrap"
          >
            SUBSCRIBE
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Search Changed Section - Fully Responsive
function SearchChangedSection() {
  const platforms = [
    {
      name: 'ChatGPT',
      icon: '/icon-chatgpt.png',
      description: 'AI-powered conversational search that understands context and provides detailed answers.'
    },
    {
      name: 'Perplexity',
      icon: '/icon-perplexity.png',
      description: 'Real-time AI search engine that cites sources and provides comprehensive research.'
    },
    {
      name: 'Google AI',
      icon: '/icon-google.png',
      description: 'Next-generation search combining traditional results with AI-generated insights.'
    }
  ]

  return (
    <section className="pt-24 sm:pt-32 md:pt-44 lg:pt-52 xl:pt-64 pb-6 md:pb-9 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28">
      <motion.h2
        {...fadeUp(0)}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-medium tracking-[-1.5px] md:tracking-[-2px] mb-4 sm:mb-6 text-center leading-tight px-4"
      >
        Search has <span className="font-serif italic font-normal">changed.</span> Have you?
      </motion.h2>

      <motion.p
        {...fadeUp(0.1)}
        className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4"
      >
        The way people discover content has fundamentally shifted. AI-powered search is rewriting the rules.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-20 max-w-6xl mx-auto">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            {...fadeUp(0.2 + index * 0.1)}
            className="flex flex-col items-center text-center"
          >
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-[200px] md:h-[200px] mb-4 sm:mb-6 flex items-center justify-center bg-card rounded-2xl">
              <img src={platform.icon} alt={platform.name} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain" />
            </div>
            <h3 className="font-semibold text-sm sm:text-base mb-2">{platform.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground px-2">{platform.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        {...fadeUp(0.5)}
        className="text-xs sm:text-sm text-muted-foreground text-center px-4"
      >
        If you don't answer the questions, someone else will.
      </motion.p>
    </section>
  )
}

// Mission Section - Fully Responsive with Scroll-Driven Text
function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const paragraph1 = "We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having."
  const paragraph2 = "A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved."
  const words1 = paragraph1.split(' ')
  const words2 = paragraph2.split(' ')

  const highlightWords = new Set(['curiosity', 'meets', 'clarity'])

  return (
    <section ref={sectionRef} className="pt-0 pb-16 sm:pb-24 md:pb-32 lg:pb-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28">
      <motion.div {...fadeUp(0)} className="flex justify-center mb-8 sm:mb-12 md:mb-16">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-[800px] h-auto rounded-xl sm:rounded-2xl"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-medium tracking-[-0.5px] sm:tracking-[-0.75px] md:tracking-[-1px] leading-tight text-center sm:text-left">
          {words1.map((word, index) => {
            const progress = useTransform(
              scrollYProgress,
              [index / words1.length, (index + 1) / words1.length],
              [0.15, 1]
            )

            const cleanWord = word.toLowerCase().replaceAll(/[.,—]/g, '')
            const isHighlight = highlightWords.has(cleanWord)

            return (
              <motion.span
                key={`word1-${index}`}
                style={{
                  opacity: progress,
                  color: isHighlight ? 'hsl(var(--color-foreground))' : 'hsl(var(--color-hero-subtitle))'
                }}
                className="inline-block mr-1.5 sm:mr-2"
              >
                {word}
              </motion.span>
            )
          })}
        </p>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-tight text-center sm:text-left">
          {words2.map((word, index) => {
            const progress = useTransform(
              scrollYProgress,
              [0.5 + index / words2.length / 2, 0.5 + (index + 1) / words2.length / 2],
              [0.15, 1]
            )

            return (
              <motion.span
                key={`word2-${index}`}
                style={{ opacity: progress }}
                className="inline-block mr-1.5 sm:mr-2"
              >
                {word}
              </motion.span>
            )
          })}
        </p>
      </div>
    </section>
  )
}

// Solution Section - Fully Responsive
function SolutionSection() {
  const features = [
    {
      title: 'Curated Feed',
      description: 'Discover newsletters and content tailored to your interests, powered by intelligent curation.'
    },
    {
      title: 'Writer Tools',
      description: 'Everything you need to create, publish, and grow your newsletter with ease.'
    },
    {
      title: 'Community',
      description: 'Connect with readers and writers who share your passion for meaningful content.'
    },
    {
      title: 'Distribution',
      description: 'Reach the right audience through our network of engaged readers and AI-powered discovery.'
    }
  ]

  return (
    <section className="py-16 sm:py-24 md:py-32 lg:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 border-t border-border/30">
      <motion.div {...fadeUp(0)} className="text-center mb-10 sm:mb-12 md:mb-16">
        <p className="text-xs tracking-[2px] sm:tracking-[3px] uppercase text-muted-foreground mb-3 sm:mb-4">SOLUTION</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-[-0.75px] sm:tracking-[-1px] mb-8 sm:mb-10 md:mb-12 px-4 leading-tight">
          The platform for <span className="font-serif italic font-normal">meaningful</span> content
        </h2>

        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-xl sm:rounded-2xl aspect-video sm:aspect-3/1 object-cover"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            {...fadeUp(0.1 + index * 0.1)}
            className="text-center px-4"
          >
            <h3 className="font-semibold text-sm sm:text-base mb-2">{feature.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// CTA Section - Fully Responsive with HLS Video
function CTASection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const hlsUrl = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(hlsUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play()
      })
      return () => {
        hls.destroy()
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = hlsUrl
      video.play()
    }
  }, [])

  return (
    <section className="relative py-16 sm:py-24 md:py-32 lg:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 border-t border-border/30 overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/45 z-1" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
        <motion.div {...fadeUp(0)} className="flex justify-center mb-4 sm:mb-6">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-foreground/60 flex items-center justify-center">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-foreground/60" />
          </div>
        </motion.div>

        <motion.h2
          {...fadeUp(0.1)}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-[-1.5px] md:tracking-[-2px] mb-4 sm:mb-6 leading-tight px-4"
        >
          Start Your <span className="font-serif italic font-normal">Journey</span>
        </motion.h2>

        <motion.p
          {...fadeUp(0.2)}
          className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 md:mb-10 px-4"
        >
          Join thousands of readers and writers building a more meaningful internet.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-foreground text-background rounded-lg px-6 sm:px-8 py-3 sm:py-3.5 font-semibold text-sm sm:text-base whitespace-nowrap"
          >
            Subscribe Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="liquid-glass rounded-lg px-6 sm:px-8 py-3 sm:py-3.5 font-semibold text-sm sm:text-base whitespace-nowrap"
          >
            Start Writing
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Footer - Fully Responsive
function Footer() {
  return (
    <footer className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 border-t border-border/30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
        <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
          © 2026 Mindloop. All rights reserved.
        </p>
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
          <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default App
