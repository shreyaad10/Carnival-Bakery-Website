import { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { FiMove, FiEye, FiEyeOff, FiStar } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import { formatCurrency } from '../../utils/helpers'

export default function AdminBestSellers() {
  const { state, dispatch, showToast } = useStore()
  const bestSellers = state.products.filter(p => p.bestSeller)
  const [order, setOrder] = useState(bestSellers.map(p => p.id))

  const orderedBS = order.map(id => bestSellers.find(p => p.id === id)).filter(Boolean)

  const toggleBS = p => {
    dispatch({ type:'UPDATE_PRODUCT', payload:{ ...p, bestSeller:!p.bestSeller } })
    if (!p.bestSeller) { setOrder(o=>[...o,p.id]); showToast(`${p.name} added to best sellers!`) }
    else               { setOrder(o=>o.filter(id=>id!==p.id)); showToast(`${p.name} removed.`,'info') }
  }
  const toggleVisible = p => { const n=p.status==='active'?'inactive':'active'; dispatch({ type:'UPDATE_PRODUCT', payload:{ ...p, status:n } }); showToast(`Visibility ${n==='active'?'on':'off'}.`,'info') }

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Best Sellers</h1><p className="page-subtitle">{bestSellers.length} products marked as best sellers</p></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Drag to reorder */}
        <div className="card">
          <div className="card-header">
            <div><h3 className="text-sm font-bold text-gray-900">Current Best Sellers</h3><p className="text-xs text-gray-400 mt-0.5">Drag to reorder display sequence</p></div>
            <span className="badge badge-green">{orderedBS.length} active</span>
          </div>
          {orderedBS.length === 0 ? (
            <div className="card-body text-center py-12 text-gray-400 text-sm">No best sellers yet. Mark products from the right panel.</div>
          ) : (
            <Reorder.Group axis="y" values={order} onReorder={setOrder} className="divide-y divide-gray-50" style={{ listStyle:'none', padding:0 }}>
              <AnimatePresence>
                {orderedBS.map((p,i)=>(
                  <Reorder.Item key={p.id} value={p.id}>
                    <motion.div layout initial={{ opacity:0,x:-16 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:16 }} transition={{ delay:i*.05 }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/60 select-none">
                      <div className="drag-handle text-gray-300 hover:text-gray-500 flex-shrink-0"><FiMove size={14}/></div>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                        style={{ background:i===0?'#C9A84C22':'#F3F4F6', color:i===0?'#C9A84C':'#9CA3AF' }}>{i+1}</div>
                      <span className="text-2xl flex-shrink-0 select-none">{p.image}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800 truncate">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.category} · {formatCurrency(p.price)}</div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button onClick={()=>toggleVisible(p)} className={`btn-icon ${p.status==='active'?'text-emerald-500 bg-emerald-50 hover:bg-emerald-100':'text-gray-400 hover:bg-gray-100 bg-transparent'}`}>
                          {p.status==='active'?<FiEye size={14}/>:<FiEyeOff size={14}/>}
                        </button>
                        <button onClick={()=>toggleBS(p)} className="btn-icon text-amber-500 bg-amber-50 hover:bg-amber-100"><FiStar size={14} className="fill-current"/></button>
                      </div>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          )}
        </div>

        {/* All products panel */}
        <div className="card">
          <div className="card-header">
            <div><h3 className="text-sm font-bold text-gray-900">All Products</h3><p className="text-xs text-gray-400 mt-0.5">Click ☆ to add/remove best seller</p></div>
          </div>
          <div className="divide-y divide-gray-50 max-h-[520px] overflow-y-auto">
            {state.products.map((p,i)=>(
              <motion.div key={p.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*.03 }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/60 transition-colors">
                <span className="text-2xl flex-shrink-0 select-none">{p.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.category} · {formatCurrency(p.price)}</div>
                </div>
                <span className={`badge mr-1 ${p.status==='active'?'badge-green':'badge-gray'}`}>{p.status}</span>
                <button onClick={()=>toggleBS(p)}
                  className={`btn-icon transition-all ${p.bestSeller?'text-amber-500 bg-amber-50 hover:bg-amber-100':'text-gray-300 hover:text-amber-400 hover:bg-amber-50 bg-transparent'}`}>
                  <FiStar size={15} className={p.bestSeller?'fill-current':''}/>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
