import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useStore } from '../../context/StoreContext'
import AnimateOnScroll from './AnimateOnScroll'
import useCounter from '../../hooks/useCounter'

function CounterCard({ target, suffix='', label, trigger }) {
  const count = useCounter(target, 2000, trigger)
  return (
    <div className="text-center p-5 rounded-2xl" style={{ background:'rgba(232,25,44,0.05)', border:'1px solid rgba(232,25,44,0.12)' }}>
      <div className="font-playfair font-black leading-none mb-1 select-none" style={{ fontSize:'clamp(28px,4vw,48px)', color:'#E8192C' }}>{count.toLocaleString()}{suffix}</div>
      <div className="font-lato text-xs text-gray-500 uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function About() {
  const { state } = useStore()
  const { bakeryInfo } = state
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-100px' })

  return (
    <section id="about" className="py-28 pattern-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <AnimateOnScroll direction="right">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
                style={{ background:'linear-gradient(135deg,#8B0000 0%,#E8192C 55%,#C9A84C 100%)', aspectRatio:'4/5', minHeight:380 }}>
                <div className="text-center text-white px-8">
                  <div className="text-[110px] leading-none mb-5 select-none">🎂</div>
                  <div className="font-dancing text-4xl mb-2">Handcrafted with Love</div>
                  <div className="font-lato text-white/65 text-lg">Since {bakeryInfo.established}</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl p-6 text-center min-w-[120px] shadow-2xl bg-white" style={{ boxShadow:'0 8px 40px rgba(232,25,44,.2)' }}>
                <div className="font-playfair font-black select-none" style={{ fontSize:48, color:'#E8192C', lineHeight:1 }}>{parseInt(new Date().getFullYear()) - parseInt(bakeryInfo.established)}</div>
                <div className="font-lato text-xs text-gray-400 mt-1 uppercase tracking-widest">Years</div>
              </div>
            </div>
          </AnimateOnScroll>

          <div>
            <AnimateOnScroll delay={0.1}>
              <span className="section-tag">🎪 Our Story</span>
              <h2 className="font-playfair font-black leading-tight text-gray-900 mb-6" style={{ fontSize:'clamp(34px,4vw,52px)' }}>
                Baking Memories<br/><span className="gradient-text">Since {bakeryInfo.established}</span>
              </h2>
              <p className="font-lato text-gray-600 text-lg leading-relaxed mb-5">{bakeryInfo.about}</p>
              <p className="font-lato text-gray-500 leading-relaxed mb-8">
                Our master bakers wake before dawn to craft each item entirely by hand. From our signature Red Velvet Dream to our 72-hour sourdough, every product carries the passion of our founders.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.25}>
              <div className="grid grid-cols-3 gap-4">
                <CounterCard target={parseInt(new Date().getFullYear())-parseInt(bakeryInfo.established)} suffix="+" label="Years" trigger={inView} />
                <CounterCard target={15000} suffix="+" label="Customers" trigger={inView} />
                <CounterCard target={200}   suffix="+" label="Products"  trigger={inView} />
              </div>
            </AnimateOnScroll>
          </div>

        </div>
      </div>
    </section>
  )
}
