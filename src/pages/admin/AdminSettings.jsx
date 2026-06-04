import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSave, FiUpload, FiMonitor, FiCode, FiFileText } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'

const FONT_OPTIONS = ['Playfair Display', 'Lato', 'Inter', 'Montserrat', 'Poppins', 'Raleway']

function Section({ title, icon: Icon, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-crimson-500" />}
          <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        </div>
      </div>
      <div className="card-body space-y-5">{children}</div>
    </div>
  )
}

function ColorSwatch({ value, onChange, label }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <div className="flex items-center gap-3">
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          className="w-10 h-10 rounded-xl cursor-pointer border border-gray-200 p-0.5 bg-white" />
        <input className="form-input font-mono text-sm" value={value} onChange={e => onChange(e.target.value)} placeholder="#E8192C" />
        <div className="w-8 h-8 rounded-xl border border-gray-200 flex-shrink-0" style={{ background: value }} />
      </div>
    </div>
  )
}

export default function AdminSettings() {
  const { state, dispatch, showToast } = useStore()
  const [form,  setForm]  = useState(state.settings)
  const [dirty, setDirty] = useState(false)

  const setTheme  = (k, v) => { setForm(f => ({ ...f, theme:  { ...f.theme,  [k]: v } })); setDirty(true) }
  const setFooter = (k, v) => { setForm(f => ({ ...f, footer: { ...f.footer, [k]: v } })); setDirty(true) }
  const setSeo    = (k, v) => { setForm(f => ({ ...f, seo:    { ...f.seo,    [k]: v } })); setDirty(true) }

  const save = () => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: form })
    showToast('Settings saved!')
    setDirty(false)
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Theme, SEO, footer &amp; logo configuration</p>
        </div>
        {dirty && (
          <button onClick={save} className="btn-adm-primary">
            <FiSave size={15} /> Save Settings
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Logo Upload */}
        <Section title="Bakery Logo" icon={FiUpload}>
          <div className="upload-zone h-36 flex-col gap-3">
            <span className="text-5xl select-none">🎪</span>
            <div className="text-sm text-gray-500 font-medium">Click to upload new logo</div>
            <div className="text-xs text-gray-400">PNG, SVG · Recommended 200×200px</div>
          </div>
          <div className="text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 font-mono">
            Backend: POST /api/settings/logo (multipart/form-data)
          </div>
        </Section>

        {/* Theme Colors */}
        <Section title="Theme Colors" icon={FiMonitor}>
          <ColorSwatch label="Primary Color (Red)" value={form.theme.primaryColor} onChange={v => setTheme('primaryColor', v)} />
          <ColorSwatch label="Accent Color (Gold)"  value={form.theme.accentColor}  onChange={v => setTheme('accentColor', v)}  />
          <div>
            <label className="form-label">Heading Font</label>
            <select className="form-select" value={form.theme.fontHeading} onChange={e => setTheme('fontHeading', e.target.value)}>
              {FONT_OPTIONS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Body Font</label>
            <select className="form-select" value={form.theme.fontBody} onChange={e => setTheme('fontBody', e.target.value)}>
              {FONT_OPTIONS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          {/* Color preview */}
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <div className="p-4 text-white text-sm font-semibold" style={{ background: form.theme.primaryColor }}>
              Primary — {form.theme.primaryColor}
            </div>
            <div className="p-4 text-white text-sm font-semibold" style={{ background: form.theme.accentColor }}>
              Accent — {form.theme.accentColor}
            </div>
          </div>
        </Section>

        {/* Footer Content */}
        <Section title="Footer Content" icon={FiFileText}>
          <div>
            <label className="form-label">Copyright Text</label>
            <input className="form-input" value={form.footer.copyright} onChange={e => setFooter('copyright', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Footer Tagline</label>
            <input className="form-input" value={form.footer.tagline} onChange={e => setFooter('tagline', e.target.value)} />
          </div>
          <div className="space-y-3">
            {[
              { k: 'showNewsletter', label: 'Show Newsletter Signup' },
              { k: 'showMap',        label: 'Show Embedded Map'      },
            ].map(({ k, label }) => (
              <label key={k} className="flex items-center gap-2.5 cursor-pointer select-none">
                <button type="button" onClick={() => setFooter(k, !form.footer[k])} className="toggle"
                  style={{ background: form.footer[k] ? '#E8192C' : '#E5E7EB' }}>
                  <span className="toggle-thumb" style={{ transform: form.footer[k] ? 'translateX(16px)' : 'translateX(0)' }} />
                </button>
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* SEO */}
        <Section title="SEO Settings" icon={FiCode}>
          <div>
            <label className="form-label">Meta Title</label>
            <input className="form-input" value={form.seo.metaTitle} onChange={e => setSeo('metaTitle', e.target.value)} />
            <p className="text-xs text-gray-400 mt-1">
              {form.seo.metaTitle.length}/60 chars
              {form.seo.metaTitle.length > 60 && <span className="text-amber-500 ml-1">· Too long</span>}
            </p>
          </div>
          <div>
            <label className="form-label">Meta Description</label>
            <textarea className="form-textarea" rows={3} value={form.seo.metaDescription} onChange={e => setSeo('metaDescription', e.target.value)} />
            <p className="text-xs text-gray-400 mt-1">
              {form.seo.metaDescription.length}/160 chars
              {form.seo.metaDescription.length > 160 && <span className="text-amber-500 ml-1">· Too long</span>}
            </p>
          </div>
          <div>
            <label className="form-label">Keywords</label>
            <input className="form-input" value={form.seo.keywords} onChange={e => setSeo('keywords', e.target.value)} />
          </div>
        </Section>

      </div>

      {/* Backend integration reference */}
      <div className="card card-body">
        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <FiCode size={14} className="text-crimson-500" /> Backend Integration Points
        </h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            ['Logo Upload',   'POST /api/settings/logo'  ],
            ['Theme Save',    'PUT  /api/settings/theme' ],
            ['Footer Update', 'PUT  /api/settings/footer'],
            ['SEO Update',    'PUT  /api/settings/seo'   ],
            ['All Settings',  'GET  /api/settings'       ],
          ].map(([label, endpoint]) => (
            <div key={label} className="flex items-center justify-between gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
              <span className="text-xs text-gray-600 font-medium">{label}</span>
              <code className="text-[11px] font-mono text-crimson-600 bg-crimson-50 px-2 py-0.5 rounded">{endpoint}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky save bar */}
      {dirty && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-4 flex items-center justify-between gap-4 bg-white rounded-2xl px-6 py-4 shadow-modal border border-gray-100">
          <span className="text-sm text-gray-600">Unsaved changes detected</span>
          <div className="flex gap-3">
            <button onClick={() => { setForm(state.settings); setDirty(false) }} className="btn-adm-secondary">Discard</button>
            <button onClick={save} className="btn-adm-primary"><FiSave size={14} /> Save All</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
