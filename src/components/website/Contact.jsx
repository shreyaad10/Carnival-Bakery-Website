import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import AnimateOnScroll from './AnimateOnScroll'
import { genId } from '../../utils/helpers'

export default function Contact() {
  const { state, dispatch, showToast } = useStore()
  const { bakeryInfo } = state

  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors,    setErrors]    = useState({})

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      // Save message to the shared store — visible instantly in admin
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id:      genId(),
          name:    form.name,
          email:   form.email,
          phone:   form.phone || '—',
          subject: form.subject || 'General Enquiry',
          message: form.message,
          date:    new Date().toLocaleString('en-IN'),
          read:    false,
        },
      })
      setLoading(false)
      setSubmitted(true)
      setForm({ name:'', email:'', phone:'', subject:'', message:'' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  const INFO = [
    { icon: FiMapPin, label: 'Address',       value: bakeryInfo.address },
    { icon: FiPhone,  label: 'Phone',         value: bakeryInfo.phone   },
    { icon: FiMail,   label: 'Email',         value: bakeryInfo.email   },
    { icon: FiClock,  label: 'Mon – Sat',     value: bakeryInfo.hours.weekdays },
    { icon: FiClock,  label: 'Sunday',        value: bakeryInfo.hours.sunday   },
  ]

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll className="text-center mb-14">
          <span className="section-tag">📍 Get In Touch</span>
          <h2 className="font-playfair font-black text-gray-900 mt-2 mb-4 leading-tight"
            style={{ fontSize: 'clamp(32px,4vw,54px)' }}>
            Visit or <span className="gradient-text">Order Online</span>
          </h2>
          <p className="font-lato text-gray-500 max-w-lg mx-auto text-lg">
            Have a question or want to place a custom order? We'd love to hear from you!
          </p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Info column */}
          <AnimateOnScroll direction="right">
            <h3 className="font-playfair font-bold text-3xl text-gray-900 mb-7">Find Us</h3>
            <div className="space-y-4 mb-8">
              {INFO.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4 p-5 rounded-2xl"
                  style={{ background: 'rgba(232,25,44,0.04)', border: '1px solid rgba(232,25,44,0.1)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(232,25,44,0.1)' }}>
                    <Icon size={18} style={{ color: '#E8192C' }} />
                  </div>
                  <div>
                    <div className="font-lato font-bold text-gray-900 text-sm mb-0.5">{label}</div>
                    <div className="font-lato text-gray-600 text-sm leading-relaxed">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-3xl overflow-hidden shadow-xl flex items-center justify-center"
              style={{ height: 220, background: 'linear-gradient(135deg,#1a0305,#4a0a10,#8B1520)' }}>
              <div className="text-center text-white">
                <div className="text-6xl mb-3 select-none">🗺️</div>
                <div className="font-playfair font-bold text-xl">{bakeryInfo.name}</div>
                <div className="text-white/55 text-sm font-lato mt-1">{bakeryInfo.address.split(',').slice(-2).join(',').trim()}</div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Form column */}
          <AnimateOnScroll delay={0.2}>
            <div className="rounded-3xl p-8 shadow-card-lg bg-white" style={{ border: '1px solid rgba(232,25,44,0.1)' }}>
              <h3 className="font-playfair font-bold text-3xl text-gray-900 mb-7">Send a Message</h3>

              <AnimatePresence>
                {submitted && (
                  <motion.div initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                    className="mb-5 p-4 rounded-2xl flex items-center gap-3 text-white font-lato font-bold"
                    style={{ background: 'linear-gradient(135deg,#10B981,#059669)' }}>
                    <FiCheck size={18} /> Message sent! We'll respond within 24 hours. 🎂
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-lato font-bold text-sm text-gray-700 mb-2">Your Name *</label>
                    <input value={form.name} onChange={set('name')} placeholder="Priya Sharma" className="form-input-web" />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block font-lato font-bold text-sm text-gray-700 mb-2">Phone</label>
                    <input value={form.phone} onChange={set('phone')} placeholder="+91 99799 XXXXX" className="form-input-web" />
                  </div>
                </div>

                <div>
                  <label className="block font-lato font-bold text-sm text-gray-700 mb-2">Email *</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" className="form-input-web" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block font-lato font-bold text-sm text-gray-700 mb-2">Subject</label>
                  <select value={form.subject} onChange={set('subject')} className="form-input-web">
                    <option value="">Select a topic…</option>
                    <option value="Place an Order">Place an Order</option>
                    <option value="Custom Cake / Design">Custom Cake / Design</option>
                    <option value="Bulk / Corporate Order">Bulk / Corporate Order</option>
                    <option value="Feedback">Feedback</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-lato font-bold text-sm text-gray-700 mb-2">Message *</label>
                  <textarea value={form.message} onChange={set('message')} rows={5}
                    placeholder="Tell us about your order, dietary requirements, or any questions…"
                    className="form-input-web resize-none" />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <motion.button type="submit" whileHover={{ scale:1.02,y:-2 }} whileTap={{ scale:.97 }}
                  disabled={loading}
                  className="btn-primary w-full justify-center py-4 text-base mt-2 disabled:opacity-60"
                  style={{ display:'flex' }}>
                  {loading ? (
                    <>
                      <motion.div animate={{ rotate:360 }} transition={{ duration:.8, repeat:Infinity, ease:'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                      Sending…
                    </>
                  ) : (
                    <><FiSend size={18} /> Send Message</>
                  )}
                </motion.button>
              </form>

              <p className="font-lato text-xs text-gray-400 text-center mt-4">
                We typically respond within 24 hours · For urgent orders call{' '}
                <a href={`tel:${bakeryInfo.phone}`} className="text-crimson-600 font-bold" style={{ color:'#E8192C' }}>
                  {bakeryInfo.phone}
                </a>
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
