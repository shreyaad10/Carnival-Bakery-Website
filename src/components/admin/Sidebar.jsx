import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGrid, FiBox, FiStar, FiTag, FiImage, FiMessageSquare, FiMail, FiSettings, FiHome, FiChevronLeft, FiChevronRight, FiGlobe } from 'react-icons/fi'

const NAV = [
  { to:'/admin',             icon:FiGrid,          label:'Dashboard'      },
  { to:'/admin/products',    icon:FiBox,           label:'Products'       },
  { to:'/admin/bestsellers', icon:FiStar,          label:'Best Sellers'   },
  { to:'/admin/offers',      icon:FiTag,           label:'Special Offers' },
  { to:'/admin/gallery',     icon:FiImage,         label:'Gallery'        },
  { to:'/admin/testimonials',icon:FiMessageSquare, label:'Testimonials'   },
  { to:'/admin/messages',    icon:FiMail,          label:'Messages'       },
  { to:'/admin/bakery-info', icon:FiHome,          label:'Bakery Info'    },
  { to:'/admin/settings',    icon:FiSettings,      label:'Settings'       },
]

export default function AdminSidebar({ collapsed, setCollapsed, unreadCount }) {
  const location = useLocation()

  return (
    <motion.aside animate={{ width:collapsed?68:240 }} transition={{ type:'spring', stiffness:320, damping:32 }}
      className="fixed top-0 left-0 h-screen z-50 flex flex-col overflow-hidden" style={{ background:'#0F0204', flexShrink:0 }}>

      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/8 flex-shrink-0" style={{ minHeight:64 }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-lg select-none"
          style={{ background:'linear-gradient(135deg,#E8192C,#8B0000)' }}>🎪</div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-10 }} transition={{ duration:.18 }} className="overflow-hidden whitespace-nowrap">
              <div className="font-playfair font-bold text-white text-sm leading-tight">Carnival</div>
              <div className="text-[10px] text-white/35 font-medium tracking-widest uppercase">Admin Panel</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
        {NAV.map(({ to, icon:Icon, label }) => {
          const active = to==='/admin' ? location.pathname==='/admin' : location.pathname.startsWith(to)
          return (
            <NavLink key={to} to={to} className="block no-underline">
              <motion.div whileHover={{ x:2 }}
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
                style={{ background:active?'rgba(232,25,44,0.18)':'transparent' }}
                onMouseEnter={e=>{ if(!active) e.currentTarget.style.background='rgba(255,255,255,0.05)' }}
                onMouseLeave={e=>{ if(!active) e.currentTarget.style.background='transparent' }}>
                {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-crimson-400" />}
                <div className="relative flex-shrink-0">
                  <Icon size={17} style={{ color:active?'#FF6B7A':'rgba(255,255,255,0.45)' }} />
                  {label==='Messages' && unreadCount>0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-crimson-500 text-white text-[9px] font-bold flex items-center justify-center">{unreadCount>9?'9+':unreadCount}</span>
                  )}
                </div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-8 }} transition={{ duration:.16 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                      style={{ color:active?'white':'rgba(255,255,255,0.5)' }}>{label}</motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          )
        })}

        {/* Back to website link */}
        <div className="pt-3 border-t border-white/8 mt-2">
          <NavLink to="/" className="block no-underline">
            <motion.div whileHover={{ x:2 }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
              style={{ color:'rgba(255,255,255,0.35)' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(255,255,255,0.7)' }}
              onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.35)' }}>
              <FiGlobe size={17} />
              <AnimatePresence>
                {!collapsed && <motion.span initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0 }} transition={{ duration:.16 }} className="text-sm font-medium whitespace-nowrap">View Website</motion.span>}
              </AnimatePresence>
            </motion.div>
          </NavLink>
        </div>
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 pb-4 flex-shrink-0 border-t border-white/8 pt-3">
        <button onClick={()=>setCollapsed(c=>!c)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-transparent border-0 cursor-pointer transition-all"
          style={{ color:'rgba(255,255,255,0.3)' }}
          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='rgba(255,255,255,0.7)' }}
          onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.3)' }}>
          {collapsed ? <FiChevronRight size={16}/> : <><FiChevronLeft size={16}/><span className="text-xs font-medium">Collapse</span></>}
        </button>
      </div>
    </motion.aside>
  )
}
