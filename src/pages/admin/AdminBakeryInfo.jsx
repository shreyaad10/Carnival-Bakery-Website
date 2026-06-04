import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSave, FiGlobe, FiPhone, FiMail, FiMapPin, FiClock, FiEdit3 } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'

function Section({ title, icon: Icon, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-crimson-500" />}
          <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        </div>
      </div>
      <div className="card-body space-y-4">{children}</div>
    </div>
  )
}

export default function AdminBakeryInfo() {
  const { state, dispatch, showToast } = useStore()
  const [form,      setForm]      = useState(state.bakeryInfo)
  const [heroForm,  setHeroForm]  = useState(state.heroContent)
  const [dirty,     setDirty]     = useState(false)
  const [heroDirty, setHeroDirty] = useState(false)

  const set       = (k, v) => { setForm(f => ({ ...f, [k]: v })); setDirty(true) }
  const setHours  = (k, v) => { setForm(f => ({ ...f, hours:  { ...f.hours,  [k]: v } })); setDirty(true) }
  const setSocial = (k, v) => { setForm(f => ({ ...f, social: { ...f.social, [k]: v } })); setDirty(true) }
  const setHero   = (k, v) => { setHeroForm(f => ({ ...f, [k]: v })); setHeroDirty(true) }

  const saveBakery = () => { dispatch({ type: 'UPDATE_BAKERY_INFO', payload: form });  showToast('Bakery info saved! Website updated.'); setDirty(false) }
  const saveHero   = () => { dispatch({ type: 'UPDATE_HERO',        payload: heroForm }); showToast('Hero content saved! Website updated.'); setHeroDirty(false) }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Bakery Information</h1>
          <p className="page-subtitle">Changes here update the live website instantly</p>
        </div>
        {dirty && (
          <button onClick={saveBakery} className="btn-adm-primary">
            <FiSave size={15} /> Save Changes
          </button>
        )}
      </div>

      {/* Live update notice */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
        <p className="text-sm text-emerald-700 font-medium">
          All changes are reflected on the website in real-time — no page reload needed.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Basic Info */}
        <Section title="Basic Information" icon={FiEdit3}>
          <div>
            <label className="form-label">Bakery Name</label>
            <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Tagline</label>
            <input className="form-input" value={form.tagline} onChange={e => set('tagline', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Year Established</label>
            <input className="form-input" value={form.established} onChange={e => set('established', e.target.value)} placeholder="2008" />
          </div>
          <div>
            <label className="form-label">About / Story</label>
            <textarea className="form-textarea" rows={5} value={form.about} onChange={e => set('about', e.target.value)} />
          </div>
        </Section>

        {/* Contact */}
        <Section title="Contact Details" icon={FiPhone}>
          <div>
            <label className="form-label"><FiMapPin size={11} className="inline mr-1" />Address</label>
            <textarea className="form-textarea" rows={2} value={form.address} onChange={e => set('address', e.target.value)} />
          </div>
          <div>
            <label className="form-label"><FiPhone size={11} className="inline mr-1" />Phone</label>
            <input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 99799 44444" />
          </div>
          <div>
            <label className="form-label"><FiMail size={11} className="inline mr-1" />Email</label>
            <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div>
            <label className="form-label"><FiGlobe size={11} className="inline mr-1" />Website</label>
            <input className="form-input" value={form.website} onChange={e => set('website', e.target.value)} />
          </div>
        </Section>

        {/* Hours */}
        <Section title="Opening Hours" icon={FiClock}>
          <div>
            <label className="form-label">Monday – Saturday</label>
            <input className="form-input" value={form.hours.weekdays} onChange={e => setHours('weekdays', e.target.value)} placeholder="7:00 AM – 9:00 PM" />
          </div>
          <div>
            <label className="form-label">Sunday</label>
            <input className="form-input" value={form.hours.sunday} onChange={e => setHours('sunday', e.target.value)} placeholder="8:00 AM – 8:00 PM" />
          </div>
          {/* Preview */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Live Preview</div>
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex justify-between"><span className="text-gray-500">Mon – Sat</span><span className="font-medium">{form.hours.weekdays}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Sunday</span><span className="font-medium">{form.hours.sunday}</span></div>
            </div>
          </div>
        </Section>

        {/* Social */}
        <Section title="Social Media Links" icon={FiGlobe}>
          {[
            { k: 'facebook',  label: 'Facebook URL',  placeholder: 'https://facebook.com/…'  },
            { k: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/…' },
            { k: 'twitter',   label: 'Twitter URL',   placeholder: 'https://twitter.com/…'   },
            { k: 'youtube',   label: 'YouTube URL',   placeholder: 'https://youtube.com/…'   },
          ].map(({ k, label, placeholder }) => (
            <div key={k}>
              <label className="form-label">{label}</label>
              <input className="form-input" value={form.social[k]} onChange={e => setSocial(k, e.target.value)} placeholder={placeholder} />
            </div>
          ))}
        </Section>

      </div>

      {/* Sticky save bar */}
      {dirty && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-4 flex items-center justify-between gap-4 bg-white rounded-2xl px-6 py-4 shadow-modal border border-gray-100">
          <span className="text-sm text-gray-600">You have unsaved changes — website not yet updated</span>
          <div className="flex gap-3">
            <button onClick={() => { setForm(state.bakeryInfo); setDirty(false) }} className="btn-adm-secondary">Discard</button>
            <button onClick={saveBakery} className="btn-adm-primary"><FiSave size={14} /> Save &amp; Update Website</button>
          </div>
        </motion.div>
      )}

      {/* Hero Section editor */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Homepage Hero Content</h2>
            <p className="text-sm text-gray-500 mt-0.5">Edit heading, subtext and CTA buttons — updates website live</p>
          </div>
          {heroDirty && (
            <button onClick={saveHero} className="btn-adm-primary">
              <FiSave size={15} /> Save Hero
            </button>
          )}
        </div>

        <div className="card card-body space-y-4">
          <div>
            <label className="form-label">Hero Heading</label>
            <input className="form-input text-lg font-bold" value={heroForm.heading} onChange={e => setHero('heading', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Hero Subheading</label>
            <textarea className="form-textarea" rows={2} value={heroForm.subheading} onChange={e => setHero('subheading', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Primary CTA Button</label>
              <input className="form-input" value={heroForm.ctaPrimary} onChange={e => setHero('ctaPrimary', e.target.value)} placeholder="Explore Menu" />
            </div>
            <div>
              <label className="form-label">Secondary CTA Button</label>
              <input className="form-input" value={heroForm.ctaSecondary} onChange={e => setHero('ctaSecondary', e.target.value)} placeholder="Order Now" />
            </div>
          </div>
          <div>
            <label className="form-label">Badge / Eyebrow Text</label>
            <input className="form-input" value={heroForm.badgeText} onChange={e => setHero('badgeText', e.target.value)} />
          </div>

          {/* Hero live preview */}
          <div className="rounded-2xl p-6 mt-2" style={{ background: 'linear-gradient(135deg,#1a0305,#6b1520)' }}>
            <div className="text-xs text-white/40 uppercase tracking-widest mb-3 font-semibold">Live Hero Preview</div>
            <div className="text-white/60 text-xs mb-2">{heroForm.badgeText}</div>
            <div className="text-white font-playfair font-black text-2xl leading-tight mb-2">{heroForm.heading}</div>
            <div className="text-white/60 text-sm mb-4 max-w-xs leading-relaxed">{heroForm.subheading}</div>
            <div className="flex gap-3 flex-wrap">
              <span className="text-xs px-4 py-2 rounded-full font-semibold" style={{ background: '#E8192C', color: 'white' }}>{heroForm.ctaPrimary}</span>
              <span className="text-xs border border-white/40 text-white/80 px-4 py-2 rounded-full font-semibold">{heroForm.ctaSecondary}</span>
            </div>
          </div>

          {heroDirty && (
            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button onClick={saveHero} className="btn-adm-primary"><FiSave size={14} /> Save &amp; Update Website</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
