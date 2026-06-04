import { motion } from 'framer-motion'
import { FEATURES } from '../../data/initialData'
import AnimateOnScroll from './AnimateOnScroll'

export default function WhyChooseUs() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll className="text-center mb-16">
          <span className="section-tag">💡 Why Choose Us</span>
          <h2 className="font-playfair font-black text-gray-900 mt-2 mb-4 leading-tight" style={{ fontSize:'clamp(32px,4vw,54px)' }}>
            The Carnival <span className="gradient-text">Difference</span>
          </h2>
          <p className="font-lato text-gray-500 max-w-xl mx-auto text-lg">Quality, care, and craft in every product we make.</p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FEATURES.map((f, i) => (
            <AnimateOnScroll key={f.id} delay={i * 0.12}>
              <div className="feature-card h-full">
                <motion.div whileHover={{ rotate:12, scale:1.15 }} transition={{ type:'spring', stiffness:300 }} className="text-6xl mb-5 inline-block select-none">{f.icon}</motion.div>
                <h3 className="font-playfair font-bold text-xl text-gray-900 mb-3">{f.title}</h3>
                <p className="font-lato text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.3}>
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background:'linear-gradient(135deg,#1a0305 0%,#E8192C 55%,#8B0000 100%)' }}>
            <div className="p-14 text-center text-white">
              <div className="text-7xl mb-5 select-none">🎪</div>
              <h3 className="font-playfair font-black text-white mb-4 leading-tight" style={{ fontSize:'clamp(26px,3.5vw,40px)' }}>Ready to Taste the Difference?</h3>
              <p className="font-lato text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">Visit us today or place your order online. We deliver across Surat with same-day delivery!</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={()=>document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})} className="btn-primary px-10 py-4 text-base">🍽 Browse Menu</button>
                <button onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} className="btn-outline px-10 py-4 text-base">📍 Visit Us Today</button>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
