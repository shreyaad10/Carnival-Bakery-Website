import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiBox, FiStar, FiTag, FiMessageSquare, FiMail, FiImage, FiTrendingUp, FiClock } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import StatsCard from '../../components/admin/StatsCard'
import { formatCurrency } from '../../utils/helpers'

function SectionCard({ title, children, action }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}

export default function AdminDashboard() {
  const { state, stats } = useStore()
  const navigate = useNavigate()

  const CARDS = [
    { title:'Total Products',    value:stats.totalProducts,          icon:<FiBox />,          color:'#E8192C', delta:8,  to:'/admin/products'     },
    { title:'Featured Products', value:stats.featuredProducts,       icon:<FiStar />,          color:'#C9A84C', delta:0,  to:'/admin/products'     },
    { title:'Active Offers',     value:stats.activeOffers,           icon:<FiTag />,           color:'#8B5CF6', delta:2,  to:'/admin/offers'       },
    { title:'Best Sellers',      value:stats.bestSellers,            icon:<FiTrendingUp />,    color:'#06B6D4', delta:1,  to:'/admin/bestsellers'  },
    { title:'Testimonials',      value:stats.approvedTestimonials,   icon:<FiMessageSquare />, color:'#10B981', delta:5,  to:'/admin/testimonials' },
    { title:'Gallery Images',    value:stats.galleryItems,           icon:<FiImage />,         color:'#F59E0B', delta:0,  to:'/admin/gallery'      },
    { title:'Total Messages',    value:stats.totalMessages,          icon:<FiMail />,          color:'#6366F1', delta:12, to:'/admin/messages'     },
    { title:'Unread Messages',   value:stats.unreadMessages,         icon:<FiMail />,          color:'#EF4444', delta:-3, to:'/admin/messages'     },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <motion.div initial={{ opacity:0,y:-16 }} animate={{ opacity:1,y:0 }}
        className="rounded-2xl p-6 text-white overflow-hidden relative"
        style={{ background:'linear-gradient(135deg,#1a0305 0%,#6b1520 50%,#E8192C 100%)' }}>
        <div className="relative z-10">
          <div className="text-2xl font-bold mb-1">
            Good {new Date().getHours()<12?'Morning':new Date().getHours()<17?'Afternoon':'Evening'}, Owner 👋
          </div>
          <p className="text-white/65 text-sm">Welcome back to Carnival Bakery Admin. Here's your bakery at a glance.</p>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="bg-white/15 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">🟢 Website Live</span>
            {stats.unreadMessages > 0 && (
              <span className="bg-white/15 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">
                📬 {stats.unreadMessages} Unread Messages
              </span>
            )}
            <span className="bg-white/15 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full">
              🛒 {stats.activeOffers} Active Offers
            </span>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[80px] opacity-10 select-none pointer-events-none">🎂</div>
      </motion.div>

      {/* Stats */}
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Quick Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CARDS.map((c,i) => <StatsCard key={c.title} {...c} index={i} onClick={()=>navigate(c.to)} deltaLabel="vs last month" />)}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Recent Messages" action={
          <button onClick={()=>navigate('/admin/messages')} className="text-xs text-crimson-500 font-semibold hover:text-crimson-700 bg-transparent border-0 cursor-pointer">View all →</button>
        }>
          <div className="divide-y divide-gray-50">
            {state.messages.slice(0,4).map(msg=>(
              <div key={msg.id} className="px-6 py-3.5 flex items-start gap-3 hover:bg-gray-50/60 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${msg.read?'bg-gray-200':'bg-crimson-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-semibold truncate ${msg.read?'text-gray-600':'text-gray-900'}`}>{msg.name}</span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0 flex items-center gap-1"><FiClock size={9}/>{msg.date.toString().split(' ')[0]}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{msg.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Product Overview" action={
          <button onClick={()=>navigate('/admin/products')} className="text-xs text-crimson-500 font-semibold hover:text-crimson-700 bg-transparent border-0 cursor-pointer">Manage →</button>
        }>
          <div className="divide-y divide-gray-50">
            {state.products.slice(0,5).map(p=>(
              <div key={p.id} className="px-6 py-3 flex items-center gap-3 hover:bg-gray-50/60 transition-colors">
                <span className="text-2xl w-9 flex-shrink-0 select-none">{p.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.category} · Stock: {p.stock}</div>
                </div>
                <div className="text-sm font-bold text-crimson-600">{formatCurrency(p.price)}</div>
                <span className={`badge ${p.status==='active'?'badge-green':'badge-gray'}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label:'Add Product',   emoji:'➕', to:'/admin/products'    },
            { label:'New Offer',     emoji:'🏷',  to:'/admin/offers'      },
            { label:'Upload Image',  emoji:'🖼',  to:'/admin/gallery'     },
            { label:'View Messages', emoji:'📬', to:'/admin/messages'    },
          ].map(item=>(
            <motion.button key={item.label} whileHover={{ y:-2 }} whileTap={{ scale:.97 }} onClick={()=>navigate(item.to)}
              className="card p-4 flex flex-col items-center gap-2 cursor-pointer border-0 text-center hover:shadow-card-lg transition-shadow">
              <span className="text-3xl select-none">{item.emoji}</span>
              <span className="text-xs font-semibold text-gray-700">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
