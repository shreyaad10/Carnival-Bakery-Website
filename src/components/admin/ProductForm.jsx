import { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { CATEGORIES } from '../../data/initialData'

const EMOJIS = ['🎂','🥐','🍪','🍞','🧁','🍫','🍰','🍥','🍩','🎁','🍮','☕','🫓','🍕']
const EMPTY  = { name:'', category:'Cake', price:'', description:'', featured:false, bestSeller:false, status:'active', stock:'', image:'🎂', bgColor:'#FFE5E8', tag:'New' }

export default function ProductForm({ initial, onSubmit, onCancel, submitLabel='Save Product' }) {
  const [form,   setForm]   = useState(initial ?? EMPTY)
  const [errors, setErrors] = useState({})

  const set = (k,v) => { setForm(f=>({...f,[k]:v})); if(errors[k]) setErrors(e=>({...e,[k]:''})) }

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name        = 'Product name required'
    if (!form.price||isNaN(form.price)||Number(form.price)<=0) e.price = 'Enter a valid price'
    if (!form.description.trim()) e.description = 'Description required'
    setErrors(e); return !Object.keys(e).length
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    onSubmit({ ...form, price:Number(form.price), stock:Number(form.stock)||0 })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="form-label">Product Icon</label>
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
          {EMOJIS.map(e=>(
            <button type="button" key={e} onClick={()=>set('image',e)}
              className={`w-10 h-10 rounded-lg text-2xl flex items-center justify-center border-2 cursor-pointer transition-all ${form.image===e?'border-crimson-500 bg-crimson-50 scale-110':'border-transparent bg-white hover:border-gray-300'}`}>{e}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Product Name *</label>
          <input className="form-input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Red Velvet Cake" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="form-label">Category *</label>
          <select className="form-select" value={form.category} onChange={e=>set('category',e.target.value)}>
            {CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Price (₹) *</label>
          <input className="form-input" type="number" min="1" value={form.price} onChange={e=>set('price',e.target.value)} placeholder="850" />
          {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className="form-label">Stock Qty</label>
          <input className="form-input" type="number" min="0" value={form.stock} onChange={e=>set('stock',e.target.value)} placeholder="20" />
        </div>
      </div>

      <div>
        <label className="form-label">Tag Label</label>
        <input className="form-input" value={form.tag} onChange={e=>set('tag',e.target.value)} placeholder="Bestseller · New · Seasonal…" />
      </div>

      <div>
        <label className="form-label">Description *</label>
        <textarea className="form-textarea" rows={3} value={form.description} onChange={e=>set('description',e.target.value)} placeholder="Short product description…" />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="form-label">Status</label>
        <select className="form-select" value={form.status} onChange={e=>set('status',e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex gap-6">
        {[{key:'featured',label:'Featured on Homepage'},{key:'bestSeller',label:'Mark as Best Seller'}].map(({key,label})=>(
          <label key={key} className="flex items-center gap-2.5 cursor-pointer select-none">
            <button type="button" onClick={()=>set(key,!form[key])} className="toggle" style={{ background:form[key]?'#E8192C':'#E5E7EB' }}>
              <span className="toggle-thumb" style={{ transform:form[key]?'translateX(16px)':'translateX(0)' }} />
            </button>
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <button type="button" onClick={onCancel} className="btn-adm-secondary">Cancel</button>
        <button type="submit" className="btn-adm-primary">{submitLabel}</button>
      </div>
    </form>
  )
}
