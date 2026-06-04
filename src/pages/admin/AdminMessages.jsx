import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiTrash2, FiEye, FiPhone, FiClock } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import Modal from '../../components/admin/Modal'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

function MessageModal({ message, onClose }) {
  if (!message) return null
  return (
    <Modal open={!!message} onClose={onClose} title="Message Details" size="md">
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {[['From',message.name],['Subject',message.subject],['Email',message.email],['Phone',message.phone||'—'],['Received',message.date]].map(([l,v])=>(
            <div key={l} className={l==='Received'?'col-span-2':''}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{l}</div>
              <div className="text-sm text-gray-800 font-medium">{v}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Message</div>
          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed border border-gray-100">{message.message}</div>
        </div>
        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <a href={`mailto:${message.email}?subject=Re: ${message.subject}`} className="btn-adm-primary flex-1 justify-center no-underline"><FiMail size={14}/> Reply via Email</a>
          {message.phone && message.phone !== '—' && <a href={`tel:${message.phone.replace(/\s/g,'')}`} className="btn-adm-secondary flex-shrink-0 no-underline"><FiPhone size={14}/> Call</a>}
        </div>
      </div>
    </Modal>
  )
}

export default function AdminMessages() {
  const { state, dispatch, showToast } = useStore()
  const [viewMsg,  setViewMsg]  = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [filter,   setFilter]   = useState('all')
  const [search,   setSearch]   = useState('')

  const openMessage = msg => {
    setViewMsg(msg)
    if (!msg.read) dispatch({ type:'MARK_MESSAGE_READ', payload:msg.id })
  }
  const handleDelete = () => { dispatch({ type:'DELETE_MESSAGE', payload:deleteId }); showToast('Message deleted.','info') }

  const filtered = state.messages
    .filter(m => filter==='all' ? true : filter==='unread' ? !m.read : m.read)
    .filter(m => !search.trim() || [m.name,m.email,m.subject,m.message].some(v=>v.toLowerCase().includes(search.toLowerCase())))

  const unread = state.messages.filter(m=>!m.read).length

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Contact Messages</h1><p className="page-subtitle">{state.messages.length} total · {unread} unread</p></div>
        {unread>0&&<span className="badge badge-red text-sm px-3 py-2">{unread} Unread</span>}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex gap-2">
          {[['all','All'],['unread','Unread'],['read','Read']].map(([k,l])=>(
            <button key={k} onClick={()=>setFilter(k)}
              className={`text-sm px-4 py-2 rounded-xl font-semibold border-0 cursor-pointer transition-all ${filter===k?'bg-crimson-500 text-white shadow-red':'bg-white text-gray-600 hover:bg-gray-100 shadow-card'}`}>{l}</button>
          ))}
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search messages…" className="form-input max-w-xs"/>
      </div>

      <div className="card overflow-hidden">
        <AnimatePresence>
          {filtered.length===0
            ? <div className="p-16 text-center text-gray-400 text-sm">No messages found.</div>
            : filtered.map((msg,i)=>(
              <motion.div key={msg.id} initial={{ opacity:0,x:-12 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0 }} transition={{ delay:i*.04 }}
                className={`flex items-start gap-4 px-5 py-4 border-b border-gray-50 hover:bg-gray-50/60 transition-colors cursor-pointer group ${!msg.read?'bg-crimson-50/20':''}`}
                onClick={()=>openMessage(msg)}>
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${msg.read?'bg-gray-200':'bg-crimson-500'}`}/>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background:msg.read?'#E5E7EB':'linear-gradient(135deg,#E8192C,#8B0000)', color:msg.read?'#9CA3AF':'white' }}>
                  {msg.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm truncate ${msg.read?'font-medium text-gray-600':'font-bold text-gray-900'}`}>{msg.name}</span>
                    <span className="text-[11px] text-gray-400 flex-shrink-0 flex items-center gap-1"><FiClock size={10}/>{msg.date.toString().split(' ')[0]}</span>
                  </div>
                  <div className={`text-xs mt-0.5 ${msg.read?'text-gray-400':'text-gray-600 font-medium'}`}>{msg.subject}</div>
                  <div className="text-xs text-gray-400 mt-0.5 truncate">{msg.message}</div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0" onClick={e=>e.stopPropagation()}>
                  <button onClick={e=>{e.stopPropagation();openMessage(msg)}} className="btn-icon btn-adm-ghost text-blue-500 hover:bg-blue-50"><FiEye size={13}/></button>
                  <button onClick={e=>{e.stopPropagation();setDeleteId(msg.id)}} className="btn-icon btn-adm-ghost text-red-500 hover:bg-red-50"><FiTrash2 size={13}/></button>
                </div>
              </motion.div>
            ))
          }
        </AnimatePresence>
      </div>

      <MessageModal message={viewMsg} onClose={()=>setViewMsg(null)}/>
      <ConfirmDialog open={!!deleteId} onClose={()=>setDeleteId(null)} onConfirm={handleDelete} title="Delete Message" message="Delete this message permanently?"/>
    </div>
  )
}
