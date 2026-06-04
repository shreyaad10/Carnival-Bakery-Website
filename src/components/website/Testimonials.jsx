import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import AnimateOnScroll from './AnimateOnScroll'

export default function Testimonials() {
  const { state } = useStore()
  const [active, setActive] = useState(0)

  // Only show approved testimonials
  const items = state.testimonials.filter(t => t.approved)

  useEffect(() => {
    if (items.length === 0) return
    const t = setInterval(() => setActive(a => (a + 1) % items.length), 4800)
    return () => clearInterval(t)
  }, [items.length])

  if (items.length === 0) return null

  const safeActive = Math.min(active, items.length - 1)
  const current = items[safeActive]

  const prev = () => setActive(a => (a - 1 + items.length) % items.length)
  const next = () => setActive(a => (a + 1) % items.length)

  return (
    <section className="py-28 pattern-bg">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll className="text-center mb-14">
          <span className="section-tag">💬 Testimonials</span>
          <h2 className="font-playfair font-black text-gray-900 mt-2 mb-4 leading-tight"
            style={{ fontSize: 'clamp(32px,4vw,54px)' }}>
            What Customers <span className="gradient-text">Say</span>
          </h2>
          <p className="font-lato text-gray-500 max-w-lg mx-auto text-lg">
            Don't just take our word for it.
          </p>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={current.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.45 }}>
              <div className="testimonial-card text-center">
                {/* Big decorative quote */}
                <div className="font-playfair absolute -top-2 left-5 leading-none select-none pointer-events-none"
                  style={{ fontSize: 130, color: 'rgba(232,25,44,0.07)', lineHeight: 1 }}>"</div>

                <div className="relative z-10">
                  <div className="flex justify-center mb-5 gap-0.5">
                    {[1,2,3,4,5].map(n => (
                      <span key={n} className={n <= current.rating ? 'star-filled text-2xl' : 'star-empty text-2xl'}>★</span>
                    ))}
                  </div>
                  <p className="font-lato text-gray-700 text-xl leading-relaxed mb-8 italic">
                    "{current.text}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-playfair font-black text-2xl flex-shrink-0"
                      style={{ background: `linear-gradient(135deg,${current.avatarColor || '#E8192C'},#6E060E)` }}>
                      {current.avatar || current.name[0]}
                    </div>
                    <div className="text-left">
                      <div className="font-playfair font-bold text-gray-900 text-lg">{current.name}</div>
                      <div className="text-sm text-gray-400 font-lato">{current.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev}
              className="w-10 h-10 rounded-full border-0 cursor-pointer flex items-center justify-center transition-all"
              style={{ background: 'rgba(232,25,44,0.1)', color: '#E8192C' }}>
              <FiChevronLeft size={18} />
            </button>
            {items.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="rounded-full border-0 cursor-pointer transition-all duration-300"
                style={{ width: safeActive === i ? 28 : 10, height: 10, background: safeActive === i ? '#E8192C' : 'rgba(232,25,44,0.25)' }} />
            ))}
            <button onClick={next}
              className="w-10 h-10 rounded-full border-0 cursor-pointer flex items-center justify-center transition-all"
              style={{ background: 'rgba(232,25,44,0.1)', color: '#E8192C' }}>
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
