import { motion } from 'framer-motion'
import { useStore } from '../../context/StoreContext'
import AnimateOnScroll from './AnimateOnScroll'

function OfferCard({ offer, index }) {
  const gradients = [
    'linear-gradient(135deg,#CC0E20,#A80A18)',
    'linear-gradient(135deg,#A80A18,#6E060E)',
    'linear-gradient(135deg,#E8192C,#A80A18)',
    'linear-gradient(135deg,#880812,#6E060E)',
  ]
  const bg = gradients[index % gradients.length]

  return (
    <AnimateOnScroll delay={index * 0.12} direction="up">
      <motion.div whileHover={{ y: -10, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="cursor-pointer h-full">
        <div className="rounded-3xl p-9 text-white h-full flex flex-col shadow-red-md"
          style={{ background: bg }}>
          <div className="text-6xl mb-5 select-none">{offer.icon || '🎁'}</div>
          <div className="font-lato text-xs font-black uppercase tracking-[2px] text-white/55 mb-2">{offer.title}</div>
          <div className="font-playfair font-black text-4xl leading-tight mb-3">{offer.badge}</div>
          <p className="font-lato text-white/75 text-base leading-relaxed mb-8 flex-1">{offer.description}</p>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full py-3.5 rounded-full font-lato font-bold text-sm border-0 cursor-pointer transition-all"
            style={{ background: 'white', color: '#E8192C', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
            Claim Offer →
          </motion.button>
        </div>
      </motion.div>
    </AnimateOnScroll>
  )
}

export default function SpecialOffers() {
  const { state } = useStore()

  // Only show active offers
  const activeOffers = state.offers.filter(o => o.active)

  if (activeOffers.length === 0) return null

  return (
    <section id="offers" className="py-28 pattern-bg">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll className="text-center mb-14">
          <span className="section-tag">🏷 Special Offers</span>
          <h2 className="font-playfair font-black text-gray-900 mt-2 mb-4 leading-tight"
            style={{ fontSize: 'clamp(32px,4vw,54px)' }}>
            Today's <span className="gradient-text">Deals</span>
          </h2>
          <p className="font-lato text-gray-500 max-w-lg mx-auto text-lg">
            Exclusive limited-time offers and seasonal promotions — fresh deals every week!
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-7 mb-12">
          {activeOffers.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>

        {/* Promo banner */}
        <AnimateOnScroll delay={0.3}>
          <motion.div
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(270deg,#E8192C,#8B0000,#C9A84C,#E8192C)', backgroundSize: '300%', boxShadow: '0 8px 40px rgba(232,25,44,0.4)' }}>
            <div className="px-10 py-12 text-center text-white">
              <div className="font-dancing text-5xl md:text-6xl mb-3 select-none">🎪 Grand Carnival Week!</div>
              <p className="font-lato text-white/80 text-lg mb-8">
                Use code{' '}
                <span className="font-black px-3 py-1 rounded-lg text-white mx-1"
                  style={{ background: 'rgba(255,255,255,0.15)', letterSpacing: '1px' }}>
                  CARNIVAL25
                </span>{' '}
                for <strong>25% OFF</strong> your entire order this week only!
              </p>
              <motion.button
                whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.96 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-lato font-black text-base px-12 py-4 rounded-full border-0 cursor-pointer transition-all shadow-lg hover:shadow-xl"
                style={{ background: 'white', color: '#E8192C' }}>
                🛒 Order Now &amp; Save 25%
              </motion.button>
            </div>
          </motion.div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
