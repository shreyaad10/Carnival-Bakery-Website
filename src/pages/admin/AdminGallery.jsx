import { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { FiPlus, FiTrash2, FiEye, FiEyeOff, FiMove, FiUpload } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import Modal from '../../components/admin/Modal'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { genId } from '../../utils/helpers'

const EMOJIS = ['🎂','🥐','🍪','🍞','🧁','🍫','🍰','🍥','🍩','🎁','🍮','☕','🫓','💒','🎉','🌸']

function AddModal({ open, onClose, onAdd }) {
  const [label, setLabel] = useState('')
  const [emoji, setEmoji] = useState('🎂')
  const [err,   setErr]   = useState('')
  const handleSubmit = e => { e.preventDefault(); if (!label.trim()) { setErr('Label required'); return } onAdd({ id:genId(), label:label.trim(), emoji, bg:`linear-gradient(135deg,#E8192C,#8B0000)`, order:Date.now(), visible:true, size:'normal' }); setLabel(''); setEmoji('🎂'); setErr('') }
  return (
    <Modal open={open} onClose={onClose} title="Add Gallery Image" size="sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="upload-zone h-24 flex-col gap-2">
          <FiUpload size={20} className="text-gray-400"/>
          <span className="text-sm text-gray-500 font-medium">Drop image or <span className="text-crimson-500">browse</span></span>
          <span className="text-xs text-gray-400">PNG, JPG · max 5MB (backend connection point)</span>
        </div>
        <div>
          <label className="form-label">Preview Icon</label>
          <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 rounded-xl border border-gray-200">
            {EMOJIS.map(e=><button type="button" key={e} onClick={()=>setEmoji(e)}
              className={`w-9 h-9 rounded-lg text-xl flex items-center justify-center cursor-pointer border-2 transition-all ${emoji===e?'border-crimson-500 bg-crimson-50 scale-110':'border-transparent bg-white hover:border-gray-300'}`}>{e}</button>)}
          </div>
        </div>
        <div>
          <label className="form-label">Image Label *</label>
          <input className="form-input" value={label} onChange={e=>{setLabel(e.target.value);setErr('')}} placeholder="Wedding Cake"/>
          {err&&<p className="text-xs text-red-500 mt-1">{err}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-1 border-t border-gray-100">
          <button type="button" onClick={onClose} className="btn-adm-secondary">Cancel</button>
          <button type="submit" className="btn-adm-primary"><FiPlus size={14}/> Add</button>
        </div>
      </form>
    </Modal>
  )
}

export default function AdminGallery() {
  const { state, dispatch, showToast } = useStore()
  const [addOpen,  setAddOpen]  = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [items,    setItems]    = useState(state.gallery)

  const handleAdd    = item => { dispatch({ type:'ADD_GALLERY_ITEM',    payload:item }); setItems(p=>[...p,item]); showToast('Image added!'); setAddOpen(false) }
  const handleDelete = ()   => { dispatch({ type:'DELETE_GALLERY_ITEM', payload:deleteId }); setItems(p=>p.filter(i=>i.id!==deleteId)); showToast('Image removed.','info') }
  const handleToggle = item => { const u={...item,visible:!item.visible}; dispatch({ type:'UPDATE_GALLERY_ITEM', payload:u }); setItems(p=>p.map(i=>i.id===item.id?u:i)); showToast(u.visible?'Image visible.':'Image hidden.','info') }
  const handleReorder= n => { setItems(n); dispatch({ type:'REORDER_GALLERY', payload:n }) }

  const visible = items.filter(i=>i.visible).length

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Gallery</h1><p className="page-subtitle">{items.length} images · {visible} visible</p></div>
        <button onClick={()=>setAddOpen(true)} className="btn-adm-primary"><FiUpload size={16}/> Upload Image</button>
      </div>
      <div className="flex gap-3 mb-6 flex-wrap">
        <span className="badge badge-gray px-3 py-1.5">Total: {items.length}</span>
        <span className="badge badge-green px-3 py-1.5">Visible: {visible}</span>
        <span className="badge badge-red px-3 py-1.5">Hidden: {items.length-visible}</span>
      </div>

      <Reorder.Group axis="y" values={items} onReorder={handleReorder}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" style={{ listStyle:'none', padding:0 }}>
        <AnimatePresence>
          {items.map((item,i)=>(
            <Reorder.Item key={item.id} value={item}>
              <motion.div layout initial={{ opacity:0,scale:.9 }} animate={{ opacity:1,scale:1 }} exit={{ opacity:0,scale:.9 }} transition={{ delay:i*.04 }}
                className={`card overflow-hidden relative group transition-all ${!item.visible?'opacity-50':''}`}>
                <div className="h-36 flex items-center justify-center relative" style={{ background:item.bg||'linear-gradient(135deg,#fce7e9,#ffd6d9)' }}>
                  <span className="text-6xl select-none">{item.emoji}</span>
                  <div className="drag-handle absolute top-2 left-2 text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><FiMove size={14}/></div>
                  {!item.visible&&<div className="absolute inset-0 bg-gray-800/40 flex items-center justify-center"><FiEyeOff size={20} className="text-white"/></div>}
                </div>
                <div className="px-3 py-2.5 flex items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-gray-800 truncate">{item.label}</div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={()=>handleToggle(item)} className={`btn-icon ${item.visible?'text-emerald-500 hover:bg-emerald-50':'text-gray-400 hover:bg-gray-100'} bg-transparent`}>{item.visible?<FiEye size={13}/>:<FiEyeOff size={13}/>}</button>
                    <button onClick={()=>setDeleteId(item.id)} className="btn-icon text-red-400 hover:bg-red-50 bg-transparent"><FiTrash2 size={13}/></button>
                  </div>
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {items.length===0&&<div className="card p-16 text-center text-gray-400">No gallery images yet.</div>}
      <AddModal open={addOpen} onClose={()=>setAddOpen(false)} onAdd={handleAdd}/>
      <ConfirmDialog open={!!deleteId} onClose={()=>setDeleteId(null)} onConfirm={handleDelete} title="Remove Image" message="Remove this image permanently?"/>
    </div>
  )
}
