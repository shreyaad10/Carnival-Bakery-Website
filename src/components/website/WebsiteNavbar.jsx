import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiSettings } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'

const LINKS = [
  { label:'Home',    id:'home'    },
  { label:'About',   id:'about'   },
  { label:'Menu',    id:'menu'    },
  { label:'Gallery', id:'gallery' },
  { label:'Offers',  id:'offers'  },
  { label:'Contact', id:'contact' },
]

function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }) }

export default function WebsiteNavbar() {
  const { state } = useStore()
  const { bakeryInfo } = state
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleNav = (id) => { scrollTo(id); setMenuOpen(false) }

  return (
    <>
      <motion.nav initial={{ y:-80,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{ duration:.65, ease:'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ background:scrolled?'rgba(26,3,5,0.93)':'transparent', backdropFilter:scrolled?'blur(18px)':'none', WebkitBackdropFilter:scrolled?'blur(18px)':'none', padding:scrolled?'14px 0':'22px 0' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.button whileHover={{ scale:1.05 }} onClick={()=>handleNav('home')}
            className="font-dancing text-3xl text-white bg-transparent border-0 cursor-pointer select-none">
            🎪 {bakeryInfo.name.split(' ')[0]}<span style={{ color:'#C9A84C' }}> {bakeryInfo.name.split(' ').slice(1).join(' ')}</span>
          </motion.button>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map(({ label, id }) => (
              <button key={id} onClick={()=>handleNav(id)} className="nav-link">
                {label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/admin" className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors text-xs font-medium no-underline">
              <FiSettings size={13}/> Admin
            </Link>
            <motion.button whileHover={{ scale:1.05,y:-2 }} whileTap={{ scale:.96 }} onClick={()=>handleNav('contact')} className="btn-primary text-sm py-3 px-6">
              Order Now
            </motion.button>
          </div>

          <button onClick={()=>setMenuOpen(true)} className="md:hidden bg-transparent border-0 cursor-pointer text-white p-2 text-2xl">
            <FiMenu />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div key="bd" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-[60] bg-black/50" onClick={()=>setMenuOpen(false)} />
            <motion.div key="dr" initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }} transition={{ type:'tween', duration:.32 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 flex flex-col" style={{ background:'linear-gradient(180deg,#1a0305,#3d0a0f)' }}>
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="font-dancing text-2xl text-white">🎪 <span style={{ color:'#C9A84C' }}>Carnival</span></span>
                <button onClick={()=>setMenuOpen(false)} className="bg-transparent border-0 text-white/60 hover:text-white text-2xl cursor-pointer"><FiX /></button>
              </div>
              <nav className="flex-1 flex flex-col justify-center gap-1 px-4">
                {LINKS.map(({ label, id }, i) => (
                  <motion.button key={id} initial={{ opacity:0,x:30 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*.07 }}
                    onClick={()=>handleNav(id)}
                    className="w-full text-left px-4 py-3.5 rounded-xl font-lato font-bold text-lg cursor-pointer bg-transparent border-0 text-white/70 hover:text-white hover:bg-white/8 transition-all">
                    {label}
                  </motion.button>
                ))}
              </nav>
              <div className="px-6 py-6 border-t border-white/10 flex flex-col gap-3">
                <button onClick={()=>handleNav('contact')} className="btn-primary w-full justify-center">🛒 Order Now</button>
                <Link to="/admin" className="text-center text-xs text-white/30 hover:text-white/60 no-underline transition-colors">Admin Panel →</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
