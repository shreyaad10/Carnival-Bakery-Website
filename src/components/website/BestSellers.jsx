import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import AnimateOnScroll from './AnimateOnScroll'

export default function BestSellers() {
  const { state } = useStore()
  const [active, setActive] = useState(0)

  const items = state.products.filter(p => p.bestSeller && p.status === 'active')
  if (items.length === 0) return null

  const safeActive = Math.min(active, items.length - 1)
  const current = items[safeActive]

  const prev = () => setActive(a => (a - 1 + items.length) % items.length)
  const next = () => setActive(a => (a + 1) % items.length)

  return (
    <section className="py-28 pattern-bg">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll className="text-center mb-14">
          <span className="section-tag">⭐ Best Sellers</span>
          <h2 className="font-playfair font-black text-gray-900 mt-2 mb-4 leading-tight" style={{ fontSize:'clamp(32px,4vw,54px)' }}>
            Customer <span className="gradient-text">Favourites</span>
          </h2>
          <p className="font-lato text-gray-500 max-w-lg mx-auto text-lg">The most-loved items our customers keep coming back for.</p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Visual panel */}
          <AnimateOnScroll direction="right">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ background:'linear-gradient(160deg,#1a0305,#4a0a10,#8B1520)', minHeight:420 }}>
              <AnimatePresence mode="wait">
                <motion.div key={current.id} initial={{ opacity:0,scale:.65,rotate:-8 }} animate={{ opacity:1,scale:1,rotate:0 }}
                  exit={{ opacity:0,scale:.65,rotate:8 }} transition={{ duration:.45, type:'spring', stiffness:200 }}
                  className="flex flex-col items-center justify-center text-white text-center px-10 py-16">
                  <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:3,repeat:Infinity }} className="text-[110px] leading-none mb-6 select-none">{current.image}</motion.div>
                  <div className="font-playfair font-black text-3xl mb-2">{current.name}</div>
                  <div className="text-white/60 font-lato mb-4 max-w-xs leading-relaxed text-sm">{current.description}</div>
                  <div className="font-playfair font-black text-3xl" style={{ color:'#C9A84C' }}>₹{current.price}</div>
                  <div className="flex gap-0.5 mt-2">{[1,2,3,4,5].map(n=><span key={n} className="star-filled text-base">★</span>)}</div>
                </motion.div>
              </AnimatePresence>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border-0 cursor-pointer"><FiChevronLeft size={20}/></button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border-0 cursor-pointer"><FiChevronRight size={20}/></button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                {items.map((_,i)=>(
                  <button key={i} onClick={()=>setActive(i)} className="rounded-full border-0 cursor-pointer transition-all duration-300"
                    style={{ width:safeActive===i?24:8, height:8, background:safeActive===i?'#C9A84C':'rgba(255,255,255,0.3)' }} />
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Selector list */}
          <div className="space-y-4">
            {items.map((item, i) => (
              <AnimateOnScroll key={item.id} delay={i * 0.1}>
                <motion.div whileHover={{ x:4 }} onClick={()=>setActive(i)} className="cursor-pointer rounded-2xl p-5 flex items-center gap-4 transition-all duration-300"
                  style={{ background:safeActive===i?'white':'rgba(255,255,255,0.55)', boxShadow:safeActive===i?'0 8px 32px rgba(232,25,44,.14)':'none', border:safeActive===i?'2px solid rgba(232,25,44,.18)':'2px solid transparent' }}>
                  <div className="text-4xl flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl select-none"
                    style={{ background:safeActive===i?'rgba(232,25,44,.08)':'rgba(0,0,0,.04)' }}>{item.image}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-playfair font-bold text-lg text-gray-900 truncate">{item.name}</div>
                    <div className="text-xs text-gray-400 font-lato mt-0.5 truncate">{item.description}</div>
                    <div className="flex gap-0.5 mt-1">{[1,2,3,4,5].map(n=><span key={n} className="star-filled text-xs">★</span>)}</div>
                  </div>
                  <div className="font-playfair font-black text-xl flex-shrink-0" style={{ color:'#E8192C' }}>₹{item.price}</div>
                </motion.div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
