import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiZoomIn } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import AnimateOnScroll from './AnimateOnScroll'

function Lightbox({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div key="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.93)' }} onClick={onClose}>
          <motion.div initial={{ scale: 0.65, rotate: -6 }} animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.65 }} transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            onClick={e => e.stopPropagation()}
            className="relative rounded-3xl overflow-hidden flex flex-col items-center justify-center text-white text-center"
            style={{ background: item.bg, width: 'min(520px,90vw)', height: 'min(460px,80vh)' }}>
            <motion.div animate={{ y: [0,-12,0] }} transition={{ duration: 3, repeat: Infinity }}
              className="text-[120px] leading-none select-none mb-5">{item.emoji}</motion.div>
            <div className="font-playfair font-black text-3xl">{item.label}</div>
            <div className="font-lato text-white/55 text-sm mt-2 uppercase tracking-widest">Carnival Bakery · Handcrafted</div>
          </motion.div>
          <button onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer border-0 transition-all"
            style={{ background: 'rgba(255,255,255,0.12)' }}>
            <FiX size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Gallery() {
  const { state } = useStore()
  const [lightbox, setLightbox] = useState(null)

  // Only show visible items, sorted by order
  const items = [...state.gallery]
    .filter(g => g.visible)
    .sort((a, b) => a.order - b.order)

  if (items.length === 0) return null

  return (
    <section id="gallery" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll className="text-center mb-14">
          <span className="section-tag">📸 Gallery</span>
          <h2 className="font-playfair font-black text-gray-900 mt-2 mb-4 leading-tight"
            style={{ fontSize: 'clamp(32px,4vw,54px)' }}>
            Our Creations in <span className="gradient-text">Focus</span>
          </h2>
          <p className="font-lato text-gray-500 max-w-lg mx-auto text-lg">
            Every item is a work of art. Browse through our most beautiful creations.
          </p>
        </AnimateOnScroll>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {items.map((item, i) => (
            <AnimateOnScroll key={item.id} delay={i * 0.06} className="break-inside-avoid mb-4">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
                onClick={() => setLightbox(item)}
                className="gallery-item relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ height: item.size === 'tall' ? 320 : 200 }}>
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: item.bg || 'linear-gradient(135deg,#E8192C,#8B0000)' }}>
                  <motion.div whileHover={{ scale: 1.12, rotate: 4 }} transition={{ type: 'spring', stiffness: 250 }}
                    className="text-8xl leading-none select-none">{item.emoji}</motion.div>
                </div>
                <div className="gallery-overlay rounded-2xl">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-playfair font-bold text-white text-lg">{item.label}</span>
                    <FiZoomIn size={20} className="text-white/80" />
                  </div>
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.2} className="text-center mt-12">
          <p className="font-lato text-gray-400 text-sm mb-4 uppercase tracking-widest">Follow us for daily updates</p>
          <button className="btn-outline-red px-9 py-3.5">📸 @CarnivalBakery on Instagram</button>
        </AnimateOnScroll>
      </div>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  )
}
