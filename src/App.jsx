import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

// ── Components ────────────────────────────────────────────────────────────────
import Loader          from './components/Loader'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import About           from './components/About'
import FeaturedProducts from './components/FeaturedProducts'
import BestSellers     from './components/BestSellers'
import WhyChooseUs     from './components/WhyChooseUs'
import Testimonials    from './components/Testimonials'
import Gallery         from './components/Gallery'
import SpecialOffers   from './components/SpecialOffers'
import Contact         from './components/Contact'
import Footer          from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Loading screen — animates out once done */}
      <AnimatePresence>
        {!loaded && <Loader key="loader" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main site — fades in after loader exits */}
      {loaded && (
        <div className="relative">
          <Navbar />

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
        </div>
      )}
    </>
  )
}