import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingCart } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import AnimateOnScroll from './AnimateOnScroll'

const ALL_CATS = ['All', 'Cake', 'Pastry', 'Bread', 'Cookies', 'Cupcake']

function ProductCard({ product, index }) {
  const [added, setAdded] = useState(false)
  const handleAdd = () => { setAdded(true); setTimeout(()=>setAdded(false), 1800) }

  return (
    <motion.div layout initial={{ opacity:0,scale:.88,y:24 }} animate={{ opacity:1,scale:1,y:0 }} exit={{ opacity:0,scale:.88 }}
      transition={{ delay:index*.07 }}>
      <div className="product-card">
        <div className="h-52 flex items-center justify-center relative overflow-hidden" style={{ background:product.bgColor||'#FFF0F0' }}>
          <motion.span whileHover={{ scale:1.15, rotate:5 }} transition={{ type:'spring', stiffness:300 }} className="text-[88px] leading-none select-none">{product.image}</motion.span>
          <span className="absolute top-4 left-4 bg-white text-crimson-600 text-[11px] font-lato font-black uppercase tracking-wide py-1.5 px-3 rounded-full shadow-sm">{product.tag}</span>
          <span className="absolute top-4 right-4 bg-crimson-500 text-white text-[11px] font-lato font-bold py-1 px-3 rounded-full">{product.category}</span>
        </div>
        <div className="p-6">
          <h3 className="font-playfair font-bold text-xl text-gray-900 mb-1.5">{product.name}</h3>
          <p className="font-lato text-gray-500 text-sm leading-relaxed mb-5">{product.description}</p>
          <div className="flex items-center justify-between gap-3">
            <span className="font-playfair font-black text-2xl" style={{ color:'#E8192C' }}>₹{product.price}</span>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:.95 }} onClick={handleAdd}
              className="flex items-center gap-2 font-lato font-bold text-sm px-5 py-2.5 rounded-full border-0 cursor-pointer transition-all duration-300"
              style={{ background:added?'#10B981':'linear-gradient(135deg,#E8192C,#CC0E20)', color:'white', boxShadow:added?'none':'0 4px 14px rgba(232,25,44,.35)' }}>
              <FiShoppingCart size={14} />{added?'Added ✓':'Add to Cart'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedProducts() {
  const { state } = useStore()
  const [activeCat, setActiveCat] = useState('All')

  // Only show active products
  const active = state.products.filter(p => p.status === 'active')
  const filtered = activeCat === 'All' ? active : active.filter(p => p.category === activeCat)

  // Only show categories that have active products
  const availableCats = ['All', ...new Set(active.map(p => p.category))]

  return (
    <section id="menu" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll className="text-center mb-4">
          <span className="section-tag">🍰 Featured Products</span>
          <h2 className="font-playfair font-black text-gray-900 mt-2 mb-4 leading-tight" style={{ fontSize:'clamp(32px,4vw,54px)' }}>
            Crafted with <span className="gradient-text">Passion</span>
          </h2>
          <p className="font-lato text-gray-500 max-w-xl mx-auto text-lg">Our signature collection, made fresh every day.</p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15} className="flex flex-wrap justify-center gap-3 my-10">
          {availableCats.map(cat => (
            <motion.button key={cat} whileTap={{ scale:.95 }} onClick={() => setActiveCat(cat)}
              className="px-6 py-2.5 rounded-full font-lato font-bold text-sm transition-all duration-300 border-0 cursor-pointer"
              style={{ background:activeCat===cat?'linear-gradient(135deg,#E8192C,#CC0E20)':'rgba(232,25,44,0.07)', color:activeCat===cat?'white':'#E8192C', boxShadow:activeCat===cat?'0 4px 16px rgba(232,25,44,.35)':'none' }}>
              {cat}
            </motion.button>
          ))}
        </AnimateOnScroll>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 font-lato">No products available in this category yet.</div>
        )}
      </div>
    </section>
  )
}
