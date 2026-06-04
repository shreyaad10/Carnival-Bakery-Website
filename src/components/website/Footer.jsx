import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMapPin, FiPhone, FiMail, FiArrowUp } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import AnimateOnScroll from './AnimateOnScroll'

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })

const QUICK_LINKS  = ['Home','About','Menu','Gallery','Offers','Contact']
const POPULAR = ['Red Velvet Cake','Sourdough Bread','Macaron Box','Butter Croissants','Custom Cakes','Gift Hampers']

export default function Footer() {
  const { state } = useStore()
  const { bakeryInfo, settings } = state
  const year = new Date().getFullYear()

  const SOCIALS = [
    { Icon: FiFacebook,  href: bakeryInfo.social.facebook,  label: 'Facebook',  bg: '#1877F2' },
    { Icon: FiInstagram, href: bakeryInfo.social.instagram, label: 'Instagram', bg: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' },
    { Icon: FiTwitter,   href: bakeryInfo.social.twitter,   label: 'Twitter',   bg: '#000000' },
    { Icon: FiYoutube,   href: bakeryInfo.social.youtube,   label: 'YouTube',   bg: '#FF0000' },
  ]

  return (
    <footer style={{ background:'#0D0204' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <AnimateOnScroll className="lg:col-span-2">
            <button onClick={() => scrollTo('home')}
              className="font-dancing text-4xl text-white bg-transparent border-0 cursor-pointer mb-5 block">
              🎪 {bakeryInfo.name.split(' ')[0]}<span style={{ color:'#C9A84C' }}> {bakeryInfo.name.split(' ').slice(1).join(' ')}</span>
            </button>
            <p className="font-lato text-white/45 leading-relaxed mb-6 max-w-sm text-sm">
              {bakeryInfo.tagline} — {settings.footer.tagline}
            </p>
            <div className="flex gap-3 mb-6">
              {SOCIALS.map(({ Icon, href, label, bg }) => (
                <motion.a key={label} href={href} whileHover={{ scale:1.18, y:-3 }} whileTap={{ scale:.9 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all"
                  style={{ background:'rgba(255,255,255,0.07)' }}
                  onMouseEnter={e=>(e.currentTarget.style.background=typeof bg==='string'&&bg.startsWith('linear')?bg:bg+'33')}
                  onMouseLeave={e=>(e.currentTarget.style.background='rgba(255,255,255,0.07)')}
                  aria-label={label}>
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['⭐ 4.9 Google Rating','🏆 Best Bakery 2023','✅ FSSAI Certified'].map(b => (
                <span key={b} className="font-lato text-xs text-white/40 px-3 py-1.5 rounded-full"
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>{b}</span>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Quick Links */}
          <AnimateOnScroll delay={0.1}>
            <h4 className="font-lato font-black text-white/60 text-xs uppercase tracking-[2px] mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(l => (
                <li key={l}>
                  <button onClick={() => scrollTo(l.toLowerCase())}
                    className="font-lato text-white/45 hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-0 text-left flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-3"
                      style={{ background:'rgba(232,25,44,0.6)' }} />{l}
                  </button>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>

          {/* Popular Items */}
          <AnimateOnScroll delay={0.2}>
            <h4 className="font-lato font-black text-white/60 text-xs uppercase tracking-[2px] mb-6">Popular Items</h4>
            <ul className="space-y-3">
              {POPULAR.map(item => (
                <li key={item}>
                  <button onClick={() => scrollTo('menu')}
                    className="font-lato text-white/45 hover:text-white transition-colors text-sm cursor-pointer bg-transparent border-0 text-left flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover:w-3"
                      style={{ background:'rgba(201,168,76,0.6)' }} />{item}
                  </button>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>

        {/* Contact strip */}
        <div className="rounded-2xl px-7 py-5 flex flex-wrap items-center gap-6 mb-10"
          style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
          {[
            { Icon:FiMapPin, text: bakeryInfo.address.split(',').slice(0,2).join(',') },
            { Icon:FiPhone,  text: bakeryInfo.phone  },
            { Icon:FiMail,   text: bakeryInfo.email  },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/40">
              <Icon size={13} style={{ color:'#E8192C' }} />
              <span className="font-lato text-sm">{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ borderTop:'1px solid rgba(255,255,255,0.07)' }}>
          <div className="font-lato text-white/25 text-sm text-center sm:text-left">
            {settings.footer.copyright}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Privacy Policy','Terms of Service','Refund Policy'].map(l => (
              <button key={l} className="font-lato text-white/25 hover:text-white/60 transition-colors text-xs cursor-pointer bg-transparent border-0">{l}</button>
            ))}
            <Link to="/admin" className="font-lato text-white/20 hover:text-white/50 transition-colors text-xs no-underline">Admin ↗</Link>
            <motion.button whileHover={{ scale:1.12, y:-4 }} whileTap={{ scale:.92 }} onClick={() => scrollTo('home')}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white border-0 cursor-pointer"
              style={{ background:'linear-gradient(135deg,#E8192C,#CC0E20)' }}>↑</motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
