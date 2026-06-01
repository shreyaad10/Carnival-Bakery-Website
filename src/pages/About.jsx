import { useRef } from 'react'
import { useInView } from 'framer-motion'
import useCounter from '../hooks/useCounter'
import AnimateOnScroll from './AnimateOnScroll'

// Single animated counter card
function CounterCard({ target, suffix = '', label, trigger }) {
  const count = useCounter(target, 2000, trigger)
  return (
    <div
      className="text-center p-5 rounded-2xl"
      style={{
        background: 'rgba(232,25,44,0.05)',
        border:     '1px solid rgba(232,25,44,0.12)',
      }}
    >
      <div
        className="counter-value mb-1 select-none"
        style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="font-lato text-xs text-gray-500 uppercase tracking-widest leading-tight">
        {label}
      </div>
    </div>
  )
}

export default function About() {
  // Trigger counters only when section enters viewport
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 pattern-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Image / Visual Column ──────────────────────── */}
          <AnimateOnScroll direction="right">
            <div className="relative">
              {/* Main visual card */}
              <div
                className="rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8B0000 0%, #E8192C 55%, #C9A84C 100%)',
                  aspectRatio: '4/5',
                  minHeight: 380,
                }}
              >
                <div className="text-center text-white px-8">
                  <div className="text-[110px] leading-none mb-5 select-none">🎂</div>
                  <div className="font-dancing text-4xl mb-2">Handcrafted with Love</div>
                  <div className="font-lato text-white/65 text-lg">Since 2008</div>

                  {/* Decorative divider */}
                  <div className="flex items-center gap-4 my-5">
                    <div className="flex-1 h-px bg-white/20" />
                    <span className="text-white/40 text-xl">✦</span>
                    <div className="flex-1 h-px bg-white/20" />
                  </div>

                  <p className="font-lato text-white/55 text-sm leading-relaxed max-w-xs mx-auto">
                    Every item baked fresh daily by our team of passionate artisan bakers.
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-6 -right-6 rounded-2xl p-6 text-center min-w-[120px] shadow-2xl"
                style={{
                  background: 'white',
                  boxShadow: '0 8px 40px rgba(232,25,44,0.2)',
                }}
              >
                <div
                  className="counter-value select-none"
                  style={{ fontSize: 48 }}
                >
                  16
                </div>
                <div className="font-lato text-xs text-gray-400 mt-1 uppercase tracking-widest">
                  Years
                </div>
              </div>

              {/* Second floating badge */}
              <div
                className="absolute -top-5 -left-5 rounded-2xl p-4 text-center shadow-xl"
                style={{ background: 'white', boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
              >
                <div className="text-3xl mb-1">⭐</div>
                <div className="font-playfair font-black text-xl text-crimson-600">4.9</div>
                <div className="font-lato text-xs text-gray-400">Rating</div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ── Text Column ────────────────────────────────── */}
          <div>
            <AnimateOnScroll delay={0.1}>
              <span className="section-tag">🎪 Our Story</span>
              <h2 className="font-playfair font-black leading-tight text-gray-900 mb-6"
                  style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}>
                Baking Memories
                <br />
                <span className="gradient-text">Since 2008</span>
              </h2>
              <p className="font-lato text-gray-600 text-lg leading-relaxed mb-5">
                What started as a small family kitchen in Surat has grown into the city's most
                beloved bakery. Carnival Bakery was born from a single belief — that exceptional
                baked goods can transform ordinary moments into unforgettable memories.
              </p>
              <p className="font-lato text-gray-500 leading-relaxed mb-10">
                Our master bakers wake before dawn to craft each item entirely by hand. From our
                signature Red Velvet Dream to our 72-hour sourdough, every product carries the
                soul of our founders — <strong className="text-gray-700">Leela and Ramesh Patel</strong> — who
                believed that the finest ingredients and genuine care are the only secrets
                to truly great baking.
              </p>
            </AnimateOnScroll>

            {/* Counters */}
            <AnimateOnScroll delay={0.25}>
              <div className="grid grid-cols-3 gap-4">
                <CounterCard target={16}    suffix="+"  label="Years Experience" trigger={inView} />
                <CounterCard target={15000} suffix="+"  label="Happy Customers"  trigger={inView} />
                <CounterCard target={200}   suffix="+"  label="Products Served"  trigger={inView} />
              </div>
            </AnimateOnScroll>

            {/* CTA */}
            <AnimateOnScroll delay={0.38}>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary"
                >
                  🍽 View Our Menu
                </button>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-outline-red"
                >
                  📍 Visit Us
                </button>
              </div>
            </AnimateOnScroll>
          </div>

        </div>
      </div>
    </section>
  )
}
