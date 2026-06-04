import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi'
import { useStore } from '../../context/StoreContext'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import ProductForm from '../../components/admin/ProductForm'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { genId, formatCurrency } from '../../utils/helpers'

export default function AdminProducts() {
  const { state, dispatch, showToast } = useStore()
  const [addOpen,  setAddOpen]  = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const handleAdd    = d => { dispatch({ type:'ADD_PRODUCT',    payload:{ ...d, id:genId() } }); showToast('Product added!'); setAddOpen(false) }
  const handleEdit   = d => { dispatch({ type:'UPDATE_PRODUCT', payload:d }); showToast('Product updated!'); setEditItem(null) }
  const handleDelete = () => { dispatch({ type:'DELETE_PRODUCT', payload:deleteId }); showToast('Product deleted.','info') }

  const toggleFeatured = p => { dispatch({ type:'UPDATE_PRODUCT', payload:{ ...p, featured:!p.featured } }); showToast(p.featured?'Removed from featured.':'Added to featured!','info') }
  const toggleStatus   = p => { const n=p.status==='active'?'inactive':'active'; dispatch({ type:'UPDATE_PRODUCT', payload:{ ...p, status:n } }); showToast(`Product ${n}.`,'info') }

  const columns = [
    { key:'image',    label:'',        width:48,  render:v=><span className="text-2xl select-none">{v}</span> },
    { key:'name',     label:'Product', render:(v,r)=><div><div className="font-semibold text-gray-900 text-sm">{v}</div><div className="text-xs text-gray-400 mt-0.5 max-w-[180px] truncate">{r.description}</div></div> },
    { key:'category', label:'Category',render:v=><span className="badge badge-blue">{v}</span> },
    { key:'price',    label:'Price',   render:v=><span className="font-bold text-crimson-600 text-sm">{formatCurrency(v)}</span> },
    { key:'stock',    label:'Stock',   render:v=><span className={`font-semibold text-sm ${v===0?'text-red-500':v<5?'text-amber-500':'text-gray-700'}`}>{v===0?'Out':v}</span> },
    { key:'featured', label:'Featured',width:80, render:(v,r)=><button onClick={()=>toggleFeatured(r)} className={`p-1.5 rounded-lg border-0 cursor-pointer transition-all ${v?'text-amber-500 bg-amber-50':'text-gray-300 hover:text-amber-400 bg-transparent'}`}><FiStar size={15} className={v?'fill-current':''}/></button> },
    { key:'status',   label:'Status',  render:(v,r)=><button onClick={()=>toggleStatus(r)} className={`badge cursor-pointer border-0 ${v==='active'?'badge-green':'badge-gray'}`}>{v}</button> },
    { key:'id',       label:'Actions', width:80, render:(_,r)=>(<div className="flex items-center gap-1"><motion.button whileTap={{ scale:.9 }} onClick={()=>setEditItem(r)} className="btn-icon btn-adm-ghost text-blue-500 hover:bg-blue-50"><FiEdit2 size={14}/></motion.button><motion.button whileTap={{ scale:.9 }} onClick={()=>setDeleteId(r.id)} className="btn-icon btn-adm-ghost text-red-500 hover:bg-red-50"><FiTrash2 size={14}/></motion.button></div>) },
  ]

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Products</h1><p className="page-subtitle">{state.products.length} products in catalog</p></div>
        <button onClick={()=>setAddOpen(true)} className="btn-adm-primary"><FiPlus size={16}/> Add Product</button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label:'Total',        val:state.products.length,                              cls:'badge-gray'   },
          { label:'Active',       val:state.products.filter(p=>p.status==='active').length, cls:'badge-green' },
          { label:'Featured',     val:state.products.filter(p=>p.featured).length,        cls:'badge-yellow' },
          { label:'Out of Stock', val:state.products.filter(p=>p.stock===0).length,       cls:'badge-red'    },
        ].map(s=><span key={s.label} className={`badge ${s.cls} text-sm px-3 py-1.5`}>{s.label}: <strong className="ml-1">{s.val}</strong></span>)}
      </div>

      <DataTable columns={columns} data={state.products} searchable searchKeys={['name','category','description']} emptyMessage="No products yet." />

      <Modal open={addOpen}    onClose={()=>setAddOpen(false)}  title="Add New Product" size="lg"><ProductForm onSubmit={handleAdd}  onCancel={()=>setAddOpen(false)}  submitLabel="Add Product"   /></Modal>
      <Modal open={!!editItem} onClose={()=>setEditItem(null)}  title="Edit Product"    size="lg">{editItem&&<ProductForm initial={editItem} onSubmit={handleEdit} onCancel={()=>setEditItem(null)} submitLabel="Save Changes" />}</Modal>
      <ConfirmDialog open={!!deleteId} onClose={()=>setDeleteId(null)} onConfirm={handleDelete} title="Delete Product" message="Delete this product permanently?" />
    </div>
  )
}
