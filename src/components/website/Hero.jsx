import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'

function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }) }

export default function Hero() {
  const { state } = useStore()
  const { heroContent, bakeryInfo } = state
  const { scrollY } = useScroll()
  const bgY          = useTransform(scrollY, [0,600], [0,140])
  const contentOpacity = useTransform(scrollY, [0,400], [1,0])
  const contentY     = useTransform(scrollY, [0,400], [0,80])

  return (
    <section id="home" className="hero-section min-h-screen flex items-center relative overflow-hidden">
      <motion.div style={{ y:bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full" style={{ background:'radial-gradient(circle,rgba(232,25,44,0.12) 0%,transparent 70%)' }} />
        <div className="float-1 absolute text-7xl top-[15%] left-[6%] opacity-20 select-none">🎂</div>
        <div className="float-2 absolute text-6xl top-[22%] right-[8%] opacity-20 select-none">🧁</div>
        <div className="float-3 absolute text-5xl bottom-[30%] left-[12%] opacity-15 select-none">🥐</div>
        <div className="float-1 absolute text-6xl bottom-[22%] right-[14%] opacity-15 select-none">🍰</div>
      </motion.div>

      <motion.div style={{ opacity:contentOpacity, y:contentY }} className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:.2 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-lato font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-7">
              {heroContent.badgeText}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity:0,y:50 }} animate={{ opacity:1,y:0 }} transition={{ delay:.35, duration:.85, ease:[.215,.61,.355,1] }}
            className="font-playfair text-white leading-[1.04] mb-7"
            style={{ fontSize:'clamp(42px,6.5vw,86px)', fontWeight:900 }}>
            {/* Split heading so accent word gets gold styling */}
            {heroContent.heading.includes('Happiness') ? (
              <>
                {heroContent.heading.split('Happiness')[0]}
                <em style={{ color:'#C9A84C', fontStyle:'italic' }}>Happiness</em>
                {heroContent.heading.split('Happiness')[1]}
              </>
            ) : heroContent.heading}
          </motion.h1>

          <motion.p initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:.55 }}
            className="text-white/70 font-lato font-light text-xl max-w-xl mb-10 leading-relaxed">
            {heroContent.subheading}
          </motion.p>

          <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:.7 }} className="flex flex-wrap gap-4 mb-16">
            <motion.button whileHover={{ scale:1.05,y:-3 }} whileTap={{ scale:.96 }} onClick={()=>scrollTo('menu')} className="btn-primary text-base px-9 py-4">
              🍽 {heroContent.ctaPrimary}
            </motion.button>
            <motion.button whileHover={{ scale:1.05,y:-3 }} whileTap={{ scale:.96 }} onClick={()=>scrollTo('contact')} className="btn-outline text-base px-9 py-4">
              📞 {heroContent.ctaSecondary}
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.9 }} className="flex flex-wrap gap-10">
            {[['4.9 ★','Google Rating'],['15K+','Happy Customers'],['200+','Menu Items'],['Est. '+bakeryInfo.established,'Years of Craft']].map(([n,l])=>(
              <div key={l} className="text-white">
                <div className="font-playfair font-black text-3xl leading-none" style={{ color:'#C9A84C' }}>{n}</div>
                <div className="text-xs text-white/50 mt-1 font-lato uppercase tracking-widest">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.button animate={{ y:[0,10,0] }} transition={{ repeat:Infinity, duration:1.6 }} onClick={()=>scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/70 transition-colors bg-transparent border-0 cursor-pointer text-2xl">
        <FiArrowDown />
      </motion.button>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background:'linear-gradient(to bottom,transparent,#FFF8F0)' }} />
    </section>
  )
}
