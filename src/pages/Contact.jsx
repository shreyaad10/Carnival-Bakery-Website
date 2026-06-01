import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import AnimateOnScroll from './AnimateOnScroll'
import { CONTACT_INFO } from '../data/content'

const ICON_MAP = {
  '📍': FiMapPin,
  '📞': FiPhone,
  '📧': FiMail,
  '🕐': FiClock,
}

// Info card
function InfoCard({ info, index }) {
  const Icon = ICON_MAP[info.icon] ?? FiMapPin

  return (
    <AnimateOnScroll delay={index * 0.1}>
      <div
        className="flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'rgba(232,25,44,0.04)',
          border: '1px solid rgba(232,25,44,0.1)',
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(232,25,44,0.1)' }}
        >
          <Icon size={20} style={{ color: '#E8192C' }} />
        </div>
        <div>
          <div className="font-lato font-bold text-gray-900 text-sm mb-0.5">{info.label}</div>
          <div className="font-lato text-gray-600 text-sm leading-relaxed">{info.value}</div>
        </div>
      </div>
    </AnimateOnScroll>
  )
}

// Input component
function FormInput({ label, id, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div>
      <label htmlFor={id} className="block font-lato font-bold text-sm text-gray-700 mb-2">
        {label} {required && <span style={{ color: '#E8192C' }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input"
      />
    </div>
  )
}

// Map placeholder
function MapPlaceholder() {
  return (
    <div
      className="rounded-3xl overflow-hidden shadow-xl flex items-center justify-center"
      style={{
        height: 220,
        background: 'linear-gradient(135deg, #1a0305 0%, #4a0a10 50%, #8B1520 100%)',
      }}
    >
      <div className="text-center text-white px-6">
        <div className="text-6xl mb-3 select-none">🗺️</div>
        <div className="font-playfair font-bold text-xl">42 Ring Road, Adajan</div>
        <div className="font-lato text-white/55 text-sm mt-1">Surat, Gujarat 395009</div>
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 font-lato text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-0.5"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  )
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({
    name:    '',
    email:   '',
    phone:   '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate async submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1200)
  }

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <AnimateOnScroll className="text-center mb-14">
          <span className="section-tag">📍 Get In Touch</span>
          <h2
            className="font-playfair font-black text-gray-900 mt-2 mb-4 leading-tight"
            style={{ fontSize: 'clamp(34px, 4.5vw, 56px)' }}
          >
            Visit or{' '}
            <span className="gradient-text">Order Online</span>
          </h2>
          <p className="font-lato text-gray-500 max-w-lg mx-auto text-lg">
            Have a question, custom cake request, or want to place a bulk order?
            We'd love to hear from you!
          </p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* ── Left column: info + map ────────────────────── */}
          <AnimateOnScroll direction="right">
            <div>
              <h3 className="font-playfair font-bold text-3xl text-gray-900 mb-7">
                Find Us
              </h3>

              {/* Info cards */}
              <div className="space-y-4 mb-8">
                {CONTACT_INFO.map((info, i) => (
                  <InfoCard key={info.id} info={info} index={i} />
                ))}
              </div>

              {/* Map */}
              <MapPlaceholder />

              {/* Social media */}
              <div className="mt-7">
                <p className="font-lato text-sm text-gray-400 uppercase tracking-widest mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: 'f', label: 'Facebook',  bg: '#1877F2' },
                    { icon: '📸', label: 'Instagram', bg: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' },
                    { icon: '𝕏', label: 'Twitter',   bg: '#000' },
                    { icon: '▶', label: 'YouTube',   bg: '#FF0000' },
                  ].map(({ icon, label, bg }) => (
                    <motion.a
                      key={label}
                      href="#"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base select-none shadow-sm"
                      style={{ background: bg }}
                      aria-label={label}
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ── Right column: form ────────────────────────── */}
          <AnimateOnScroll delay={0.2}>
            <div
              className="rounded-3xl p-8 shadow-card-lg"
              style={{ border: '1px solid rgba(232,25,44,0.1)' }}
            >
              <h3 className="font-playfair font-bold text-3xl text-gray-900 mb-7">
                Send a Message
              </h3>

              {/* Success banner */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.95 }}
                    animate={{ opacity: 1, y:   0, scale: 1    }}
                    exit={   { opacity: 0, y: -12               }}
                    className="mb-6 p-4 rounded-2xl flex items-center gap-3 text-white font-lato font-bold"
                    style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <FiCheck size={16} />
                    </div>
                    Message sent! We'll respond within 24 hours. 🎂
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormInput
                    id="name"
                    label="Your Name"
                    placeholder="Priya Sharma"
                    value={form.name}
                    onChange={set('name')}
                    required
                  />
                  <FormInput
                    id="phone"
                    label="Phone"
                    type="tel"
                    placeholder="+91 99799 XXXXX"
                    value={form.phone}
                    onChange={set('phone')}
                  />
                </div>

                {/* Email */}
                <FormInput
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={set('email')}
                  required
                />

                {/* Subject dropdown */}
                <div>
                  <label htmlFor="subject" className="block font-lato font-bold text-sm text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={set('subject')}
                    className="form-input"
                  >
                    <option value="">Select a topic…</option>
                    <option value="order">Place an Order</option>
                    <option value="custom">Custom Cake / Design</option>
                    <option value="bulk">Bulk / Corporate Order</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-lato font-bold text-sm text-gray-700 mb-2">
                    Message <span style={{ color: '#E8192C' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your order, dietary requirements, or any questions…"
                    value={form.message}
                    onChange={set('message')}
                    required
                    className="form-input resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  className="btn-primary w-full justify-center py-4 text-base mt-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FiSend size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {/* Footnote */}
              <p className="font-lato text-xs text-gray-400 text-center mt-4">
                We typically respond within 24 hours · For urgent orders call{' '}
                <a href="tel:+919979944444" className="text-crimson-600 font-bold hover:underline">
                  +91 99799 44444
                </a>
              </p>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  )
}
