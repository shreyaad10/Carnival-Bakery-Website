import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// Individual floating bakery emoji decoration
function FloatingEmoji({ emoji, className, style }) {
  return (
    <div className={`absolute select-none pointer-events-none text-white/20 ${className}`} style={style}>
      {emoji}
    </div>
  )
}

// Animated hero stat pill
function StatPill({ number, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white"
    >
      <div
        className="font-playfair font-black text-3xl leading-none"
        style={{ color: '#C9A84C' }}
      >
        {number}
      </div>
      <div className="font-lato text-xs text-white/50 mt-1 uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)

  // Parallax on scroll
  const { scrollY }   = useScroll()
  const bgY           = useTransform(scrollY, [0, 600], [0, 140])
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const contentY      = useTransform(scrollY, [0, 400], [0, 80])

  // Stagger entrance animation delays
  const stagger = [0.2, 0.38, 0.54, 0.68, 0.82, 1.0]

  return (
    <section
      id="home"
      ref={containerRef}
      className="hero-section min-h-screen flex items-center relative overflow-hidden"
    >
      {/* ── Parallax Background Layer ───────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Glow blob */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 65%)',
          }}
        />
        {/* Floating emojis */}
        <FloatingEmoji emoji="🎂" className="float-1 text-7xl top-[15%] left-[6%]"  />
        <FloatingEmoji emoji="🧁" className="float-2 text-6xl top-[22%] right-[8%]" />
        <FloatingEmoji emoji="🥐" className="float-3 text-5xl bottom-[30%] left-[12%]" />
        <FloatingEmoji emoji="🍰" className="float-1 text-6xl bottom-[22%] right-[14%]" />
        <FloatingEmoji emoji="🍞" className="float-2 text-4xl top-[55%] left-[4%]"  />
        <FloatingEmoji emoji="🍪" className="float-3 text-5xl top-[10%] left-[45%]" />
      </motion.div>

      {/* ── Main Content ─────────────────────────────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stagger[0], duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-lato font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-7">
              🎪 Est. 2008 &nbsp;·&nbsp; Premium Artisan Bakery · Surat
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stagger[1], duration: 0.85, ease: [0.215, 0.61, 0.355, 1] }}
            className="font-playfair text-white leading-[1.04] mb-7"
            style={{ fontSize: 'clamp(44px, 7vw, 90px)', fontWeight: 900 }}
          >
            Freshly Baked
            <br />
            <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Happiness</em>
            <br />
            Every Day
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stagger[2], duration: 0.75 }}
            className="text-white/70 font-lato font-light text-xl max-w-xl mb-10 leading-relaxed"
          >
            Handcrafted cakes, artisan breads &amp; exquisite pastries — made with love
            and the finest ingredients, because every bite deserves to be extraordinary.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stagger[3], duration: 0.7 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('menu')}
              className="btn-primary text-base px-9 py-4"
            >
              🍽 Explore Menu
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('contact')}
              className="btn-outline text-base px-9 py-4"
            >
              📞 Order Now
            </motion.button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stagger[4], duration: 0.7 }}
            className="flex flex-wrap items-center gap-10"
          >
            {[
              { number: '4.9 ★', label: 'Google Rating' },
              { number: '15K+',  label: 'Happy Customers' },
              { number: '200+',  label: 'Menu Items' },
              { number: '16 Yrs', label: 'Experience' },
            ].map((s) => (
              <StatPill key={s.label} {...s} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/70 transition-colors bg-transparent border-0 cursor-pointer text-2xl"
        aria-label="Scroll down"
      >
        <FiArrowDown />
      </motion.button>

      {/* ── Bottom gradient fade ──────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FFF8F0)' }}
      />
    </section>
  )
}
