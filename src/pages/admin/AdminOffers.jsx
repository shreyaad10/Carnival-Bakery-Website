import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import Modal from '../../components/admin/Modal'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { genId, formatDate } from '../../utils/helpers'

const ICONS = ['🌅','🎉','🎂','🎪','🏷','🍰','🥐','🎁']
const EMPTY = { title:'', description:'', discount:'', badge:'', icon:'🏷', startDate:'', endDate:'', active:true }

function OfferForm({ initial, onSubmit, onCancel, submitLabel='Save Offer' }) {
  const [form, setForm] = useState(initial ?? EMPTY)
  const [errors, setErrors] = useState({})
  const set = (k,v) => { setForm(f=>({...f,[k]:v})); if(errors[k]) setErrors(e=>({...e,[k]:''})) }

  const validate = () => {
    const e = {}
    if (!form.title.trim())       e.title       = 'Title required'
    if (!form.description.trim()) e.description = 'Description required'
    if (!form.badge.trim())       e.badge       = 'Badge text required'
    setErrors(e); return !Object.keys(e).length
  }

  const handleSubmit = ev => { ev.preventDefault(); if (!validate()) return; onSubmit({ ...form, discount:Number(form.discount)||0 }) }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label">Icon</label>
        <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-xl border border-gray-200">
          {ICONS.map(ic=><button type="button" key={ic} onClick={()=>set('icon',ic)}
            className={`w-10 h-10 rounded-lg text-2xl flex items-center justify-center border-2 cursor-pointer transition-all ${form.icon===ic?'border-crimson-500 bg-crimson-50 scale-110':'border-transparent bg-white hover:border-gray-300'}`}>{ic}</button>)}
        </div>
      </div>
      <div><label className="form-label">Offer Title *</label><input className="form-input" value={form.title} onChange={e=>set('title',e.target.value)} placeholder="Morning Special"/>{errors.title&&<p className="text-xs text-red-500 mt-1">{errors.title}</p>}</div>
      <div><label className="form-label">Badge Text *</label><input className="form-input" value={form.badge} onChange={e=>set('badge',e.target.value)} placeholder="20% OFF"/>{errors.badge&&<p className="text-xs text-red-500 mt-1">{errors.badge}</p>}</div>
      <div><label className="form-label">Description *</label><textarea className="form-textarea" rows={2} value={form.description} onChange={e=>set('description',e.target.value)} placeholder="All pastries before 10 AM…"/>{errors.description&&<p className="text-xs text-red-500 mt-1">{errors.description}</p>}</div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="form-label">Discount %</label><input className="form-input" type="number" min="0" max="100" value={form.discount} onChange={e=>set('discount',e.target.value)} placeholder="20"/></div>
        <div><label className="form-label">Status</label>
          <label className="flex items-center gap-2.5 cursor-pointer mt-1.5 select-none">
            <button type="button" onClick={()=>set('active',!form.active)} className="toggle" style={{ background:form.active?'#E8192C':'#E5E7EB' }}>
              <span className="toggle-thumb" style={{ transform:form.active?'translateX(16px)':'translateX(0)' }}/>
            </button>
            <span className="text-sm text-gray-700">{form.active?'Active (live)':'Inactive'}</span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="form-label">Start Date</label><input className="form-input" type="date" value={form.startDate} onChange={e=>set('startDate',e.target.value)}/></div>
        <div><label className="form-label">End Date</label><input className="form-input" type="date" value={form.endDate} onChange={e=>set('endDate',e.target.value)}/></div>
      </div>
      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <button type="button" onClick={onCancel} className="btn-adm-secondary">Cancel</button>
        <button type="submit" className="btn-adm-primary">{submitLabel}</button>
      </div>
    </form>
  )
}

function OfferCard({ offer, onEdit, onDelete, onToggle, index }) {
  return (
    <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:index*.07 }} className="card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl select-none">{offer.icon||'🏷'}</span>
            <h3 className="text-base font-bold text-gray-900">{offer.title}</h3>
            <span className={`badge ${offer.active?'badge-green':'badge-gray'}`}>{offer.active?'Live':'Inactive'}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{offer.description}</p>
        </div>
      </div>
      <div className="px-3 py-2 rounded-xl text-sm font-bold text-white self-start" style={{ background:'linear-gradient(135deg,#E8192C,#CC0E20)' }}>
        {offer.badge}{offer.discount>0&&<span className="ml-2 opacity-75 font-normal text-xs">{offer.discount}% off</span>}
      </div>
      {(offer.startDate||offer.endDate)&&(
        <div className="text-xs text-gray-400 flex gap-3">
          {offer.startDate&&<span>From: <strong className="text-gray-600">{formatDate(offer.startDate)}</strong></span>}
          {offer.endDate&&<span>Until: <strong className="text-gray-600">{formatDate(offer.endDate)}</strong></span>}
        </div>
      )}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <button onClick={()=>onToggle(offer)} className={`btn text-xs gap-1.5 ${offer.active?'btn-adm-secondary':'btn-adm-success'}`}>
          {offer.active?<FiToggleRight size={14}/>:<FiToggleLeft size={14}/>}{offer.active?'Deactivate':'Activate'}
        </button>
        <button onClick={()=>onEdit(offer)} className="btn-icon btn-adm-ghost text-blue-500 hover:bg-blue-50 ml-auto"><FiEdit2 size={14}/></button>
        <button onClick={()=>onDelete(offer.id)} className="btn-icon btn-adm-ghost text-red-500 hover:bg-red-50"><FiTrash2 size={14}/></button>
      </div>
    </motion.div>
  )
}

export default function AdminOffers() {
  const { state, dispatch, showToast } = useStore()
  const [addOpen,  setAddOpen]  = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const handleAdd    = d => { dispatch({ type:'ADD_OFFER',    payload:{ ...d, id:genId() } }); showToast('Offer created!'); setAddOpen(false) }
  const handleEdit   = d => { dispatch({ type:'UPDATE_OFFER', payload:d }); showToast('Offer updated!'); setEditItem(null) }
  const handleDelete = () => { dispatch({ type:'DELETE_OFFER', payload:deleteId }); showToast('Offer deleted.','info') }
  const handleToggle = o => { dispatch({ type:'UPDATE_OFFER', payload:{ ...o, active:!o.active } }); showToast(o.active?'Offer deactivated.':'Offer activated!', o.active?'info':'success') }

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Special Offers</h1><p className="page-subtitle">{state.offers.filter(o=>o.active).length} active · {state.offers.length} total</p></div>
        <button onClick={()=>setAddOpen(true)} className="btn-adm-primary"><FiPlus size={16}/> New Offer</button>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {state.offers.map((o,i)=><OfferCard key={o.id} offer={o} index={i} onEdit={setEditItem} onDelete={setDeleteId} onToggle={handleToggle}/>)}
        <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} onClick={()=>setAddOpen(true)}
          className="card p-5 border-2 border-dashed border-gray-200 hover:border-crimson-300 hover:bg-crimson-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[160px] text-gray-400 hover:text-crimson-500 bg-transparent">
          <FiPlus size={24}/><span className="text-sm font-semibold">Create New Offer</span>
        </motion.button>
      </div>
      <Modal open={addOpen}    onClose={()=>setAddOpen(false)}  title="Create Special Offer" size="md"><OfferForm onSubmit={handleAdd}  onCancel={()=>setAddOpen(false)}  submitLabel="Create Offer" /></Modal>
      <Modal open={!!editItem} onClose={()=>setEditItem(null)}  title="Edit Offer"            size="md">{editItem&&<OfferForm initial={editItem} onSubmit={handleEdit} onCancel={()=>setEditItem(null)} submitLabel="Save Changes"/>}</Modal>
      <ConfirmDialog open={!!deleteId} onClose={()=>setDeleteId(null)} onConfirm={handleDelete} title="Delete Offer" message="Delete this offer permanently?"/>
    </div>
  )
}
