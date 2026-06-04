import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBell, FiSearch, FiExternalLink } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'

const TITLES = {
  '/admin':             { title:'Dashboard',      sub:'Overview of your bakery' },
  '/admin/products':    { title:'Products',       sub:'Manage your product catalog' },
  '/admin/bestsellers': { title:'Best Sellers',   sub:'Top-performing products' },
  '/admin/offers':      { title:'Special Offers', sub:'Promotions & discounts' },
  '/admin/gallery':     { title:'Gallery',        sub:'Image management' },
  '/admin/testimonials':{ title:'Testimonials',   sub:'Customer reviews' },
  '/admin/messages':    { title:'Messages',       sub:'Contact form submissions' },
  '/admin/bakery-info': { title:'Bakery Info',    sub:'Business details & hours' },
  '/admin/settings':    { title:'Settings',       sub:'Theme, SEO & footer config' },
}

export default function AdminNavbar() {
  const location = useLocation()
  const { stats } = useStore()
  const info = TITLES[location.pathname] ?? { title:'Admin', sub:'' }

  return (
    <motion.header initial={{ y:-20,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{ duration:.35 }}
      className="bg-white border-b border-gray-100 flex items-center justify-between px-6 h-16 flex-shrink-0">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-base font-bold text-gray-900 leading-tight">{info.title}</h1>
          <p className="text-xs text-gray-400 leading-none mt-0.5 hidden sm:block">{info.sub}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-48">
          <FiSearch size={14} className="text-gray-400 flex-shrink-0" />
          <input placeholder="Search…" className="text-sm bg-transparent border-0 outline-none text-gray-700 placeholder:text-gray-400 w-full" />
        </div>
        <Link to="/" className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-crimson-600 transition-colors no-underline font-medium">
          <FiExternalLink size={13} /> Website
        </Link>
        <div className="relative">
          <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 bg-transparent border-0 cursor-pointer transition-colors">
            <FiBell size={18} />
          </button>
          {stats.unreadMessages>0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-crimson-500" />}
        </div>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold select-none cursor-pointer"
          style={{ background:'linear-gradient(135deg,#E8192C,#8B0000)' }}>B</div>
      </div>
    </motion.header>
  )
}
