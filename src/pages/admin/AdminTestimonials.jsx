import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import Modal from '../../components/admin/Modal'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { genId, formatDate } from '../../utils/helpers'

function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(n=>(
        <button key={n} type="button" onClick={()=>onChange(n)} className="text-2xl bg-transparent border-0 cursor-pointer p-0 transition-transform hover:scale-110">
          <span className={n<=value?'star-filled':'star-empty'}>★</span>
        </button>
      ))}
    </div>
  )
}

const EMPTY = { name:'', role:'', rating:5, text:'', approved:false, date:new Date().toISOString().split('T')[0], avatar:'', avatarColor:'#E8192C' }

function TestimonialForm({ initial, onSubmit, onCancel, submitLabel='Save' }) {
  const [form, setForm] = useState(initial ?? EMPTY)
  const [errors, setErrors] = useState({})
  const set = (k,v) => { setForm(f=>({...f,[k]:v})); if(errors[k]) setErrors(e=>({...e,[k]:''})) }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name required'
    if (!form.text.trim()) e.text = 'Review text required'
    setErrors(e); return !Object.keys(e).length
  }

  const handleSubmit = ev => {
    ev.preventDefault(); if (!validate()) return
    onSubmit({ ...form, avatar:form.name.charAt(0).toUpperCase() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="form-label">Name *</label><input className="form-input" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Priya Sharma"/>{errors.name&&<p className="text-xs text-red-500 mt-1">{errors.name}</p>}</div>
        <div><label className="form-label">Role</label><input className="form-input" value={form.role} onChange={e=>set('role',e.target.value)} placeholder="Food Blogger"/></div>
      </div>
      <div><label className="form-label">Review *</label><textarea className="form-textarea" rows={4} value={form.text} onChange={e=>set('text',e.target.value)} placeholder="Customer review…"/>{errors.text&&<p className="text-xs text-red-500 mt-1">{errors.text}</p>}</div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="form-label">Rating</label><StarPicker value={form.rating} onChange={v=>set('rating',v)}/></div>
        <div><label className="form-label">Date</label><input className="form-input" type="date" value={form.date} onChange={e=>set('date',e.target.value)}/></div>
      </div>
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <button type="button" onClick={()=>set('approved',!form.approved)} className="toggle" style={{ background:form.approved?'#10B981':'#E5E7EB' }}>
          <span className="toggle-thumb" style={{ transform:form.approved?'translateX(16px)':'translateX(0)' }}/>
        </button>
        <span className="text-sm text-gray-700">{form.approved?'Approved & Visible on website':'Pending Approval'}</span>
      </label>
      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
        <button type="button" onClick={onCancel} className="btn-adm-secondary">Cancel</button>
        <button type="submit" className="btn-adm-primary">{submitLabel}</button>
      </div>
    </form>
  )
}

function TestiCard({ item, onEdit, onDelete, onApprove, index }) {
  return (
    <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,scale:.95 }} transition={{ delay:index*.06 }}
      className={`card p-5 flex flex-col gap-3 ${!item.approved?'opacity-75 border-amber-200':''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
            style={{ background:`linear-gradient(135deg,${item.avatarColor||'#E8192C'},#6E060E)` }}>{item.avatar||item.name[0]}</div>
          <div><div className="text-sm font-bold text-gray-900">{item.name}</div><div className="text-xs text-gray-400">{item.role} · {formatDate(item.date)}</div></div>
        </div>
        <span className={`badge flex-shrink-0 ${item.approved?'badge-green':'badge-yellow'}`}>{item.approved?'Approved':'Pending'}</span>
      </div>
      <div className="flex gap-0.5">{[1,2,3,4,5].map(n=><span key={n} className={`text-base ${n<=item.rating?'star-filled':'star-empty'}`}>★</span>)}</div>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 italic">"{item.text}"</p>
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <button onClick={()=>onApprove(item)} className={`btn text-xs gap-1.5 ${item.approved?'btn-adm-secondary':'btn-adm-success'}`}>
          {item.approved?<FiX size={12}/>:<FiCheck size={12}/>}{item.approved?'Unapprove':'Approve'}
        </button>
        <button onClick={()=>onEdit(item)} className="btn-icon btn-adm-ghost text-blue-500 hover:bg-blue-50 ml-auto"><FiEdit2 size={13}/></button>
        <button onClick={()=>onDelete(item.id)} className="btn-icon btn-adm-ghost text-red-500 hover:bg-red-50"><FiTrash2 size={13}/></button>
      </div>
    </motion.div>
  )
}

export default function AdminTestimonials() {
  const { state, dispatch, showToast } = useStore()
  const [addOpen,  setAddOpen]  = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [filter,   setFilter]   = useState('all')

  const filtered = filter==='all' ? state.testimonials : filter==='approved' ? state.testimonials.filter(t=>t.approved) : state.testimonials.filter(t=>!t.approved)

  const handleAdd    = d => { dispatch({ type:'ADD_TESTIMONIAL',    payload:{ ...d, id:genId() } }); showToast('Testimonial added!'); setAddOpen(false) }
  const handleEdit   = d => { dispatch({ type:'UPDATE_TESTIMONIAL', payload:d }); showToast('Updated!'); setEditItem(null) }
  const handleDelete = () => { dispatch({ type:'DELETE_TESTIMONIAL', payload:deleteId }); showToast('Deleted.','info') }
  const handleApprove= item => { dispatch({ type:'UPDATE_TESTIMONIAL', payload:{ ...item, approved:!item.approved } }); showToast(item.approved?'Unapproved.':'Approved!', item.approved?'info':'success') }

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Testimonials</h1><p className="page-subtitle">{state.testimonials.filter(t=>t.approved).length} approved · {state.testimonials.filter(t=>!t.approved).length} pending</p></div>
        <button onClick={()=>setAddOpen(true)} className="btn-adm-primary"><FiPlus size={16}/> Add Review</button>
      </div>

      <div className="flex gap-2 mb-6">
        {[['all','All'],['approved','Approved'],['pending','Pending']].map(([k,l])=>(
          <button key={k} onClick={()=>setFilter(k)}
            className={`text-sm px-4 py-2 rounded-xl font-semibold border-0 cursor-pointer transition-all ${filter===k?'bg-crimson-500 text-white shadow-red':'bg-white text-gray-600 hover:bg-gray-100 shadow-card'}`}>{l}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.map((item,i)=><TestiCard key={item.id} item={item} index={i} onEdit={setEditItem} onDelete={setDeleteId} onApprove={handleApprove}/>)}
        </AnimatePresence>
        {filtered.length===0&&<div className="card p-12 text-center text-gray-400 text-sm col-span-full">No testimonials in this category.</div>}
      </div>

      <Modal open={addOpen}    onClose={()=>setAddOpen(false)}  title="Add Testimonial" size="md"><TestimonialForm onSubmit={handleAdd}  onCancel={()=>setAddOpen(false)}  submitLabel="Add Testimonial"/></Modal>
      <Modal open={!!editItem} onClose={()=>setEditItem(null)}  title="Edit Testimonial" size="md">{editItem&&<TestimonialForm initial={editItem} onSubmit={handleEdit} onCancel={()=>setEditItem(null)} submitLabel="Save Changes"/>}</Modal>
      <ConfirmDialog open={!!deleteId} onClose={()=>setDeleteId(null)} onConfirm={handleDelete} title="Delete Testimonial" message="Delete this review permanently?"/>
    </div>
  )
}
