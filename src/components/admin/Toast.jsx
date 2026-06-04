import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'

const CFG = {
  success: { Icon:FiCheckCircle, color:'#10B981', bg:'#ECFDF5', border:'#A7F3D0' },
  error:   { Icon:FiAlertCircle, color:'#EF4444', bg:'#FEF2F2', border:'#FECACA' },
  info:    { Icon:FiInfo,        color:'#3B82F6', bg:'#EFF6FF', border:'#BFDBFE' },
}

export default function Toast() {
  const { state, dispatch } = useStore()
  const { toast } = state
  const cfg = toast ? (CFG[toast.type] ?? CFG.info) : null

  return (
    <AnimatePresence>
      {toast && cfg && (
        <motion.div key="toast" initial={{ opacity:0,y:60,scale:.92 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:40 }}
          transition={{ type:'spring', stiffness:320, damping:26 }}
          className="toast" style={{ background:cfg.bg, borderColor:cfg.border, borderWidth:1 }}>
          <cfg.Icon size={18} style={{ color:cfg.color, flexShrink:0 }} />
          <span className="text-gray-800 font-medium">{toast.message}</span>
          <button onClick={() => dispatch({ type:'CLEAR_TOAST' })} className="ml-2 text-gray-400 hover:text-gray-600 bg-transparent border-0 cursor-pointer p-0.5">
            <FiX size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
