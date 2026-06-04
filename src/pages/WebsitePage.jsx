import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Shared store
import { useStore } from '../context/StoreContext'

// Website components
import WebsiteNavbar    from '../components/website/WebsiteNavbar'
import Hero             from '../components/website/Hero'
import About            from '../components/website/About'
import FeaturedProducts from '../components/website/FeaturedProducts'
import BestSellers      from '../components/website/BestSellers'
import WhyChooseUs      from '../components/website/WhyChooseUs'
import Testimonials     from '../components/website/Testimonials'
import Gallery          from '../components/website/Gallery'
import SpecialOffers    from '../components/website/SpecialOffers'
import Contact          from '../components/website/Contact'
import Footer           from '../components/website/Footer'

// Loading screen
function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [visible,  setVisible]  = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => { setVisible(false); setTimeout(onDone, 600) }, 300)
          return 100
        }
        return Math.min(prev + (prev < 70 ? 1.8 : prev < 90 ? 1.2 : 0.7), 100)
      })
    }, 25)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.55 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#1a0305,#3d0a0f,#6b1520)' }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="text-8xl mb-6 select-none">🎪</motion.div>
          <div className="font-dancing text-5xl text-white mb-1 select-none">
            Carnival <span style={{ color: '#C9A84C' }}>Bakery</span>
          </div>
          <div className="font-lato text-white/50 text-sm tracking-widest uppercase mb-12 select-none">
            Freshly Baked Happiness
          </div>
          <div className="w-64 h-1.5 rounded-full overflow-hidden bg-white/10">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="font-lato text-white/30 text-sm mt-3 tabular-nums select-none">
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function WebsitePage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="website-root font-lato" style={{ background: '#FFF8F0', color: '#1a1a1a' }}>
      <Loader onDone={() => setLoaded(true)} />

      {loaded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <WebsiteNavbar />
          <main>
            <Hero />
            <About />
            <FeaturedProducts />
            <BestSellers />
            <WhyChooseUs />
            <Testimonials />
            <Gallery />
            <SpecialOffers />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  )
}
